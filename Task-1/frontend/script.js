const form = document.getElementById("contactForm");
const resultDiv = document.getElementById("result");

const SERVER_URL = "http://localhost:5000";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  resultDiv.textContent = "Sending...";

  try {
    const res = await fetch(`${SERVER_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (res.ok) {
      resultDiv.textContent = "Message sent successfully!";
      console.log("Server response:", data);

      form.reset();
    } else {
      resultDiv.textContent =
        "Error sending message: " + (data.message || res.statusText);
    }
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Network error. Is the server running?";
  }
});
