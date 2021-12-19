const formCadastro = document.getElementById("form_cadastro")
const token = localStorage.getItem("token")

formCadastro.addEventListener("submit", async ev => {
    ev.preventDefault()
    const produto = formCadastro.nome.value
    const quantidade = formCadastro.quantidade.value
    const setor = formCadastro.input_setor.value

    const response = await fetch(`http://localhost:8081/secure/${token}/CadastroIten`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ produto, quantidade, setor})
    })

    const RespostaJSON = await response.json()

    if (response.status == 401) {
        alert(`Erro durante o seu cadastro: ${RespostaJSON}`)
        localStorage.removeItem("token")
        location.href = "login.html"
        return

    } else {
        if (response.status == 400) {
            alert(`Não foi possivel cadastrar seu novo item: ${RespostaJSON}`)
            formCadastro.nome.value = ""
            formCadastro.quantidade.value = ""
            formCadastro.input_setor.value = ""
            return
            
        } else {
            formCadastro.nome.value = ""
            formCadastro.quantidade.value = ""
            formCadastro.input_setor.value = ""
            alert(`\n Seu novo item está cadastrado com sucesso: \n \uD83E\uDC82 Nome: ${produto}`)
        }
    }
})