const form = document.querySelector("form");
const button = document.querySelector("button");
const globalVariable = {
  token: "wdwdadawdwdwadwadwadwadadadwadawdawdad",
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const res = await fetch("http://localhost:5000/auth/login", {
    method: "post",
    body: JSON.stringify({
      login: form.elements.login.value,
      password: form.elements.password.value,
    }),
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5500",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    },
  });

  const todoUser = await res.json();

  if (todoUser.token) {
    localStorage.setItem("tokenUser", todoUser.token);
    window.location.href = "../blog/blog.html";
  } else {
    document.getElementById("error").innerHTML =
      '<div class="alert alert-danger" role="alert">Неправильный <a class="alert-link">логин</a> или <a class="alert-link">пароль</a></div>';
    return false;
  }
});
