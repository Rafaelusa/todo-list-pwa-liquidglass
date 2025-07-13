// Função para agendar alarme
function scheduleAlarm(todoText, todoTime) {
  // Pega hora e minuto do input
  const [hour, minute] = todoTime.split(":");
  const now = new Date();
  const alarm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  let timeout = alarm.getTime() - now.getTime();
  if (timeout < 0) {
    // Se horário já passou, agenda para o próximo dia
    alarm.setDate(alarm.getDate() + 1);
    timeout = alarm.getTime() - now.getTime();
  }
  setTimeout(() => {
    // Mostra modal customizado e toca alarme
    const alarmModal = document.getElementById('alarm-modal');
    const alarmText = document.getElementById('alarm-text');
    const alarmOk = document.getElementById('alarm-ok');
    alarmText.textContent = `Alarme: ${todoText}`;
    alarmModal.style.display = 'flex';
    // Som do alarme
    const alarmSound = new Audio('sounds/alarm.wav');
    alarmSound.volume = 0.5;
    alarmSound.loop = true;
    alarmSound.play();
    // Ao clicar em OK, fecha modal e para som
    alarmOk.onclick = function() {
      alarmModal.style.display = 'none';
      alarmSound.pause();
      alarmSound.currentTime = 0;
    };
  }, timeout);
}
let db;
// Efeitos sonoros perfeitos
const addSound = new Audio('sounds/add.wav');
addSound.volume = 0.5;
const removeSound = new Audio('sounds/remove.mp3');
removeSound.volume = 0.5;
const request = indexedDB.open("todoDB", 1);

request.onupgradeneeded = function (e) {
  db = e.target.result;
  db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = function (e) {
  db = e.target.result;
  loadTodos();
};

function addTodo(todoText, todoTime) {
  // Capitaliza a primeira letra se for minúscula
  if (todoText.length > 0) {
    todoText = todoText.charAt(0).toUpperCase() + todoText.slice(1);
  }
  const tx = db.transaction("todos", "readwrite");
  tx.objectStore("todos").add({ text: todoText, time: todoTime });
  tx.oncomplete = () => loadTodos();
  // Toca som de adicionar
  addSound.currentTime = 0;
  addSound.play();
  if (todoTime) {
    scheduleAlarm(todoText, todoTime);
  }
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
      let timeInfo = cursor.value.time ? `<span style='font-size:0.9em;color:#0077cc;margin-left:8px;'>⏰ ${cursor.value.time}</span>` : "";
      li.innerHTML = `${cursor.value.text} ${timeInfo} <button onclick="deleteTodo(${cursor.key})">❌</button>`;
      list.appendChild(li);
      cursor.continue();
    }
  };
}

function deleteTodo(id) {
  const tx = db.transaction("todos", "readwrite");
  tx.objectStore("todos").delete(id);
  tx.oncomplete = () => loadTodos();
  // Toca som de remover
  removeSound.currentTime = 0;
  removeSound.play();
}

// Removido duplicidade do som de remover

