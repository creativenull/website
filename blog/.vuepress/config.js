module.exports = {
  postcss: {
    plugins: [require("tailwindcss")("./tailwind.js"), require("autoprefixer")]
  },
  title: "Creative Nobody",
  description: "A blog on electronics, software and everything in-between.",
  themeConfig: {
    nav: [
      { text: "About", link: "/about" },
      { text: "Posts", link: "/posts/" },
      { text: "Github", link: "https://github.com/thecreativenobody" },
      { text: "LinkedIn", link: "https://linkedin.com/in/arnoldjchand" },
    ]
  }
}
