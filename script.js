const API_URL = "https://gaspar-chat-pqg0yqanw-tomasja6s-projects.vercel.app"; // Nahraď URL backendu

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    chatBox.innerHTML += `<p><strong>Ty:</strong> ${userMessage}</p>`;
    inputField.value = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
        chatBox.innerHTML += `<p><strong>Gaspar:</strong> ${data.response}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<p style="color:red;">Chyba komunikace s Gasparem!</p>`;
    }
}
