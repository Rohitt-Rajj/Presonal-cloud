"use strict";

// POINT THIS TO YOUR BACKEND
const API_BASE = "http://127.0.0.1:5000"; // change when you deploy backend

const statusEl = document.getElementById("status");
const authSection = document.getElementById("auth-section");
const uploadSection = document.getElementById("upload-section");
const filesSection = document.getElementById("files-section");
const userbar = document.getElementById("userbar");
const userLabel = document.getElementById("user-label");

function setStatus(msg, type = "") {
  statusEl.className = `status ${type}`;
  statusEl.textContent = msg || "";
}

function getInputVals() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  return { email, password };
}

function validEmail(email) {
  // simple email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function signUp() {
  const { email, password } = getInputVals();
  if (!email || !validEmail(email)) return setStatus("Enter a valid email.", "err");
  if (!password || password.length < 6) return setStatus("Password must be at least 6 characters.", "err");

  try {
    setStatus("Signing up…");
    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus(data.message || "Signup failed.", "err");
      return;
    }
    setStatus(data.message || "Signup successful!", "ok");
  } catch (e) {
    console.error(e);
    setStatus("Network error during signup.", "err");
  }
}

async function signIn() {
  const { email, password } = getInputVals();
  if (!email || !validEmail(email)) return setStatus("Enter a valid email.", "err");
  if (!password) return setStatus("Password is required.", "err");

  try {
    setStatus("Signing in…");
    const res = await fetch(`${API_BASE}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    // accept either {success:true} or 200 OK with message
    const ok = (data.success === true) || res.ok;
    if (!ok) {
      setStatus(data.message || "Invalid credentials.", "err");
      return;
    }

    setStatus(data.message || "Login successful.", "ok");
    authSection.style.display = "none";
    uploadSection.style.display = "block";
    filesSection.style.display = "block";
    userbar.style.display = "flex";
    userLabel.textContent = `Logged in as: ${email}`;
    loadFiles();
  } catch (e) {
    console.error(e);
    setStatus("Network error during sign in.", "err");
  }
}

function logout() {
  // No real session in this demo; just reset UI.
  authSection.style.display = "block";
  uploadSection.style.display = "none";
  filesSection.style.display = "none";
  userbar.style.display = "none";
  userLabel.textContent = "";
  setStatus("Logged out.", "ok");
}

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files && fileInput.files[0];
  if (!file) return setStatus("Please choose a file first.", "err");

  const form = new FormData();
  form.append("file", file);

  try {
    setStatus("Uploading…");
    const res = await fetch(`${API_BASE}/upload`, { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.message || "Upload failed.", "err");
      return;
    }
    setStatus(data.message || "File uploaded.", "ok");
    fileInput.value = "";
    loadFiles();
  } catch (e) {
    console.error(e);
    setStatus("Network error during upload.", "err");
  }
}

async function loadFiles() {
  try {
    setStatus("Loading files…");
    const res = await fetch(`${API_BASE}/files`);
    const data = await res.json();
    const list = document.getElementById("fileList");
    list.innerHTML = "";

    if (!res.ok) {
      setStatus(data.message || "Failed to load files.", "err");
      return;
    }

    if (!data.files || data.files.length === 0) {
      list.innerHTML = `<li>No files yet.</li>`;
    } else {
      data.files.forEach(f => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${f.url}" target="_blank" rel="noopener noreferrer">${f.name}</a>`;
        list.appendChild(li);
      });
    }
    setStatus("");
  } catch (e) {
    console.error(e);
    setStatus("Network error while fetching files.", "err");
  }
}

// Keep inline onclicks working AND allow Enter key to submit
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // default to sign in on Enter
    signIn();
  }
});
