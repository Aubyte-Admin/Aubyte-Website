document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger-icon');
    const navLinksList = document.getElementById('nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });
    }

    // --- Dropdown Menu Logic ---
    const dropdownToggle = document.getElementById('services-dropdown-toggle');
    const dropdownMenu = document.getElementById('services-dropdown-menu');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(event) {
            // Only prevent default and toggle for mobile view
            if (window.innerWidth <= 768) {
                event.preventDefault();
                dropdownMenu.classList.toggle('show');
                dropdownToggle.classList.toggle('active');
            }
        });
    }

    // --- Active Nav Link Highlighting ---
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links > li > a');

    // Handle service pages dropdown highlighting
    const servicePages = ['/managed-it-services', '/it-asset-disposal', '/security-cameras'];
    if (servicePages.some(page => currentLocation.startsWith(page))) {
        const servicesLink = document.getElementById('services-dropdown-toggle');
        if (servicesLink) {
            servicesLink.classList.add('active');
        }
    }

    // Explicitly handle Partner, About, and Contact pages
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Use startsWith to handle potential trailing slashes (e.g., /partner/ vs /partner)
        if (linkHref === '/' && currentLocation === '/') {
             link.classList.add('active');
        } else if (linkHref !== '/' && currentLocation.startsWith(linkHref)) {
            // For other links, check if the current location starts with the link's href
            link.classList.add('active');
        }
    });
});