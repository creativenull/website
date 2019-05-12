<template>
<div>
  <!-- HEADER -->
  <Header :showBanner="true" />

  <!-- BODY -->
  <section class="tcn__body">
    <FrontPagePosts />
  </section>
  
  <!-- FOOTER -->
  <Footer />
</div>
</template>

<script>
import Header from "../components/Header.vue"
import FrontPagePosts from "../components/FrontPagePosts.vue"
import Footer from "../components/Footer.vue"

export default {
  components: {
    Header,
    FrontPagePosts,
    Footer
  }
}
</script>

<style lang="stylus">
@import "../styles/theme.styl"
@import url("https://fonts.googleapis.com/css?family=Noto+Serif|Open+Sans:300,400")

@import "../styles/toc.styl"
@import "../styles/code.styl"
@import "../styles/custom-blocks.styl"

</style>
