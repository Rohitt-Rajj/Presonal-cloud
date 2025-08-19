const API_BASE = "http://127.0.0.1:5000"; // Change when deploying backend

function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.error(err));
}

function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${API_BASE}/signin`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("logout-btn").style.display = "inline-block";
            document.getElementById("upload-section").style.display = "block";
            document.getElementById("files-section").style.display = "block";
            alert("Logged in!");
            loadFiles();
        } else {
            alert(data.message);
        }
    })
    .catch(err => console.error(err));
}

function logout() {
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("upload-section").style.display = "none";
    document.getElementById("files-section").style.display = "none";
    alert("Logged out!");
}

function uploadFile() {
    const file = document.getElementById("fileInput").files[0];
    if (!file) return alert("No file selected!");

    const formData = new FormData();
    formData.append("file", file);

    fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadFiles();
    })
    .catch(err => console.error(err));
}

function loadFiles() {
    fetch(`${API_BASE}/files`)
    .then(res => res.json())
    .then(data => {
        const fileList = document.getElementById("fileList");
        fileList.innerHTML = "";
        data.files.forEach(file => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
            fileList.appendChild(li);
        });
    })
    .catch(err => console.error(err));
}
