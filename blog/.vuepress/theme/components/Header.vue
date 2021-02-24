<template>
  <header class="app__header font-open">
    <div class="header__menu p-4 flex flex-row justify-between items-center bg-gray-800 shadow-md">
      <a class="text-white no-underline md:hidden" @click="onMenuClick" href="#">{{ menuText }}</a>

      <ul class="menu__list hidden md:inline">
        <li v-for="item in $site.themeConfig.nav" class="menu__item md:inline">
          <a class="menu__link px-2 no-underline text-lg text-white hover:underline" :href="item.link">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>

    <div class="header__menu--mobile text-center shadow-md md:hidden" :class="{ hidden: menuHide }">
      <ul class="menu__list--mobile bg-gray-900">
        <li v-for="item in $site.themeConfig.nav" class="menu__item--mobile py-2">
          <a class="menu__link--mobile px-2 no-underline text-lg text-white hover:underline" :href="item.link">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>

    <div class="header__banner flex items-center justify-center banner-sm" v-if="showBanner">
      <div class="banner__block">
        <h1 class="banner__title text-4xl text-center md:text-9xl">
          <a @mouseover="onMouseHoverToggle" @mouseout="onMouseHoverToggle" :class="primaryColor" href="/">
            <span :class="secondaryColor">{{ $site.title.slice(0, 8) }}</span>{{ $site.title.slice(8) }}
          </a>
        </h1>
        <p class="banner__subtitle text-sm text-center font-open-light md:text-xl">{{ $site.description }}</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showBanner: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      menuHide: true,
      menuText: 'Menu',
      primaryColor: 'text-white',
      secondaryColor: 'text-blue-500'
    }
  },

  computed: {
    displayBanner() {
      return this.showBanner
    },
  },

  methods: {
    onMenuClick() {
      this.menuHide = !this.menuHide
      this.menuText = this.menuHide ? 'Menu' : 'Close'
    },

    onMouseHoverToggle() {
      [this.primaryColor, this.secondaryColor] = [this.secondaryColor, this.primaryColor];
    }
  }
}
</script>

<style lang="stylus">
@import "../styles/index.styl"

.header__banner
  background: #080808

.banner-sm
  height: 200px

.banner__block
  color: #ffffff

@media screen and (min-width: 768px)
  .banner-sm
    height: 400px
</style>
