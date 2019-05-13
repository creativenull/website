<template>
  <header class="tcn__header font-open">
    <div class="header__menu p-4 flex flex-row-reverse justify-between items-center bg-gray-900 shadow-md">
      <a class="text-white no-underline md:hidden" @click="onMenuClick" href="#">{{ menuText }}</a>

      <h1><a class="text-white text-xl no-underline md:text-4xl" href="/">Arnold <span class="text-blue-600">Chand</span></a></h1>

      <ul class="menu__list list-reset bg-gray-900 hidden md:inline">
        <li v-for="item in $site.themeConfig.nav" class="menu__item md:inline">
          <a class="menu__link px-2 no-underline text-lg text-white hover:underline" :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </div>

    <div class="header__menu--mobile text-center shadow-md md:hidden" :class="{'hidden': menuHide}">
      <ul class="menu__list--mobile list-reset bg-gray-900">
        <li v-for="item in $site.themeConfig.nav" class="menu__item--mobile py-2">
          <a class="menu__link--mobile px-2 no-underline text-lg text-white hover:underline" :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </div>

    <div class="header__banner flex items-center justify-center" v-if="showBanner">
      <div class="banner__block">
        <h1 class="banner__title text-4xl text-center md:text-6xl"><span class="text-blue-600">Creative</span> Nobody</h1>
        <p class="banner__subtitle text-sm text-center font-open-light md:text-xl">{{ $site.description }}</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showBanner: Boolean
  },

  data() {
    return {
      menuHide: true,
      menuText: "Menu"
    }
  },

  computed: {
    displayBanner() {
      return this.showBanner
    }
  },

  methods: {
    onMenuClick() {
      this.menuHide = !this.menuHide
      this.menuText = this.menuHide ? "Menu" : "Close"
    }
  }
}
</script>

<style lang="stylus" scoped>
.text-6xl
  font-size: 4rem

.header__banner
  height: 200px
  background: #080808

.banner__block
  color: #ffffff

</style>
