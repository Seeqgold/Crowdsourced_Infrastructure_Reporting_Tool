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
    console.log(issueData);
    const response = await fetch(
      "https://backend-vercel-seeqgold-sikirat-amobigold-s-projects.vercel.app/api/report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    if (response.ok) {
      const homePage = document.getElementById("return-home");
      homePage.style.display = "block";

      setTimeout = () => {
        alert("Your report has been submitted!");
      };
      window.location.href = "/home.html";
    } else{
      alert("There was an error submitting your report. Please try again.");
      console.error("Error submitting report:", error);
    }
  });
  // add a try catch block to handle errors and display a message to the user if there is an error
