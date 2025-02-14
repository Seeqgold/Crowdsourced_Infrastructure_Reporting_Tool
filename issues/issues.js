document.getElementById('reportForm').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('confirmationMessage').classList.remove('hidden');
  
  
  const title = document.getElementById('title').value;
  const address = document.getElementById('address').value;
  const description = document.getElementById('description').value;

  const issueData = { title, address, description };

  // To store data in a localStorage
  localStorage.setItem('issue', JSON.stringify(issueData));

  // To redirect to homepage
  window.location.href="./../home.html";
});