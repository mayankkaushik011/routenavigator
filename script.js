// ✅ Wait until everything loads
window.onload = function () {

  // ✅ Initialize Mappls safely
  mappls.initialize(
    "tcyflyepflcfjoylfqrigemvzxfanhmdcmuq",
    function () {

      // 🔹 Create map
      var map = new mappls.Map("map", {
        center: [77.2310, 28.6129],
        zoom: 10
      });

      // 🔹 Car marker
      var carMarker = new mappls.Marker({
        map: map,
        position: { lat: 28.6129, lng: 77.2310 },
        icon_url: "https://img.icons8.com/color/48/car.png"
      });

      var directions;
      var routeCoords = [];
      var index = 0;

      // 🔹 Button click handler
      document.getElementById("routeBtn").onclick = function () {
        var start = document.getElementById("start").value;
        var end = document.getElementById("end").value;

        if (!start || !end) {
          alert("Please enter both locations");
          return;
        }

        if (directions) directions.remove();

        directions = new mappls.direction({
          map: map,
          start: start,
          end: end,
          profile: "driving",
          callback: function (data) {
            routeCoords = data.routes[0].geometry.coordinates;
            index = 0;
            animateCar();
          }
        });
      };

      // 🔹 Animate car
      function animateCar() {
        if (index < routeCoords.length) {
          var lng = routeCoords[index][0];
          var lat = routeCoords[index][1];

          carMarker.setPosition({ lat: lat, lng: lng });
          index++;

          setTimeout(animateCar, 120);
        }
      }

    }
  );
};
