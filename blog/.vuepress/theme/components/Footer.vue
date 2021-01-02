<template>
  <footer class="app__footer text-white bg-black">
    <div class="footer__block flex justify-center items-center px-3">
      <h6 class="footer__copyright text-xs">
        2020 - 2021 Arnold Chand ({{ $site.themeConfig.username }}) | Made with ❤  by
        <a rel="noreferrer" class="footer__link text-white underline" target="_blank" href="https://vuepress.vuejs.org/">
          VuePress
        </a> &amp;
        <a rel="noreferrer" class="footer__link text-white underline" target="_blank" href="https://tailwindcss.com/">
          TailwindCSS
        </a>
      </h6>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="stylus">
.app__footer
  height: 100px
  width: 100%
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

.footer__block
  height: 100%
</style>
