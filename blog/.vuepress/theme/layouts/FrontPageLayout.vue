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

</style>
