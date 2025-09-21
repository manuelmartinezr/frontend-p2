const logout_btn = document.getElementById('logout-btn')

logout_btn.addEventListener('click', (event) =>{
    localStorage.setItem('logged', 'false')
    window.location.href = 'login.html'
})

const form = document.getElementById('task-form')
const list = document.getElementById('todo-list')
const tasks = []

function renderTasks(){
    list.innerHTML = ""
    tasks.forEach(task => {
        const li = document.createElement('li')
        li.className = "task" // asigna clase a nuevo elemento task
        li.dataset.id = task.id; // asigna un atributo data-id con el id
        li.innerHTML =`
            <input type="checkbox" ${task.done ? "checked" : ""} />
            <span class="task-text">${task.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>'
            `
        list.appendChild(li)
    })
}

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const li = event.target.closest("li");
    li.remove();

    const id = Number(li.dataset.id);

    tasks = tasks.filter(t => t.id !== id);

    renderTasks();
  }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const now = Date.now()
    const new_task = {
        id : now,
        text : document.getElementById('task-input').value,
        done: false,
        created_at: now,
        updated_at: null
    }
    tasks.push(new_task);
    renderTasks();
    form.reset();
})