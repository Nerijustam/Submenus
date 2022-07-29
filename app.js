import sublinks from "./data.js";

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linkBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");

// hide/show sidebar

toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});

// set sidebar
sidebar.innerHTML = sublinks
  .map((item) => {
    // console.log(item);
    const { links, page } = item;
    return `<article>
  <h4>${page}</h4>
  <div class='sidebar-sublinks'>
  ${links
    .map((link) => {
      return `<a href='${link.url}'>
      <i class='${link.icon}'></i>${link.label}
      </a>`;
    })
    .join("")}
  </div>
  </article>`;
  })
  .join("");

linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", function (e) {
    // console.log(e.currentTarget);
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    // To get the center of the button. It gives a center
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    // Find the item, that has the text quel to page value
    const tempPage = sublinks.find(({ page }) => page === text);
    // If that item is there, if it's not on the phone, only then targeting submenu., only then do our steps
    if (tempPage) {
      const { page, links } = tempPage;
      // Show other sidebar, when mouse is on the name
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;
      // Optional
      // Properties are in style.css
      let columns = "col-2";
      if (links.length === 3) {
        columns = "col-3";
      }
      if (links.length > 3) {
        columns = "col-4";
      }

      // Setting up the innerHTML where display my page and heading for and interate over our link
      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class="submenu-center ${columns}">
      ${links
        .map((link) => {
          return `<a href='${link.url}'>
      <i class='${link.icon}'></i>${link.label}`;
        })
        .join("")}
      </div>
      </section>
      `;
    }
  });
});

hero.addEventListener("mouseover", function (e) {
  submenu.classList.remove("show");
});
nav.addEventListener("mouseover", function (e) {
  // if the target that I'm hovering over does not have the linl button class
  if (!e.targer.classList.contains("link-btn"))
    submenu.classList.remove("show");
});
