const canvas = document.getElementById("main_canvas")
const ctx = canvas.getContext("2d");
const myElement = document.getElementById("event")
const myTextArea = document.getElementById("textarea")
myTextArea.value = localStorage.getItem("wordBox1");
const dummy = document.getElementById("dummy")
const docTitleInput = document.getElementById("doc_title")
docTitleInput.value = localStorage.getItem("documentTitle");
var words = "";
var documentTitle = "";
var currentlyHoldingElement;
setInterval(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#66bade";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}, 10)

myElement.addEventListener("dragstart", (evt) => {
    evt.dataTransfer.setData("id", "my-element");

    const boundingRect = myElement.getBoundingClientRect();
    const offset = {
        x: evt.clientX - boundingRect.left,
        y: evt.clientY - boundingRect.top,
    };
    evt.dataTransfer.setData("offset", JSON.stringify(offset));
});

myElement.addEventListener("keyup", (evt) => {
    words = myTextArea.value;
    console.log(words)
    localStorage.setItem("wordBox1", words);
})
docTitleInput.addEventListener("keyup", (evt) => {
    documentTitle = evt.target.value;
    console.log(documentTitle);
    localStorage.setItem("documentTitle", documentTitle);
})


document.documentElement.addEventListener("dragover", (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
});

document.documentElement.addEventListener("drop", (evt) => {
    evt.preventDefault();

    if (evt.dataTransfer.getData("id") === "my-element") {
        const offset = JSON.parse(evt.dataTransfer.getData("offset"));
        const xPos = evt.clientX - offset.x;
        const yPos = evt.clientY - offset.y;
        myElement.style.left = `${xPos}px`;
        myElement.style.top = `${yPos}px`;
        myElement.style.bottom = "auto";
        myElement.style.right = "auto";
    }
    document.activeElement.blur();
});