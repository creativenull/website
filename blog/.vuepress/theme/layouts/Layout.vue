<template>
<div>
  <!-- HEADER -->
  <Header :showBanner="false" />

  <!-- BODY -->
  <section class="tcn__body container mx-auto px-2 md:px-5">
    <Content class="post font-noto" />
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
@import "~prismjs/themes/prism-tomorrow.css"

.tcn__body
  margin-top: 10px
  margin-bottom: 10px

.post > p,
.post > ul,
.post > ol
  margin: 15px 0
  color: #222
  line-height: 1.5em
  font-size: 1rem

.post > h2 > a,
.post > h3 > a,
.post > h4 > a
  display: none

.post > h2
  font-size: 1.5em

.post > h3
  font-size: 1.25rem

.post > h4
  font-size: 1.125rem

.post > h2,
.post > h3,
.post > h4
  color: #333


.post > * > a
  color: #333
  text-decoration: underline

</style>
