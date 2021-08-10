// Javascript Codes
const container = document.getElementById("container");
container.childNodes.forEach((box, index) => {
  const icon = box.childNodes[7];
  const small = box.childNodes[5];
  const imgs = box.childNodes[3];
  box.addEventListener("mouseover", () => {
    box.style.backgroundColor = "black";
    small.style.color = "rgb(255, 145, 0)";
    imgs.style.filter = "contrast(150%)";
    icon.classList.remove("hide");
    icon.classList.add("show");
  });
  box.addEventListener("mouseout", () => {
    icon.classList.add("hide");
    icon.classList.remove("show");
    imgs.style.filter = "contrast(100%)";

    box.style.backgroundColor = "#f4f4f4";
    small.style.color = "black";
  });
});

const Typewriter = function (txtElement, words, wait = 2000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.IsDeleting = false;
};

// type method
Typewriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];

  if (this.IsDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  let typeSpeed = 50;
  if (this.IsDeleting) {
    typeSpeed /= 2;
  }

  if (!this.IsDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.IsDeleting = true;
  } else if (this.IsDeleting && this.txt === "") {
    this.IsDeleting = false;
    this.wordIndex++;
    typeSpeed = 50;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init on DOM load

document.addEventListener("DOMContentLoaded", init);

// initialize

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new Typewriter(txtElement, words, wait);
}
