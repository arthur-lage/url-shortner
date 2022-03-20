const linksSection = document.querySelector(".links-section");
const section = document.querySelector(".shorten-link-section");
const input = document.querySelector("#shorten-link-input");
const button = document.querySelector("#shorten-it-button");

const links = [];

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

button.addEventListener("click", () => {
  if (input.value.length == 0) {
    section.classList.add("error");
    return;
  }

  section.classList.remove("error");

  fetch(
    `https://api.shrtco.de/v2/shorten?url=https://${input.value.toLowerCase()}`
  )
    .then((res) => res.json())
    .then((data) => handleData(data))
    .catch((err) => console.log(err));
});

function handleData(data) {
  const link = data.result["full_short_link"];
  const originalLink = data.result["original_link"];

  links.push({
    link,
    originalLink,
  });

  showLinks();
}

function showLinks() {
  linksSection.innerHTML = "";

  links.forEach((link) => {
    const newLink = `
            <div class="short-link">
                <div class="left">
                    <span>${link.originalLink}</span>
                </div> 
                <div class="right">
                    <a target="_blank" href="${link.link}">${link.link}</a>
                    <button onclick="copyLink(this, '${link.link}')">Copy</button>
                </div>            
            </div>
        `;

    linksSection.innerHTML += newLink;
  });
}

function copyLink(e, link) {
  e.classList.add("copied");

  setTimeout(() => e.classList.remove("copied"), 2500);

  input.select();
  input.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(link);
}

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");

  if (hamburger.classList.contains("active")) {
    mobileMenu.classList.add("active");
    document.body.style.overflowY = "hidden"
  } else {
    mobileMenu.classList.remove("active");
    document.body.style.overflowY = "auto"
  }
});
