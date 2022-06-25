const form = document.querySelector('form');
const button = document.querySelector('button');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //   console.log(form.elements.login.value); // Get Login
  //   console.log(form.elements.password.value); // Get Password
  const res = await fetch("http://localhost:5000/auth/registration", {
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
    window.location.href = '../login/login.html';
  } else {
    document.getElementById("error").innerHTML =
      '<div class="alert alert-danger" role="alert">Некорректное значение символов в <a class="alert-link">логине</a> или <a class="alert-link">пароле</a></div>';
    return false;
  }
  console.log(todoUser);
});
