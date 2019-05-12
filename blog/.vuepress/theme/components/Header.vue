<template>
  <header class="tcn__header">
    <div class="header__menu px-4 flex items-center justify-between bg-black">
      <ul class="menu__list list-reset">
        <li v-for="item in $site.themeConfig.nav" class="menu__item inline">
          <a class="menu__link px-2 text-xl no-underline text-white" :href="item.link">{{ item.text }}</a>
        </li>
      </ul>

      <h1><a class="text-white no-underline" href="/">Arnold <span class="text-blue-dark">Chand</span></a></h1>
    </div>

    <div class="header__banner flex items-center justify-center shadow-md" :class="displayBanner">
      <div class="banner__block">
        <h1 class="banner__title text-6xl text-center font-open"><span class="text-blue-dark">Creative</span> Nobody</h1>
        <p class="banner__subtitle text-xl text-center font-open-light">{{ $site.description }}</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showBanner: Boolean
  },

  computed: {
    displayBanner() {
      if (this.showBanner) {
        return "banner-visible"
      } else {
        return "banner-hide"
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.header__menu
  height: 80px

.menu__link:hover
  text-decoration: underline

.text-6xl
  font-size: 4rem

.header__banner
  height: 400px
  background: #080808

.banner__block
  color: #ffffff

.banner-visible
  display: default

.banner-hide
  display: none
</style>
