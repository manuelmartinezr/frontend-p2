const logout_btn = document.getElementById('logout-btn')

logout_btn.addEventListener('click', (event) =>{
    localStorage.setItem('logged', 'false')
    window.location.href = 'login.html'
})