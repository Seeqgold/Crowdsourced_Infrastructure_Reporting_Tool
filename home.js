const container = document.getElementById("col");

document.addEventListener("DOMContentLoaded", async function () {
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   alert("You need to login first!");
  //   window.location.href = "login.html";
  // }
  try {
    const response = await fetch(
      "https://backend-vercel-seeqgold-sikirat-amobigold-s-projects.vercel.app/api/report",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const issues = await response.json();
      if (issues.length === 0) {
        const noReport = document.createElement("h5");
        noReport.innerHTML = "You have not made any reports yet";
        container.appendChild(noReport);
        return;
      }
      issues.forEach((issue) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("card");
        newDiv.setAttribute("id", `report-${issue._id}`);

        const titleDiv = document.createElement("div");
        const newTitle = document.createElement("h5");
        newTitle.classList.add("title");
        newTitle.innerHTML = "Title: " + issue.title;
        titleDiv.appendChild(newTitle);
        newDiv.appendChild(titleDiv);

        const locationDiv = document.createElement("div");
        locationDiv.classList.add("location");
        const locationTitle = document.createElement("h6");
        locationTitle.innerHTML = "Location:";
        const newLocation = document.createElement("p");
        newLocation.classList.add("location-body");
        newLocation.innerHTML = issue.location;
        locationDiv.append(locationTitle, newLocation);
        newDiv.appendChild(locationDiv);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description");
        const descriptionTitle = document.createElement("h6");
        descriptionTitle.innerHTML = "Description:";
        const newText = document.createElement("p");
        newText.classList.add("text-body");
        newText.innerHTML = issue.description;
        descriptionDiv.append(descriptionTitle, newText);
        newDiv.appendChild(descriptionDiv);

        const form = document.createElement("form");
        form.classList.add("deletecard");
        const editButton = document.createElement("a");
        editButton.classList.add("btn");
        editButton.href = "otherIssues/form.html";
        editButton.innerText = "Edit";
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.classList.add("btn-danger", "delete-btn");
        deleteButton.setAttribute("data-id", issue._id);
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", async function () {
          if (!confirm("Are you sure you want to delete this report?")) return;
          const reportId = this.getAttribute("data-id");
          try {
            const deleteResponse = await fetch(
              `https://backend-vercel-seeqgold-sikirat-amobigold-s-projects.vercel.app/api/report/${reportId}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (deleteResponse.ok) {
              document.getElementById(`report-${reportId}`).remove();
              alert("Report deleted successfully!");
            } else {
              alert("Failed to delete report.");
            }
          } catch (error) {
            console.error("Error deleting report:", error);
          }
        });

        form.appendChild(editButton);
        form.appendChild(deleteButton);
        newDiv.appendChild(form);

        container.appendChild(newDiv);
      });
    } else{
      console.error("Failed to fetch data");
      alert("Failed to load reports");
    }
  } catch (error) {
    console.error("error fetching data", error);
  }
});

