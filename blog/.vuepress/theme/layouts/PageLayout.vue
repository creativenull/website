<template>
<div>
  <!-- HEADER -->
  <Header :showBanner="false" />

  <!-- BODY -->
  <section class="tcn__body container mx-auto px-2">
    <Content class="page font-noto" />
  </section>
  
  <!-- FOOTER -->
  <Footer />
</div>
</template>

<script>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="stylus">
@import "../styles/theme.styl"

.tcn__body
  margin-top: 10px
  margin-bottom: 10px
  min-height: 100vh

.page > p,
.page > ul,
.page > ol
  margin: 15px 0
  color: #222
  line-height: 1.5em

.page > h1,
.page > h2,
.page > h3,
.page > h4
  color: #333

.page > h1
  font-size: 1.875rem
  text-align: center

.page > h2
  font-size: 1.5em

.page > h3
  font-size: 1.25rem

.page > h4
  font-size: 1.125rem

.page > h1 > a,
.page > h2 > a,
.page > h3 > a
  color: #333
  display: none

</style>
