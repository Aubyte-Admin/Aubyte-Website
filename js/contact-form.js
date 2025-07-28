document.addEventListener('DOMContentLoaded', function() {
  var input = document.querySelector("#phone");
  if (input) {
    window.intlTelInput(input, {
      utilsScript: "/js/vendor/utils.js",
      separateDialCode: true,
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        fetch("https://ipapi.co/json")
          .then(function(res) { return res.json(); })
          .then(function(data) { callback(data.country_code); })
          .catch(function() { callback("za"); });
      },
      // THIS IS THE NEW LINE YOU NEED TO ADD
      preferredCountries: ["za", "in", "us"] 
    });



    // --- NEW CODE STARTS HERE ---
    // This event listener will prevent non-numeric characters
    input.addEventListener('input', function() {
      // Replace any character that is not a digit, space, parenthesis, plus, or hyphen
      this.value = this.value.replace(/[^\d\s()+\-]/g, '');
    });
    // --- NEW CODE ENDS HERE ---
  }
});