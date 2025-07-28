document.addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector("#phone");
  if (input) {
    // Initialize the plugin and store its instance
    const iti = window.intlTelInput(input, {
      utilsScript: "/js/vendor/utils.js",
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        fetch("https://ipapi.co/json")
          .then(function(res) { return res.json(); })
          .then(function(data) { callback(data.country_code); })
          .catch(function() { callback("za"); });
      },
      preferredCountries: ["za", "in", "us"],
      
      // --- THE MOST IMPORTANT CHANGE IS HERE ---
      // This option prevents the library from creating an example number placeholder.
      // We are telling it to generate an empty placeholder instead.
      customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        return "";
      },

      // Keep this as false to ensure the dial code stays inside the input
      separateDialCode: false, 
    });

    // Function to set the input value to the current country's dial code
    function updateInputValue() {
      const countryData = iti.getSelectedCountryData();
      if (countryData.dialCode) { // Check if a country is selected
        input.value = "+" + countryData.dialCode + " ";
      }
    }

    // Set the initial value after the library has loaded and detected the country
    iti.promise.then(function() {
      updateInputValue();
    });

    // Add event listener to update the value whenever the country is changed
    input.addEventListener('countrychange', function() {
      updateInputValue();
      // Optional: Automatically focus the input for better user experience
      input.focus();
    });

    // Your existing input filter remains useful
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^\d+ ]/g, '');
    });
  }
});