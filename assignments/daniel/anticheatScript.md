  // Create a script element to load the AC file
      const script = document.createElement("script");
    script.src = "https://theactualzenaldv2.github.io/Game-Development-2023/assignments/daniel/anticheat.js"; // Replace with the actual URL
function onPageLoad() { console.log("Page loaded");

// Load the AC file asynchronously
loadACFile(() => {
  // Callback function to run when AC is loaded and connected
  console.log("AC is loaded and connected");


});
}

function loadACFile(callback) { // Create a script element to load the AC file const script = document.createElement("script"); script.src = "https://theactualzenaldv2.github.io/Game-Development-2023/assignments/daniel/anticheat.js";

// Set an event listener for the script's onload event
script.onload = () => {
  console.log("AC file loaded");
  document.getElementById("loadAC").innerHTML = `<i id="writeToDatabaseFail" class="fas fa-check text-success"></i>`
};

// Set an event listener for the script's onerror event (in case of load failure)
script.onerror = () => {
  console.error("AC file failed to load");
  acFail = true;
  // You can handle the error here if needed
};

// Append the script element to the document
document.head.appendChild(script);

}
window.addEventListener("load", onPageLoad);
