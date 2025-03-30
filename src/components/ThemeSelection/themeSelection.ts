const html = document.querySelector("html");
let theme = localStorage.getItem("theme") ?? "light dark";
const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  'input[name="theme-radio"]',
);

if (theme && html) {
  html.style.setProperty("color-scheme", theme);
  radios.forEach((radio) => {
    if (radio.value === theme) {
      radio.checked = true;
    }
  });
}
if (html) {
  radios.forEach((radio) => {
    radio.addEventListener("click", function () {
      const radioVal = radio.value;
      html.style.setProperty("color-scheme", radioVal);
      theme = radioVal;
      localStorage.setItem("theme", radioVal);
    });
  });
}
