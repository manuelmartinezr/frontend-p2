// Make sure the key exists
if (localStorage.getItem('logged') === null) {
  localStorage.setItem('logged', 'false');
}

// Now check its value
const is_logged = localStorage.getItem('logged') === 'true';

if (is_logged) {
  window.location.href = "todo.html";
}

const users = [{username: 'admin', password: 'admin'}]

const form = document.getElementById('login-form')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const is_valid = users.some(user => 
        user.username === username && user.password === password
    )
    if(is_valid){
        alert("Login succesful")
        localStorage.setItem('logged', 'true')
        window.location.href = "todo.html"
    } else{
        alert("Invalid username or password")
    }
    
})