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
  }
});