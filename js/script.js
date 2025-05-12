const API_URL = "https://tabitha-community.onrender.com/api/attendance";

// loader.js
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
      width: 60px;
      height: 60px;
      border: 4px solid rgba(102, 18, 18, 0.3);
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


function submitAttendance(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    const name = document.getElementById("name").value.trim();
    if (!name) return alert("Please enter your name");
  
    const meetingType = "Benevolence Meeting";
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
  
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, meetingType })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          const params = new URLSearchParams({ name, time, date, meetingType });
          window.location.href = `success.html?${params}`;
        } else {
          document.getElementById("message").innerText = data.message || "Error occurred.";
        }
      })
      .catch(() => {
        document.getElementById("message").innerText = "Error recording attendance.";
      });
  }
  
