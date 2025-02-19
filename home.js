document.addEventListener("DOMContentLoaded", function () {
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   alert("You need to login first!");
  //   window.location.href = "login.html";
  // }

  const container = document.getElementById("col");
  const issueData = JSON.parse(localStorage.getItem("issue"));

  if (issueData) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");

    const titleDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    newTitle.classList.add("title");
    newTitle.innerHTML = "Title: " + issueData.title;
    titleDiv.appendChild(newTitle);
    newDiv.appendChild(titleDiv);

    const locationDiv = document.createElement("div");
    locationDiv.classList.add("location");
    const locationTitle = document.createElement("h6");
    locationTitle.innerHTML = "Location:";
    const newLocation = document.createElement("p");
    newLocation.classList.add("location-body");
    newLocation.innerHTML = issueData.address;
    locationDiv.append(locationTitle, newLocation);
    newDiv.appendChild(locationDiv);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");
    const descriptionTitle = document.createElement("h6");
    descriptionTitle.innerHTML = "Description:";
    const newText = document.createElement("p");
    newText.classList.add("text-body");
    newText.innerHTML = issueData.description;
    descriptionDiv.append(descriptionTitle, newText);
    newDiv.appendChild(descriptionDiv);

    container.appendChild(newDiv);

    // To clear localStorage after displaying to prevent duplication
    localStorage.removeItem("issue");
  }
});
