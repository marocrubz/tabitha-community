function showLoader() {
  const loader = document.getElementById("page-loader");
  if (loader) loader.style.display = "flex";
}

function hideLoader() {
  const loader = document.getElementById("page-loader");
  if (loader) loader.style.display = "none";
}

const loaderHTML = `
  <div id="page-loader">
    <div class="spinner"></div>
  </div>
  <style>
    #page-loader {
      position: fixed;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .spinner {
      width: 30px;
      height: 30px;
      border: 4px solid rgba(81, 211, 34, 0.3);
      border-top-color: red;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  </style>
`;
document.body.insertAdjacentHTML('afterbegin', loaderHTML);

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) loader.style.display = "none";
});





const API_URL = "https://tabitha-community.onrender.com/api/attendance";

function submitAttendance(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  if (!name) return alert("Please enter your name");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      showLoader(); // 👈 show the loader on button click

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const locationRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const locationData = await locationRes.json();
        const location = locationData.display_name || `${lat},${lon}`;

        const meetingType = "Benevolence Meeting";
        const now = new Date();
        const time = now.toLocaleTimeString();
        const date = now.toLocaleDateString();

        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, meetingType, location })
        });

        const data = await res.json();

        hideLoader(); // 👈 hide after API call

        if (data.message) {
          const params = new URLSearchParams({ name, time, date, meetingType, location });
          window.location.href = `success.html?${params}`;
        } else {
          document.getElementById("message").innerText = data.message || "Error occurred.";
        }
      } catch (error) {
        hideLoader(); // 👈 hide even if there's an error
        document.getElementById("message").innerText = "Error recording attendance.";
        console.error("Error during clock-in:", error);
      }
    },
    () => {
      alert("Location permission denied. Cannot proceed.");
    }
  );
}
