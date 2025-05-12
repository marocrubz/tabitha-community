const API_URL = "https://tabitha-community.onrender.com/api/attendance";


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
  
