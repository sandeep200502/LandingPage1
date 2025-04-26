// Save submission to localStorage
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show Loader
      form.innerHTML = '<div class="loader"></div>';

      setTimeout(() => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        submissions.push({ name, email, phone, message });
        localStorage.setItem('submissions', JSON.stringify(submissions));

        window.location.href = "success.html";
      }, 2000);
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

  // Scroll animations
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('show');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}
