 document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("todo-input");
  let value = input.value.trim();
  // Capitaliza a primeira letra se for minúscula
  if (value.length > 0) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  addTodo(value);
  input.value = "";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(
      reg => console.log("Service Worker registrado", reg.scope),
      err => console.error("Erro ao registrar", err)
    );
  });
}

