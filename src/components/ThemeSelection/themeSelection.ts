const html = document.querySelector("html");
let theme = localStorage.getItem("theme");
let themeSelect: HTMLSelectElement | null = document.querySelector("#theme-select");

if (theme && html && themeSelect) {
    html.style.setProperty("color-scheme", theme);
    themeSelect.value = theme;
}

if (themeSelect) {
    themeSelect.addEventListener("change", (e) => {
        const target = e.target as HTMLSelectElement;
        const value = target.value;
        if (html) {
            html.style.setProperty("color-scheme", value);
            theme = value;
            localStorage.setItem("theme", value);
        }
    });
}