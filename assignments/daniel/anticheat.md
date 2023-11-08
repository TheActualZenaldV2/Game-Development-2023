console.log("script load");
  let pyodide;
  const pythonCodeTextarea = document.getElementById("pythonCode");
  const outputDiv = document.getElementById("outputDiv");

  const firebaseConfig = {
  apiKey: "AIzaSyC5ukKjhUz9Qk9IZtlzfvxD0E1bKiU0kvs",
  authDomain: "testing-58ad3.firebaseapp.com",
  databaseURL: "https://testing-58ad3-default-rtdb.firebaseio.com",
  projectId: "testing-58ad3",
  storageBucket: "testing-58ad3.appspot.com",
  messagingSenderId: "66543955126",
  appId: "1:66543955126:web:2213aa2e3f8d62b016ca17",
  measurementId: "G-S719DK1CH7"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Get the predefined character count from Firebase
const characterCountRef = database.ref("predefined_character_count");

characterCountRef.once("value", function(snapshot) {
  const predefinedCharacterCount = snapshot.val();

  // Fetch and check the current JavaScript file's character count
  fetch("https://theactualzenaldv2.github.io/Game-Development-2023/assignments/daniel/test.js")
    .then(response => response.text())
    .then(currentScriptContent => {
      if (currentScriptContent.length === predefinedCharacterCount) {
        console.log("Script is valid.");
      } else {
        console.log(currentScriptContent.length, predefinedCharacterCount)
        console.log("Script has been tampered with!");
      }
    })
    .catch(error => {
      console.error("Error fetching current script:", error);
    });
});
