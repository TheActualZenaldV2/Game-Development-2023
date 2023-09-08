function copyCode(element, id) {
    console.log(id);
  const codeBlock = element;
  const range = document.createRange();
  range.selectNode(codeBlock);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  const copyText = document.getElementById(id);
  copyText.style.display = "inline-block";
  copyText.classList.add("show");
  setTimeout(() => {
    copyText.classList.remove("show");
  }, 2000);
}
  //JS needed for basic webpage to work:
  document.addEventListener('DOMContentLoaded', function() {
      Prism.highlightAll();
      console.log("Add 'container' class to HTML to put in the middle of screen");
    });
   // Define an array of color palettes
   const colorPalettes = [
  {
    "--purple-50": "#FFEBEE",
    "--purple-100": "#FFCDD2",
    "--purple-200": "#EF9A9A",
    "--purple-300": "#E57373",
    "--purple-400": "#EF5350",
    "--purple-500": "#F44336",
    "--purple-600": "#E53935",
    "--purple-700": "#D32F2F",
    "--purple-800": "#C62828",
    "--purple-900": "#B71C1C",
    "--purple-a100": "#FF8A80",
    "--purple-a200": "#FF5252",
    "--purple-a400": "#FF1744",
    "--purple-a700": "#D50000"
  },
  {
    "--purple-50": "#FCE4EC",
    "--purple-100": "#F8BBD0",
    "--purple-200": "#F48FB1",
    "--purple-300": "#F06292",
    "--purple-400": "#EC407A",
    "--purple-500": "#E91E63",
    "--purple-600": "#D81B60",
    "--purple-700": "#C2185B",
    "--purple-800": "#AD1457",
    "--purple-900": "#880E4F",
    "--purple-a100": "#FF80AB",
    "--purple-a200": "#FF4081",
    "--purple-a400": "#F50057",
    "--purple-a700": "#C51162"
  },
  {
    "--purple-50": "#F3E5F5",
    "--purple-100": "#E1BEE7",
    "--purple-200": "#CE93D8",
    "--purple-300": "#BA68C8",
    "--purple-400": "#AB47BC",
    "--purple-500": "#9C27B0",
    "--purple-600": "#8E24AA",
    "--purple-700": "#7B1FA2",
    "--purple-800": "#6A1B9A",
    "--purple-900": "#4A148C",
    "--purple-a100": "#EA80FC",
    "--purple-a200": "#E040FB",
    "--purple-a400": "#D500F9",
    "--purple-a700": "#AA00FF"
  },
  {
    "--purple-50": "#EDE7F6",
    "--purple-100": "#D1C4E9",
    "--purple-200": "#B39DDB",
    "--purple-300": "#9575CD",
    "--purple-400": "#7E57C2",
    "--purple-500": "#673AB7",
    "--purple-600": "#5E35B1",
    "--purple-700": "#512DA8",
    "--purple-800": "#4527A0",
    "--purple-900": "#311B92",
    "--purple-a100": "#B388FF",
    "--purple-a200": "#7C4DFF",
    "--purple-a400": "#651FFF",
    "--purple-a700": "#6200EA"
  },
  {
    "--purple-50": "#E8EAF6",
    "--purple-100": "#C5CAE9",
    "--purple-200": "#9FA8DA",
    "--purple-300": "#7986CB",
    "--purple-400": "#5C6BC0",
    "--purple-500": "#3F51B5",
    "--purple-600": "#3949AB",
    "--purple-700": "#303F9F",
    "--purple-800": "#283593",
    "--purple-900": "#1A237E",
    "--purple-a100": "#8C9EFF",
    "--purple-a200": "#536DFE",
    "--purple-a400": "#3D5AFE",
    "--purple-a700": "#304FFE"
  },
  {
    "--purple-50": "#E3F2FD",
    "--purple-100": "#BBDEFB",
    "--purple-200": "#90CAF9",
    "--purple-300": "#64B5F6",
    "--purple-400": "#42A5F5",
    "--purple-500": "#2196F3",
    "--purple-600": "#1E88E5",
    "--purple-700": "#1976D2",
    "--purple-800": "#1565C0",
    "--purple-900": "#0D47A1",
    "--purple-a100": "#82B1FF",
    "--purple-a200": "#448AFF",
    "--purple-a400": "#2979FF",
    "--purple-a700": "#2962FF"
  },
  {
    "--purple-50": "#E1F5FE",
    "--purple-100": "#B3E5FC",
    "--purple-200": "#81D4FA",
    "--purple-300": "#4FC3F7",
    "--purple-400": "#29B6F6",
    "--purple-500": "#03A9F4",
    "--purple-600": "#039BE5",
    "--purple-700": "#0288D1",
    "--purple-800": "#0277BD",
    "--purple-900": "#01579B",
    "--purple-a100": "#80D8FF",
    "--purple-a200": "#40C4FF",
    "--purple-a400": "#00B0FF",
    "--purple-a700": "#0091EA"
  },
  {
    "--purple-50": "#E0F7FA",
    "--purple-100": "#B2EBF2",
    "--purple-200": "#80DEEA",
    "--purple-300": "#4DD0E1",
    "--purple-400": "#26C6DA",
    "--purple-500": "#00BCD4",
    "--purple-600": "#00ACC1",
    "--purple-700": "#0097A7",
    "--purple-800": "#00838F",
    "--purple-900": "#006064",
    "--purple-a100": "#84FFFF",
    "--purple-a200": "#18FFFF",
    "--purple-a400": "#00E5FF",
    "--purple-a700": "#00B8D4"
  },
  {
    "--purple-50": "#E0F2F1",
    "--purple-100": "#B2DFDB",
    "--purple-200": "#80CBC4",
    "--purple-300": "#4DB6AC",
    "--purple-400": "#26A69A",
    "--purple-500": "#009688",
    "--purple-600": "#00897B",
    "--purple-700": "#00796B",
    "--purple-800": "#00695C",
    "--purple-900": "#004D40",
    "--purple-a100": "#A7FFEB",
    "--purple-a200": "#64FFDA",
    "--purple-a400": "#1DE9B6",
    "--purple-a700": "#00BFA5"
  },
  {
    "--purple-50": "#E8F5E9",
    "--purple-100": "#C8E6C9",
    "--purple-200": "#A5D6A7",
    "--purple-300": "#81C784",
    "--purple-400": "#66BB6A",
    "--purple-500": "#4CAF50",
    "--purple-600": "#43A047",
    "--purple-700": "#388E3C",
    "--purple-800": "#2E7D32",
    "--purple-900": "#1B5E20",
    "--purple-a100": "#B9F6CA",
    "--purple-a200": "#69F0AE",
    "--purple-a400": "#00E676",
    "--purple-a700": "#00C853"
  },
  {
    "--purple-50": "#F1F8E9",
    "--purple-100": "#DCEDC8",
    "--purple-200": "#C5E1A5",
    "--purple-300": "#AED581",
    "--purple-400": "#9CCC65",
    "--purple-500": "#8BC34A",
    "--purple-600": "#7CB342",
    "--purple-700": "#689F38",
    "--purple-800": "#558B2F",
    "--purple-900": "#33691E",
    "--purple-a100": "#CCFF90",
    "--purple-a200": "#B2FF59",
    "--purple-a400": "#76FF03",
    "--purple-a700": "#64DD17"
  },
  {
    "--purple-50": "#F9FBE7",
    "--purple-100": "#F0F4C3",
    "--purple-200": "#E6EE9C",
    "--purple-300": "#DCE775",
    "--purple-400": "#D4E157",
    "--purple-500": "#CDDC39",
    "--purple-600": "#C0CA33",
    "--purple-700": "#AFB42B",
    "--purple-800": "#9E9D24",
    "--purple-900": "#827717",
    "--purple-a100": "#F4FF81",
    "--purple-a200": "#EEFF41",
    "--purple-a400": "#C6FF00",
    "--purple-a700": "#AEEA00"
  },
  {
    "--purple-50": "#FFFDE7",
    "--purple-100": "#FFF9C4",
    "--purple-200": "#FFF59D",
    "--purple-300": "#FFF176",
    "--purple-400": "#FFEE58",
    "--purple-500": "#FFEB3B",
    "--purple-600": "#FDD835",
    "--purple-700": "#FBC02D",
    "--purple-800": "#F9A825",
    "--purple-900": "#F57F17",
    "--purple-a100": "#FFFF8D",
    "--purple-a200": "#FFFF00",
    "--purple-a400": "#FFEA00",
    "--purple-a700": "#FFD600"
  },
  {
    "--purple-50": "#FFF8E1",
    "--purple-100": "#FFECB3",
    "--purple-200": "#FFE082",
    "--purple-300": "#FFD54F",
    "--purple-400": "#FFCA28",
    "--purple-500": "#FFC107",
    "--purple-600": "#FFB300",
    "--purple-700": "#FFA000",
    "--purple-800": "#FF8F00",
    "--purple-900": "#FF6F00",
    "--purple-a100": "#FFE57F",
    "--purple-a200": "#FFD740",
    "--purple-a400": "#FFC400",
    "--purple-a700": "#FFAB00"
  },
  {
    "--purple-50": "#FFF3E0",
    "--purple-100": "#FFE0B2",
    "--purple-200": "#FFCC80",
    "--purple-300": "#FFB74D",
    "--purple-400": "#FFA726",
    "--purple-500": "#FF9800",
    "--purple-600": "#FB8C00",
    "--purple-700": "#F57C00",
    "--purple-800": "#EF6C00",
    "--purple-900": "#E65100",
    "--purple-a100": "#FFD180",
    "--purple-a200": "#FFAB40",
    "--purple-a400": "#FF9100",
    "--purple-a700": "#FF6D00"
  },
  {
    "--purple-50": "#FBE9E7",
    "--purple-100": "#FFCCBC",
    "--purple-200": "#FFAB91",
    "--purple-300": "#FF8A65",
    "--purple-400": "#FF7043",
    "--purple-500": "#FF5722",
    "--purple-600": "#F4511E",
    "--purple-700": "#E64A19",
    "--purple-800": "#D84315",
    "--purple-900": "#BF360C",
    "--purple-a100": "#FF9E80",
    "--purple-a200": "#FF6E40",
    "--purple-a400": "#FF3D00",
    "--purple-a700": "#DD2C00"
  },
  {
    "--purple-50": "#EFEBE9",
    "--purple-100": "#D7CCC8",
    "--purple-200": "#BCAAA4",
    "--purple-300": "#A1887F",
    "--purple-400": "#8D6E63",
    "--purple-500": "#795548",
    "--purple-600": "#6D4C41",
    "--purple-700": "#5D4037",
    "--purple-800": "#4E342E",
    "--purple-900": "#3E2723",
    "--purple-a700" : "#000000"
  },
  {
    "--purple-50": "#FBFBFB",
    "--purple-100": "#F5F5F5",
    "--purple-200": "#EEEEEE",
    "--purple-300": "#E0E0E0",
    "--purple-400": "#BDBDBD",
    "--purple-500": "#9E9E9E",
    "--purple-600": "#757575",
    "--purple-700": "#616161",
    "--purple-800": "#4F4F4F",
    "--purple-900": "#262626",
    "--purple-a700" : "#000000"
  },
  {
    "--purple-50": "#ECEFF1",
    "--purple-100": "#CFD8DC",
    "--purple-200": "#B0BEC5",
    "--purple-300": "#90A4AE",
    "--purple-400": "#78909C",
    "--purple-500": "#607D8B",
    "--purple-600": "#546E7A",
    "--purple-700": "#455A64",
    "--purple-800": "#37474F",
    "--purple-900": "#263238",
    "--purple-a700" : "#000000"
  },
  {
    "--purple-black": "#000000",
    "--purple-white": "#FFFFFF",
    "--purple-a700" : "#000000",
  }
];

      // Generate a random index to select a color palette
      const randomIndex = Math.floor(Math.random() * colorPalettes.length);

      // Set the color palette using the selected index
      const selectedPalette = colorPalettes[randomIndex];
      Object.entries(selectedPalette).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });

      function copyCode(element, id) {
    console.log(id);
  const codeBlock = element;
  const range = document.createRange();
  range.selectNode(codeBlock);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  const copyText = document.getElementById(id);
  copyText.style.display = "inline-block";
  copyText.classList.add("show");
  setTimeout(() => {
    copyText.classList.remove("show");
  }, 2000);
}
