console.log("script load");

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
let acFail = false;
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
        if(acFail) return;

        setTimeout(() => {
          document.getElementById("AC").innerHTML = `<i id="writeToDatabaseFail" class="fas fa-check text-success"></i>`;

        }, 1000);
        setTimeout(() => {
           // Reference to the "testWrite" section in Firebase
const testWriteRef = database.ref("testWrite");
function generateRandomNumber() {
  const min = 100000000000000; // 10^14
  const max = 999999999999999; // 10^15 - 1
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumber = generateRandomNumber().toString();
// Write the generated number to Firebase
if(acFail) return;
testWriteRef.set(randomNumber, (error) => {
  if (error) {
    console.error("Error writing data:", error);
  } else {
    console.log("Data written to Firebase:", randomNumber);

    // Check if the number has been successfully written
    testWriteRef.once("value", (snapshot) => {
      const storedNumber = snapshot.val();
      if (storedNumber === randomNumber) {
        console.log("Number is in the database.");
        document.getElementById("database").innerHTML = `<i id="writeToDatabaseFail" class="fas fa-check text-success"></i>`
      } else {
        console.error("Number is not in the database.");
        acFail = true;
      }
    });
  }
});
        }, 2000);
       
      } else {
        console.log(currentScriptContent.length, predefinedCharacterCount)
        console.log("Script has been tampered with!");
        acFail = true;
      }
    })
    .catch(error => {
      console.error("Error fetching current script:", error);
      acFail = true;
    });
});
