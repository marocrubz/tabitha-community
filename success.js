const urlParams = new URLSearchParams(window.location.search);

document.getElementById("userName").innerText = urlParams.get("name") || "N/A";
document.getElementById("clockinTime").innerText = urlParams.get("time") || "N/A";
document.getElementById("clockinDate").innerText = urlParams.get("date") || "N/A";
document.getElementById("meetingType").innerText = urlParams.get("meetingType") || "N/A";
