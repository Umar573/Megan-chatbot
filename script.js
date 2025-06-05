// Get DOM elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendSound = document.getElementById("send-sound");
const receiveSound = document.getElementById("receive-sound");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Append message bubble
function appendMessage(text, className) {
  const message = document.createElement("div");
  message.classList.add("message", className);
  message.innerText = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing animation placeholder
function showTyping() {
  const typing = document.createElement("div");
  typing.classList.add("message", "bot", "typing");
  typing.innerText = "Megan is typing...";
  typing.id = "typing-indicator";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Remove typing indicator
function removeTyping() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

// Send message handler
function sendMessage() {
  const msg = userInput.value.trim();
  if (msg === "") return;

  appendMessage(msg, "user");
  sendSound.play();
  userInput.value = "";
  showTyping();

  fetch("/get", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msg: msg })
  })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        removeTyping();
        appendMessage(data.response, "bot");
        receiveSound.play();
      }, 700); // Delay to simulate typing
    })
    .catch(error => {
      removeTyping();
      appendMessage("Sorry, something went wrong.", "bot");
      console.error("Error:", error);
    });
}

// Enter key triggers send
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Toggle dark mode
darkModeToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
});
