import { circleTransition } from "../../scripts/circleTransition";

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
// What a theme value actually shows: "light dark" follows the OS setting.
const resolve = (value: string) =>
  value === "light dark"
    ? matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : value;

if (html) {
  radios.forEach((radio) => {
    radio.addEventListener("click", function () {
      const radioVal = radio.value;
      if (radioVal === theme) return;
      const from = resolve(theme);
      const to = resolve(radioVal);
      theme = radioVal;
      localStorage.setItem("theme", radioVal);

      const apply = () => html.style.setProperty("color-scheme", radioVal);
      // e.g. system (dark) -> dark: nothing changes visually, so no animation
      if (from === to) return apply();
      // like a light switch: light spreads from the icon, dark pulls the light back into it
      // (the radio itself is hidden, so the circle uses its label, the icon)
      circleTransition(radio.labels?.[0] ?? radio, apply, to === "dark");
    });
  });
}
