const username = 'creativenull';
const themeConfig = {
  username,
  nav: [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Resume',
      link: '/resume',
    },
    {
      text: 'Posts',
      link: '/posts',
    },
    {
      text: 'Github',
      link: `https://github.com/${username}`,
    },
  ],
};

module.exports = {
  title: 'CreativeNull',
  description: 'Random engineering notes, blog, etc',
  themeConfig,
  postcss: {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  },
  plugins: [
    ['vuepress-plugin-container', {
      type: 'tip',
      before: info => `<div class='tip_container font-open'><p class='tip_container__title font-bold'>${info}</p>`,
      after: '</div>',
    }],
    ['vuepress-plugin-container', {
      type: 'update',
      before: () => `<div class='upd_container font-open'><p class='upd_container__title font-bold'>Update</p>`,
      after: '</div>',
    }],
  ],
};
