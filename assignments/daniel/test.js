console.log("script load");
  let pyodide;
  const pythonCodeTextarea = document.getElementById("pythonCode");
  const outputDiv = document.getElementById("outputDiv");

  async function initializePyodide() {
    pyodide = await loadPyodide();
    outputDiv.innerHTML = "Ready to run Python code.";
  }

  function runPythonCode() {
    const myPython = pythonCodeTextarea.value;
    outputDiv.innerHTML = "Running Python code...";

    if (pyodide) {
      try {
        const result = pyodide.runPython(myPython);
        outputDiv.innerHTML = "Output:<br>" + result;
      } catch (err) {
        outputDiv.innerHTML = "Error:<br>" + err.replace(/\n/g, '<br>');
      }
    } else {
      outputDiv.innerHTML = "Pyodide is not initialized yet. Please wait.";
    }
  }
document.getElementById("run").addEventListener("click", function() {
    // Call the runPythonCode function when the button is clicked
    runPythonCode();
  });
  initializePyodide();
