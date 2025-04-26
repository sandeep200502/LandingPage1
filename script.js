// Save submission to localStorage
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
      submissions.push({ name, email, phone, message });
      localStorage.setItem('submissions', JSON.stringify(submissions));

      window.location.href = "success.html";
    });
  }

  // Load submissions in admin page
  const submissionsContainer = document.getElementById('submissions');
  if (submissionsContainer) {
    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    if (submissions.length === 0) {
      submissionsContainer.innerHTML = "<p>No submissions yet!</p>";
    } else {
      submissions.forEach(sub => {
        submissionsContainer.innerHTML += `
          <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
            <p><strong>Name:</strong> ${sub.name}</p>
            <p><strong>Email:</strong> ${sub.email}</p>
            <p><strong>Phone:</strong> ${sub.phone}</p>
            <p><strong>Message:</strong> ${sub.message}</p>
          </div>
        `;
      });
    }
  }
});
