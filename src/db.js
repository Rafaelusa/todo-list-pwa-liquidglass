 let db;
const request = indexedDB.open("todoDB", 1);

request.onupgradeneeded = function (e) {
  db = e.target.result;
  db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = function (e) {
  db = e.target.result;
  loadTodos();
};

function addTodo(todoText) {
  const tx = db.transaction("todos", "readwrite");
  tx.objectStore("todos").add({ text: todoText });
  tx.oncomplete = () => loadTodos();
}

function loadTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  const tx = db.transaction("todos", "readonly");
  const store = tx.objectStore("todos");

  store.openCursor().onsuccess = function (e) {
    const cursor = e.target.result;
    if (cursor) {
      const li = document.createElement("li");
      li.innerHTML = `${cursor.value.text} <button onclick="deleteTodo(${cursor.key})">❌</button>`;
      list.appendChild(li);
      cursor.continue();
    }
  };
}

function deleteTodo(id) {
  const tx = db.transaction("todos", "readwrite");
  tx.objectStore("todos").delete(id);
  tx.oncomplete = () => loadTodos();
}

