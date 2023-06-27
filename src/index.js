import * as core from "./core_modules";
import "./style.css";
import { createModal } from "./modal";

const createNewToDoBtn = document.createElement("button");
createNewToDoBtn.setAttribute("id", "open-modal");
createNewToDoBtn.innerText = "Add a To Do Item";
document.body.appendChild(createNewToDoBtn);
createModal();

const modal = document.querySelector(".modal");

// Get the button that opens the modal
const btn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// When the user clicks on the button, open the modal
btn.onclick = function () {
	modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
