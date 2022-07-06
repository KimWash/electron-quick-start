// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function onImageClick() {
  console.log("image clicked");
  const childWindow = window.open("", "modal");
  childWindow.document.write("<h1>Hello</h1>");
}

document.querySelector("#logo").addEventListener("click", () => { onImageClick() })