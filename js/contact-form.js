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
      
      // This option prevents the library from creating an example number placeholder.
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

    // --- MODIFICATION ---
    // The input.focus() call which caused the scroll has been removed.
    // The input's value will still be correctly updated when the country is changed.
    input.addEventListener('countrychange', function() {
      updateInputValue();
    });

    // Your existing input filter remains useful
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^\d+ ]/g, '');
    });
  }
});