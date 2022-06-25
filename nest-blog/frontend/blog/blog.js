const form = document.querySelector("form");
const button = document.querySelector("button");
const token = localStorage.getItem("tokenUser");

// Создание поста
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#exampleInput2");
  const description = document.querySelector("#exampleText2");
  const image = document.querySelector("#formFileSm");

  const postTitle = title.value;
  const postDescription = description.value;
  const postImage = image.value;

  const titleError = document.getElementById("error_title");
  const descriptionError = document.getElementById("error_description");
  const imageError = document.getElementById("error_fail");

  const textErrorTitle = `<div class="alert alert-danger" role="alert">Некорректное значение символов в <a class="alert-link">заголовокe</a></div>`;
  const textErrorDescription = '<div class="alert alert-danger" role="alert">Некорректное значение символов в <a class="alert-link">описание</a></div>';
  const textErrorImage = '<div class="alert alert-danger" role="alert"><a class="alert-link">Файл </a>не выбран</div>';
 
  if (postTitle.length < 5 || postTitle.length > 20) {
    titleError.innerHTML = textErrorTitle;
    descriptionError.innerHTML = " ";
    imageError.innerHTML = " ";
    return;
  }

  if (postDescription.length < 20 || postDescription.length > 120) {
    descriptionError.innerHTML = textErrorDescription;
    titleError.innerHTML = " ";
    postImage.innerHTML = " ";  
    return;
  }

  if (postImage.length === 0) {
    imageError.innerHTML = textErrorImage
    descriptionError.innerHTML = " ";
    titleError.innerHTML = " ";
    return;
  }

  const payload = await getPayload(token);
  const formData = new FormData();

  formData.set("title", title.value);
  formData.set("content", description.value);
  formData.set("userId", payload.id);
  formData.set("image", image.files[0]);

  const postsEndpoint = "http://localhost:5000/posts";
  await fetch(postsEndpoint, {
    method: "POST",
    body: formData,
  });
});


// Расшифровка JSON Web Tokens
const getPayload = async (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(""),
  );
  return JSON.parse(jsonPayload);
};

// Генерация постов
async function getResponse() {
  const responce = await fetch("http://localhost:5000/posts");
  const content = await responce.json();

  const list = document.getElementById("postNew");

  for (key in content) {
    // Преобразование временной метки в человекочитаемую дату
    const data = new Date(content[key].createdAt);
    userDate = data.toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    list.innerHTML += `
    <div class="scrollpost col-sm-12 col-xs-12 col-md-4 col-lg-3 col-xl-3">
    <div class="thumbnail bootsnipp-thumb" style="padding:0">
        <div class="imgwrap">
            <img class="card-img-top img-max" src="../../dist/modules/static//${content[key].image}" alt="jpg">
        </div>
        <div class="card-body">
        <h5 class="card-title title">${content[key].title}</h5>
        <p class="card-text text">${content[key].content}</p>
            <div class="post-card-info">
                <ul class="list-inline">
                    <li>
                        <a href="blog.html">
                            <img src="https://clck.ru/pSc3P" class="imgAuthor" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="blog.html">${content[key].author.login}</a>
                    </li>
                    <li class="dot"></li>
                    <li>${userDate}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="card-button">
        <button id="edit${content[key].id}" name="${content[key].author.login}" type="button1" class="btn btn-outline-info button2" data-bs-toggle="modal" data-bs-target="#exampleModal">Редактировать</button>
        <button id="delete${content[key].id}" name="${content[key].author.login}" type="submitDelet" class="btn btn-outline-danger button1" data-bs-toggle="modal" data-bs-target="#exampleModal2">Удалить</button>
    </div>
        <div>
            <p class="pull-right view-counts">
                <a href="https://bootsnipp.com/snippets/BxA1B" class="tip">
                </a>
                <a href="https://bootsnipp.com/tags/4.1.1"><span class="label label-info tip"></span></a>
            </p>
        </div>
    </div>
</div>
    `;
  }

  const post = document.getElementById("postNew");
  const editButton = document.getElementById("editPost");
  const deleteButton = document.getElementById("deletePost");

  const payload = await getPayload(token);

  post.addEventListener("click", (event) => {
    const { target } = event;
    const clickIdName = target.id;
    const authorLogin = target.name;
    const clickPostId = clickIdName.replace(/[^+\d]/g, "");

    // Проверка на автора поста
    document.getElementById("error_edit_post_user").innerHTML = " ";
    document.getElementById("error_delete_post_user").innerHTML = " ";

    const editPostError = document.getElementById("error_edit_post_user");
    const textErrorEdit = '<div class="alert alert-danger" role="alert">Вы не являетесь автором <a class="alert-link">поста</a></div>';

    const deletePostError = document.getElementById("error_delete_post_user");
    const textErrorDelete = '<div class="alert alert-danger" role="alert">Вы не являетесь автором <a class="alert-link">поста</a></div>';

    // Редактирование поста
    editButton.addEventListener("click", async (event) => {
      event.preventDefault();

      if (authorLogin === payload.login) {
        const editTitle = document.querySelector("#editExampleInput1");
        const editDescription = document.querySelector("#editExampleInput2");
        const image = document.querySelector("#editFormFileSm2");

        // --------------------------------------
        // console.log(image.value);
        // console.log(editTitle.value);
        // console.log(editDescription.value);
        // --------------------------------------

        const postModalTitle = editTitle.value;
        const postModalDescription = editDescription.value;
        const postModalImage = image.value;

        // --------------------------------------
        // console.log(postTitle.length);
        // console.log(postDescription.length);
        // console.log(postImage.length);
        // --------------------------------------

        const titleModalError = document.getElementById("error_modal_title");
        const descriptionModalError = document.getElementById("error_modal_description");
        const imageModalError = document.getElementById("error_modal_fail");

        const textErrorModalTitle = `<div class="alert alert-danger" role="alert">Некорректное значение символов в <a class="alert-link">заголовокe</a></div>`;
        const textErrorModalDescription = '<div class="alert alert-danger" role="alert">Некорректное значение символов в <a class="alert-link">описание</a></div>';
        const textErrorModalImage = '<div class="alert alert-danger" role="alert"><a class="alert-link">Файл </a>не выбран</div>';

        if (postModalTitle.length < 5 || postModalTitle.length > 20) {
          titleModalError.innerHTML = textErrorModalTitle;
          descriptionModalError.innerHTML = " ";
          imageModalError.innerHTML = " ";
          return;
        }
      
        if (postModalDescription.length < 20 || postModalDescription.length > 120) {
          descriptionModalError.innerHTML = textErrorModalDescription;
          titleModalError.innerHTML = " ";
          imageModalError.innerHTML = " ";
          return;
        }
      
        if (postModalImage.length === 0) {
          imageModalError.innerHTML = textErrorModalImage;
          descriptionModalError.innerHTML = " ";
          titleModalError.innerHTML = " ";
          return;
        }

        const formData2 = new FormData();

        formData2.set("id", Number(clickPostId));
        formData2.set("title", editTitle.value);
        formData2.set("content", editDescription.value);
        formData2.set("image", Object(image.files[0]));

        console.log(formData2);

        await fetch("http://localhost:5000/posts", {
          method: "PUT",
          body: formData2,
          // body: JSON.stringify({
          //   id: clickPostId,
          //   title: editTitle.value,
          //   content: editDescription.value,
          //   image: a,
          // }),
        });
      }
      editPostError.innerHTML = textErrorEdit;
      return;
    });

    // Удаление постов
    deleteButton.addEventListener("click", async (event) => {
      event.preventDefault();
      
      if (authorLogin !== payload.login) {
        deletePostError.innerHTML = textErrorDelete;
        return;
      }

      await fetch("http://localhost:5000/posts", {
        method: "DELETE",
        body: JSON.stringify({
          id: clickPostId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      location.href = "http://127.0.0.1:5500/nest-blog/frontend/blog/blog.html";
      return;
    });
  });
}
getResponse();
