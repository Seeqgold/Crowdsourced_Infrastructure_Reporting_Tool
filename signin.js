document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email1").value;
  const password = document.getElementById("password").value;

  const response = await fetch("https://backend-vercel-seeqgold-sikirat-amobigold-s-projects.vercel.app/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    window.location.href = "/home.html";
  }
});


