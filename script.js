// REGISTER
function register() {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields!");
        return;
    }

    let user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");
    window.location.href = "index.html";
}

// LOGIN
function login() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No user found! Please register first.");
        return;
    }

    if (email === "" || password === "") {
        alert("Please enter email and password!");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        alert("Login successful!");
        window.location.href = "chatbot.html";
    } else {
        alert("Invalid email or password!");
    }
}

// LOGOUT
function logout() {
    window.location.href = "index.html";
}

// CHATBOT
function sendMessage() {
    let input = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (input.trim() === "") return;

    chatBox.innerHTML += "<p class='user'>You: " + input + "</p>";

    let response = getBotResponse(input);

    setTimeout(() => {
        chatBox.innerHTML += "<p class='bot'>Bot: " + response + "</p>";
        speak(response); // 🔊 voice output
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    document.getElementById("user-input").value = "";
}

// 🎤 VOICE INPUT
function startVoice() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function(event) {
        let text = event.results[0][0].transcript;
        document.getElementById("user-input").value = text;
        sendMessage();
    };

    recognition.start();
}

// 🔊 VOICE OUTPUT
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// 🤖 SMART BOT
function getBotResponse(input) {
    input = input.toLowerCase().trim();

    if (input.includes("hi") || input.includes("hello") || input.includes("hlo"))
        return "Hello Student 👋";

    else if (input.includes("java"))
        return "Java is a programming language used for apps and websites.";

    else if (input.includes("python"))
        return "Python is used for AI, data science, and web development.";

    else if (input.includes("web development"))
        return "Web Development means building websites.";

    else if (input.includes("course"))
        return "Courses: Web Dev, Python, Java";

    else if (input.includes("fees"))
        return "Fees approx ₹5000";

    else if (input.includes("bye"))
        return "Goodbye 👋";

    // 🔎 GOOGLE SEARCH FALLBACK
    else {
        return "I don't know that 😅 <br><a href='https://www.google.com/search?q=" 
        + input + "' target='_blank'>Search in Google 🔎</a>";
    }
}