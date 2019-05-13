<template>
  <header class="tcn__header font-open">
    <div class="header__menu px-4 flex flex-col-reverse md:flex-row md:justify-between items-center bg-gray-900 shadow-md">
      <ul class="menu__list list-reset">
        <li v-for="item in $site.themeConfig.nav" class="menu__item md:inline">
          <a class="menu__link px-2 no-underline text-lg text-white" :href="item.link">{{ item.text }}</a>
        </li>
      </ul>

      <h1><a class="text-white text-3xl no-underline font-bold" href="/">Arnold <span class="text-blue-600">Chand</span></a></h1>
    </div>

    <div class="header__banner flex items-center justify-center" v-if="showBanner">
      <div class="banner__block">
        <h1 class="banner__title text-4xl md:text-6xl text-center"><span class="text-blue-600">Creative</span> Nobody</h1>
        <p class="banner__subtitle text-sm md:text-xl text-center font-open-light">{{ $site.description }}</p>
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
      return this.showBanner
    }
  }
}
</script>

<style lang="stylus" scoped>
.header__menu

.menu__link:hover
  text-decoration: underline

.text-6xl
  font-size: 4rem

.header__banner
  height: 400px
  background: #080808

.banner__block
  color: #ffffff
</style>
