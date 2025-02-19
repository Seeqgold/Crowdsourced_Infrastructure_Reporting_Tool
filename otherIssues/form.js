// // to toggle sidebar visibility
// function toggleSidebar() {
//     const sidebar = document.getElementById('sidebar');
//     if (sidebar.style.display ==='none') {
//         sidebar.style.display ='block'
//     } else {
//         sidebar.style.display ='none'
//     }
// }
// // Attaching event listener
// const toggleButton = document.getElementById('hamburger-menu');
// toggleButton.addEventListener('onclick', toggleSidebar)

// To handle form submission button

// function handleFormSubmission(event) {
//     event.preventDefault(); //prevents the page from refreshing after submission

//     // next stumulate form sumission
//     console.log('Form submitted')

//     //After submission show "Homepage" button

//     const homePage = document.getElementById('return-home');
//     homePage.style.display = 'block';

//     //stimulating a short delay before showing the homepage button

//     setTimeout = () => {
//         alert('Your report has been submitted!');
//     }
// }
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