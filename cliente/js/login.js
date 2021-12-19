const formLogin = document.getElementById("form_login")
formLogin.addEventListener("submit", async ev => {
    ev.preventDefault()
    const login = formLogin.login.value
    const senha = formLogin.senha.value

    const response = await fetch("http://localhost:8081/Login", {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ login, senha })
    })
    const RespostaJSON = await response.json()

    if(response.status == 401){
        alert(`Houve um problema: ${RespostaJSON}`)
        localStorage.removeItem("token")
        return
    
    } else {
        localStorage.setItem("token", RespostaJSON.token)
        location.href = "escolha.html"
    }
})
