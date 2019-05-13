module.exports = {
  title: "Creative Nobody",
  description: "A blog on electronics, software and everything in-between.",
  themeConfig: {
    nav: [
      { text: "About", link: "/about" },
      { text: "Posts", link: "/posts/" },
      { text: "Github", link: "https://github.com/thecreativenobody", target: "_blank" },
      { text: "LinkedIn", link: "https://linkedin.com/in/arnoldjchand" },
    ]
  },
  postcss: {
    plugins: [require("tailwindcss")("./tailwind.js"), require("autoprefixer")]
  },
  plugins: [
    ["vuepress-plugin-container", {
      type: "tip",
      before: info => `<div class="tip font-open"><p class="tip__title font-bold">${info}</p>`,
      after: "</div>",
    }]
  ],
}
