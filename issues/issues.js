document
  .getElementById("reportForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const location = document.getElementById("address").value;
    const description = document.getElementById("description").value;
    // const reportType = document.getElementById("description").value;
    // const reportType = "Porthole";
    const severity = document.getElementById("minor").value;
    const imageUrl = document.getElementById("images").value;
    const phoneNumber = document.getElementById("contact").value;
    const additionalComments = document.getElementById("comments").value;
    const issueData = {
      location,
      title,
      description,
      severity,
      imageUrl,
      phoneNumber,
      additionalComments,
    };

    const response = await fetch(
      "https://backend-vercel-f4aqq1leu-csia-s-projects.vercel.app/api/report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      document.getElementById("confirmationMessage").classList.remove("hidden");
      setTimeout(() => {
        alert("Your report has been submitted!");
      }, 1000);
      window.location.href = "/home.html";
    }

    // // To store data in a localStorage
    // localStorage.setItem('issue', JSON.stringify(issueData));
  });
