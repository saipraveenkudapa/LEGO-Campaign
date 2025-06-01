// app.js

document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is loaded
    // Set current year in the footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Assuming 'active' class toggles visibility (e.g., display: flex)
            // Or, if using Tailwind 'hidden', toggle that directly.
            // For example, if mobileMenu has 'hidden' by default:
            // mobileMenu.classList.toggle('hidden'); 
            // mobileMenu.classList.toggle('flex'); // if it uses flex to show
            
            // Using a generic 'active' class as per previous setup
            mobileMenu.classList.toggle('active'); 
            // Ensure your styles.css or Tailwind setup handles what '.active' does
            // For Tailwind, if .mobile-menu is 'hidden md:hidden', then 'active' might mean removing 'hidden'
            // e.g. mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active'); // Or add 'hidden'
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact Form Submission Logic with Popup and Reset
    const contactForm = document.getElementById('campaignContactForm');
    const submissionPopup = document.getElementById('submission-popup');
    const closePopupButton = document.getElementById('close-popup-button');

    if (contactForm && submissionPopup && closePopupButton) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default page reload

            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';

            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Web3Forms responds with JSON
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    submissionPopup.classList.remove('hidden', 'opacity-0');
                    submissionPopup.classList.add('opacity-100');
                    const popupContent = submissionPopup.querySelector('div > div'); // Targets the inner styled box
                    if(popupContent) {
                        setTimeout(() => { // Allow opacity transition to start
                            popupContent.classList.remove('scale-95');
                            popupContent.classList.add('scale-100');
                        }, 10); // Short delay
                    }
                    contactForm.reset(); // Reset the form fields
                } else {
                    // Handle submission error from Web3Forms if it provides a message
                    alert(data.message || 'Submission failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('An error occurred while sending your message. Please check your internet connection and try again.');
            })
            .finally(() => {
                // Restore button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });

        closePopupButton.addEventListener('click', () => {
            const popupContent = submissionPopup.querySelector('div > div');
            if(popupContent) {
                popupContent.classList.add('scale-95');
                popupContent.classList.remove('scale-100');
            }
            submissionPopup.classList.add('opacity-0');
            submissionPopup.classList.remove('opacity-100');
            setTimeout(() => {
                submissionPopup.classList.add('hidden');
            }, 300); // Match transition duration if any (e.g., duration-300)
        });

        // Optional: Close popup if clicked outside of the content area
        submissionPopup.addEventListener('click', (event) => {
            if (event.target === submissionPopup) { // Check if the click is on the overlay itself
                closePopupButton.click(); // Trigger the close button's logic
            }
        });
    } else {
        // Log errors if elements are not found, helps in debugging
        if (!contactForm) console.error('Contact form (#campaignContactForm) not found.');
        if (!submissionPopup) console.error('Submission popup (#submission-popup) not found.');
        if (!closePopupButton) console.error('Close popup button (#close-popup-button) not found.');
    }
});