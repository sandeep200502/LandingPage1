// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Handle consult form submission
  const form = document.getElementById('consultForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show loader animation
      form.innerHTML = '<div class="loader"></div>';

      setTimeout(() => {
        // Get input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Save to localStorage
        let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        submissions.push({ name, email, phone, message });
        localStorage.setItem('submissions', JSON.stringify(submissions));

        // Redirect to success page
        window.location.href = "success.html";
      }, 2000);
    });
  }

  // Show saved submissions on admin page
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

  // Fade-in animation using Intersection Observer
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('show');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Smooth scroll for Services nav link
  const serviceLink = document.querySelector('.services-link');
  if (serviceLink) {
    serviceLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});

// Dark mode toggle function
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}
