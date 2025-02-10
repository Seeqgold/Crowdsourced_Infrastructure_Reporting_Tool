document.getElementById('reportForm').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('confirmationMessage').classList.remove('hidden');
});