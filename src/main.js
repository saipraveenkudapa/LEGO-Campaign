import nav from "./components/nav.js";
import year from "./components/year.js";
import form from "./components/form.js";

// iOS detection function
function isIos() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

document.addEventListener("DOMContentLoaded", () => {
    // Apply iOS fix by adding a class to body
    if (isIos()) {
        document.body.classList.add('is-ios');
    }

    year();
    nav();
    form();

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Enhanced mobile menu toggle functionality
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default button behavior
            mobileMenu.classList.toggle('hidden');

            // Toggle icon between bars and times
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'fas fa-bars text-2xl';
                } else {
                    icon.className = 'fas fa-times text-2xl';
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars text-2xl';
                }
            }
        });

        // Ensure mobile menu links close the menu when clicked
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars text-2xl';
                }
            });
        });
    }

    const mainNavLinks = document.querySelectorAll('nav .nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        let currentActive = '';
        sections.forEach(section => {
            const navHeight = document.querySelector('nav').offsetHeight || 0;
            const sectionTop = section.offsetTop - navHeight - 10;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        mainNavLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') && link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active-link');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink);

    const desktopNavLinks = document.querySelectorAll('nav .nav-links a');
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    history.pushState(null, '', href);
                }
            }
        });
    });

    const campaignContactForm = document.getElementById('campaignContactForm');
    if (campaignContactForm) {
        campaignContactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);
            const formAction = form.action;

            fetch(formAction, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(response => {
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your message. Please try again or contact us directly.');
            });
        });
    }

    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(accordion => {
        const summary = accordion.querySelector('summary');
        const content = accordion.querySelector('.accordion-content');

        if (accordion.hasAttribute('open')) {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0px';
        }

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            const isOpen = accordion.hasAttribute('open');

            accordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion && otherAccordion.hasAttribute('open')) {
                    const otherContent = otherAccordion.querySelector('.accordion-content');

                    otherContent.style.height = otherContent.scrollHeight + 'px';

                    requestAnimationFrame(() => {
                        otherContent.style.height = '0px';
                        otherContent.style.opacity = '0';
                        otherAccordion.removeAttribute('open');
                    });

                    otherContent.addEventListener('transitionend', function handler() {
                        if (!otherAccordion.hasAttribute('open')) {
                            otherContent.style.height = '';
                        }
                        otherContent.removeEventListener('transitionend', handler);
                    });
                }
            });

            if (isOpen) {
                content.style.height = content.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    content.style.height = '0px';
                    content.style.opacity = '0';
                    accordion.removeAttribute('open');
                });
            } else {
                accordion.setAttribute('open', '');
                content.style.height = '0px';
                content.style.opacity = '0';

                requestAnimationFrame(() => {
                    content.style.height = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                });
            }

            content.addEventListener('transitionend', function handler() {
                if (accordion.hasAttribute('open')) {
                    content.style.height = '';
                } else {
                    content.style.height = '0px';
                }
                content.removeEventListener('transitionend', handler);
            });
        });
    });
});