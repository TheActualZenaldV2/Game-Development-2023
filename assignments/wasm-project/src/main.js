fetch('../out/main.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(results => {
    instance = results.instance;
    const resultPtr = instance.exports.main(); // Get the pointer to the string
    const buffer = new Uint8Array(instance.exports.memory.buffer);

    let resultString = '';
    for (let i = resultPtr; buffer[i] !== 0; i++) {
      resultString += String.fromCharCode(buffer[i]);
    }

    document.getElementById("container").textContent = resultString;
  })
  .catch(console.error);

