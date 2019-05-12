<template>
<div>

  <!-- HEADER -->
  <Header :showBanner="false" />

  <!-- BODY -->
  <section class="tcn__body container mx-auto">
    <Content class="post font-noto" />
  </section>
  
  <!-- FOOTER -->
  <Footer />
</div>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="stylus">
@import "./styles/theme.styl"
@import url('https://fonts.googleapis.com/css?family=Noto+Serif|Open+Sans:300,400')

@import "./styles/toc.styl"
@import "./styles/code.styl"
@import "./styles/custom-blocks.styl"

.font-noto
  font-family: 'Noto Serif', serif

.font-open
  font-family: 'Open Sans', sans-serif

.font-open-light
  font-family: 'Open Sans', sans-serif
  font-weight: 300

.post > p
  margin: 15px 0
  color: #222

.post > h2,
.post > h2 > a
  color: #333

.post > h2 > a
  display: none
</style>
