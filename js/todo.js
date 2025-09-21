const logout_btn = document.getElementById('logout-btn')

logout_btn.addEventListener('click', (event) =>{
    localStorage.setItem('logged', 'false')
    window.location.href = 'login.html'
})

const form = document.getElementById('task-form')
const list = document.getElementById('todo-list')
let tasks = []

function validateTask(text){
    if (!text || text.trim() === ""){
        return {valid: false, error: "Task cannot be empty"}
    }
    if (text.trim().length < 10){
        return {valid: false, error: "Task must be at least 10 characters long"}
    }
    if (tasks.some(t=>t.text === text.trim())){
        return {valid: false, error: "Task already exists"}
    }
    return { valid: true, value: text.trim() }
}

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
            <button class="delete-btn">Delete</button>
            `
        list.appendChild(li)
    })
}

list.addEventListener('click', (event) => {
    const li = event.target.closest('li')
    const id = Number(li.dataset.id);
    const task = tasks.find(t => t.id === id);

  if (event.target.classList.contains('delete-btn')) {
    li.remove();

    tasks = tasks.filter(t => t.id !== id);

    renderTasks();
  }
  if (event.target.classList.contains('edit-btn')){
    
    const span = li.querySelector('.task-text')
    const input = document.createElement('input')
    

    input.type = "text";
    input.value = task.text;
    input.className = 'edit-input';
    span.replaceWith(input)

    event.target.textContent = "Save";
    event.target.classList.remove("edit-btn");
    event.target.classList.add("save-btn");
  } else if (event.target.classList.contains("save-btn")) {
    const input = li.querySelector(".edit-input");
    const new_text = input.value.trim();
    validation = validateTask(new_text)
    if(!validation.valid){
        alert(validation.error)
        return
    }

    task.text = new_text

    renderTasks(); // re-render whole list
  }
});
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const raw_text = document.getElementById('task-input').value
    validation = validateTask(raw_text)

    if(!validation.valid){
        alert(validation.error)
        return
    }

    const now = Date.now()
    const new_task = {
        id : now,
        text : validation.value,
        done: false,
        created_at: now,
        updated_at: null
    }
    tasks.push(new_task);
    renderTasks();
    form.reset();
})