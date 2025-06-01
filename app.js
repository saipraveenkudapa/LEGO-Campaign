var submitted = false;

        document.addEventListener('DOMContentLoaded', () => {
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
                    mobileMenu.classList.toggle('hidden');
                });

                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden'); // Hide menu on link click
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

            // Form submission handling
            const form = document.getElementById('campaignContactForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    const popup = document.getElementById('submission-popup');
                    if (popup) {
                        popup.classList.remove('hidden');
                        setTimeout(() => {
                            popup.classList.add('opacity-100');
                        }, 10);
                    }
                });
            }

            // Close popup button
            const closePopupButton = document.getElementById('close-popup-button');
            if (closePopupButton) {
                closePopupButton.addEventListener('click', function() {
                    const popup = document.getElementById('submission-popup');
                    if (popup) {
                        popup.classList.remove('opacity-100');
                        setTimeout(() => {
                            popup.classList.add('hidden');
                        }, 300);
                    }
                });
            }
        });