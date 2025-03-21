document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        // Přidání zprávy uživatele do chatu
        addMessage("Ty", userMessage);
        userInput.value = "";

        // Odeslání zprávy na server
        fetch("https://tomasja6.github.io/gaspar-chat-web/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                addMessage("Gaspar", data.response);
            } else {
                addMessage("Gaspar", "Chyba: Nepodařilo se získat odpověď.");
            }
        })
        .catch(error => {
            console.error("Chyba komunikace s Gasparem:", error);
            addMessage("Gaspar", "Chyba komunikace! Zkus to znovu.");
        });
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Posune chat dolů
    }
});
