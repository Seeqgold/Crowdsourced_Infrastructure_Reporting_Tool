document
  .getElementById("reportForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("confirmationMessage").classList.remove("hidden");
    setTimeout = () => {
      alert("Your report has been submitted!");
    };

    const title = document.getElementById("title").value;
    const address = document.getElementById("address").value;
    const description = document.getElementById("description").value;

    const issueData = { title, address, description };

    // // To store data in a localStorage
    // localStorage.setItem('issue', JSON.stringify(issueData));

    // // To redirect to homepage
    // window.location.href="./../home.html";
  });
  document.getElementById('otherIssues').addEventListener('submit', function (event) {
    event.preventDefault();
    const homePage = document.getElementById('return-home');
    homePage.style.display = 'block';

    setTimeout = () => {
        alert('Your report has been submitted!');
    }

    const title = document.getElementById('issueTitle').value;
    const address = document.getElementById('issueLocation').value;
    const description = document.getElementById('issueDescription').value;
    const issueData = { title, address, description };
    // // To store data in a localStorage
    // localStorage.setItem('issue', JSON.stringify(issueData));
    // // To redirect to homepage
    // window.location.href="./../home.html";
})