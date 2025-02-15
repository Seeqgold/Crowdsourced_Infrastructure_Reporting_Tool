// to toggle sidebar visibility

const toggleBtn = document.getElementById("hamburger-menu");
const sidebar = document.getElementById("sidebar")

//Adding onclick event listener to toggle button 

toggleBtn.addEventListener("click", () => {
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-300px"; // Hides the sidebar
    } else {
       sidebar.style.left = "0px"; // Shows the sidebar
    } 
});

// To handle form submission button

function handleFormSubmission(event) {
    event.preventDefault(); //the initially prevents the button from submitting automatically for a little time

    // next stumulate form sumission
    console.log('Form submitted')

    //After submission show "Homepage" button

    const homePage = document.getElementById('return-home');
    homePage.style.display = 'block';

    //stimulating a short delay before showing the homepage button

    setTimeout(() => {
        alert('Your report has been submitted!');
    }, 1000);
}

// Selecting the form to attack the submit event listener

const form = document.getElementById('other-issues');
form.addEventListener('onsubmit', handleFormSubmission);
