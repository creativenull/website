module.exports = {
  title: "CreativeNobu",
  description: "A blog on hardware, software, thoughts, etc.",
  themeConfig: {
    nav: [
      {
        text: "About",
        link: "/about",
      },
      {
        text: "Resume",
        link: "/resume",
      },
      {
        text: "Posts",
        link: "/posts",
      },
      {
        text: "Github",
        link: "https://github.com/creativenobu",
      },
    ],
  },
  postcss: {
    plugins: [
      require("tailwindcss"),
      require("autoprefixer"),
    ],
  },
  plugins: [
    ["vuepress-plugin-container", {
      type: "tip",
      before: info => `<div class="tip font-open"><p class="tip__title font-bold">${info}</p>`,
      after: "</div>",
    }],
  ],
};
