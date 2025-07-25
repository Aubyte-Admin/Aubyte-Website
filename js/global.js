document.addEventListener('DOMContentLoaded', function() {

    // --- Function to Fetch and Inject Header and Footer ---
    function loadHeaderAndFooter() {
        // Fetch and inject the header
        fetch('header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok for header.html');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('header-placeholder').outerHTML = data;
                // Once the header is loaded, initialize all the page-specific logic
                // that depends on the header's HTML elements (like nav links, hamburger icon).
                initializePage();
            })
            .catch(error => {
                console.error('Error fetching header:', error);
                // Optionally, display a user-friendly error message on the page
                document.getElementById('header-placeholder').innerHTML = '<p>Error loading header. Please try again later.</p>';
            });

        // Fetch and inject the footer
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok for footer.html');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching footer:', error);
                 // Optionally, display a user-friendly error message on the page
                document.getElementById('footer-placeholder').innerHTML = '<p>Error loading footer. Please try again later.</p>';
            });
    }

    // --- Function to Initialize All Page Logic ---
    // This function will run only after the header has been successfully loaded.
    function initializePage() {
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
    }

    // --- Initial call to load header and footer ---
    loadHeaderAndFooter();

});