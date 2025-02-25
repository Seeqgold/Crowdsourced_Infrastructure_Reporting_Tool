document
  .getElementById("otherIssues")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("issueTitle").value;
    const location = document.getElementById("issueLocation").value;
    const description = document.getElementById("issueDescription").value;
    const reportType = "Porthole";
    const phoneNumber = "09088776655";
    const severity = document.getElementById("issueImpact").value;
    const imageUrl = document.getElementById("issuePhoto").value;
    const additionalComments = document.getElementById("inputs").value;
    const issueData = {
      location,
      title,
      reportType,
      description,
      severity,
      imageUrl,
      phoneNumber,
      additionalComments,
    };
    try {
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
        const homePage = document.getElementById("return-home");
        homePage.style.display = "block";
        setTimeout(() => {
          alert("Your report has been submitted!");
          window.location.href = "/home.html";
        }, 1000);
      } else {
        alert("There was an error submitting your report. Please try again and fill all fields.");
        console.error("Server Response Error:", data);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error: " + error.message);
    }

    // // To store data in a localStorage
    // localStorage.setItem('issue', JSON.stringify(issueData));
  });
// add a try catch block to handle errors and display a message to the user if there is an error
