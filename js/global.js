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
async function initializePage() { // We still use async to wait for the script to load
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
    const servicePages = ['/managed-it-services', '/it-asset-disposal', '/security-cameras'];
    if (servicePages.some(page => currentLocation.startsWith(page))) {
        const servicesLink = document.getElementById('services-dropdown-toggle');
        if (servicesLink) {
            servicesLink.classList.add('active');
        }
    }
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === '/' && currentLocation === '/') {
             link.classList.add('active');
        } else if (linkHref !== '/' && currentLocation.startsWith(linkHref)) {
            link.classList.add('active');
        }
    });

    // --- International Telephone Input Initializer ---
    const phoneInputField = document.querySelector("#phone");
    if (phoneInputField) {
        // This helper function creates a <script> tag and waits for it to load.
        const loadScript = (url) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.onload = resolve; // Resolve the promise when loading is complete
                script.onerror = reject; // Reject if there's an error
                document.head.appendChild(script);
            });
        };

        try {
            // Step 1: Wait for the utils.js script to be fully loaded and executed.
            await loadScript("/js/vendor/utils.js");

            // Step 2: Now that it's loaded, initialize the plugin.
            // The library will automatically detect that the utils script is present.
            window.intlTelInput(phoneInputField, {
                initialCountry: "auto",
                geoIpLookup: function(callback) {
                    fetch("https://ipapi.co/json")
                      .then(res => res.json())
                      .then(data => callback(data.country_code))
                      .catch(() => callback("us"));
                }
                // We no longer need utilsScript or countryData here.
            });

            // Listen for input and remove non-numeric characters
            phoneInputField.addEventListener('input', () => {
                phoneInputField.value = phoneInputField.value.replace(/[^\d]/g, '');
            });

        } catch (error) {
            console.error("Failed to load utils.js or initialize phone input:", error);
        }
    }
}

    // --- Initial call to load header and footer ---
    loadHeaderAndFooter();

});