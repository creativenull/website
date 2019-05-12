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
@import url("https://fonts.googleapis.com/css?family=Noto+Serif|Open+Sans:300,400")

@import "~prismjs/themes/prism-tomorrow.css"

.post > p,
.post > ul,
.post > ol
  margin: 15px 0
  color: #222
  line-height: 1.5em


.post > h2,
.post > h3,
.post > h4
  color: #333

.post > * > a
  color: #333

</style>
