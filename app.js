// Removido: sons do app.js, agora controlados no db.js

document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("todo-input");
  const timeInput = document.getElementById("todo-time");
  let value = input.value.trim();
  const timeValue = timeInput.value;
  addTodo(value, timeValue);
  input.value = "";
  timeInput.value = "";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(
      reg => console.log("Service Worker registrado", reg.scope),
      err => console.error("Erro ao registrar", err)
    );
  });
}

