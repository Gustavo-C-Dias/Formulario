const form_usuario = document.getElementById("form_usuario")
const token = localStorage.getItem("token")

form_usuario.addEventListener("submit", async ev => {
    ev.preventDefault()
    const login = form_usuario.login.value
    const senha = form_usuario.senha.value

    const response = await fetch(`http://localhost:8081/secure/${token}/Usuario`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ login, senha})
    })

    const RespostaJSON = await response.json()

    if (response.status == 401) {
        alert(`Erro durante o seu cadastro: ${RespostaJSON}`)
        localStorage.removeItem("token")
        location.href = "login.html"
        return

    } else {
        if (response.status == 400) {
            alert(`Não foi possivel cadastrar seu novo usuário: ${RespostaJSON}`)
            form_usuario.login.value = ""
            form_usuario.senha.value = ""
            return
            
        } else {
            form_usuario.login.value = ""
            form_usuario.senha.value = ""
            alert(`\n Novo administrador Cadastrado: \n \uD83E\uDC82 Nome: ${login}`)
        }
    }
})  