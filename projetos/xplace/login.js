function fazerLogin() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const notif = document.getElementById("notif");

    // Esconde a mensagem antes de verificar
    notif.classList.add("hidden");

    // Credenciais válidas
    const validEmail = "thiago@gmail.com";
    const validSenha = "1234";

    if (email === validEmail && senha === validSenha) {
        // Login OK → redireciona
        window.location.href = "index.html";
    } else {
        // Login incorreto → mostra notificação
        notif.textContent = "Conta não encontrada.";
        notif.classList.remove("hidden");

        // Some depois de 3 segundos
        setTimeout(() => {
            notif.classList.add("hidden");
        }, 3000);
    }
}
