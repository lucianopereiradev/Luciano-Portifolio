document.querySelector(".btn").addEventListener("click", function () {

    const campos = [
        { id: "nome", label: "Nome:" },
        { id: "email", label: "Email:" },
        { id: "senha", label: "Senha:" },
        { id: "confirmar", label: "Confirmar senha:" }
    ];

    let faltando = false;

    // Resetar erros ANTES da verificação
    campos.forEach(c => {
        const input = document.getElementById(c.id);
        input.classList.remove("input-error");
        document.querySelector(`label[for="${c.id}"]`).classList.remove("label-error");
    });

    // Verificar campos
    campos.forEach(campo => {
        const value = document.getElementById(campo.id).value.trim();
        if (!value) {
            document.getElementById(campo.id).classList.add("input-error");
            document.querySelector(`label[for="${campo.id}"]`).classList.add("label-error");
            faltando = true;
        }
    });

    const termos = document.getElementById("tc").checked;
    if (!termos) faltando = true;

    const notify = document.getElementById("notify");
    const notifyText = document.getElementById("notifyText");
    const popup = document.getElementById("popup");

    // Mostrar notificação
    function mostrarNotificacao(texto) {
    notifyText.textContent = texto;

    const loader = document.querySelector(".loader");

    // Resetar animação (começar SEMPRE do topo)
    loader.style.animation = "none";
    loader.offsetHeight; // força o reflow

    // Agora toca 1 volta completa sincronizada com o tempo
    loader.style.animation = "spin 2.2s linear forwards";

    notify.style.display = "flex";
    notify.style.animation = "slideIn 0.35s ease forwards";

    setTimeout(() => {
        notify.style.animation = "slideOut 0.35s ease forwards";
        setTimeout(() => notify.style.display = "none", 350);
    }, 2200);
}


    if (faltando) {
        mostrarNotificacao("Preencha todos os campos obrigatórios.");
        return;
    }

    if (document.getElementById("senha").value !== document.getElementById("confirmar").value) {
        mostrarNotificacao("As senhas não coincidem.");
        return;
    }

    // Sucesso → popup
    popup.style.display = "flex";

    document.getElementById("popupBtn").onclick = function () {
        window.location.href = "login.html";
    };
});

// Remover erro automaticamente quando digitar
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        input.classList.remove("input-error");
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) label.classList.remove("label-error");
    });
});
