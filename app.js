var submitted = false; // For Google Form submission tracking via iframe onload

document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

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

    // Scroll Spy for active navigation links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navHeight = document.querySelector('nav').offsetHeight;

    function changeNav() {
        let index = sections.length;

        while(--index && window.scrollY + navHeight < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active-link'));
        // Ensure the link exists before trying to add a class
        if (navLinks[index]) {
             // Check if the corresponding section exists for the link
            const activeSectionId = sections[index] ? sections[index].id : null;
            if (activeSectionId) {
                const activeLink = document.querySelector(`.nav-links a[href="#${activeSectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        } else if (window.scrollY + navHeight < sections[0].offsetTop) {
            // If before the first section, no link is active, or you can choose to highlight home.
            // For this case, if scroll is very top, highlight home.
             const homeLink = document.querySelector('.nav-links a[href="#hero-cover"]');
             if (homeLink) homeLink.classList.add('active-link');
        }
    }

    // Initial call to set active link on page load (if not at the very top)
    changeNav();
    window.addEventListener('scroll', changeNav);
    
}); // Corrected: Removed extra closing brace that was here