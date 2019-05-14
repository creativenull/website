<template>
<div>
  <!-- HEADER -->
  <Header :showBanner="false" />

  <!-- BODY -->
  <section class="app__body container mx-auto flex justify-center items-center">
    <h1 class="text-2xl">Four'o Four. I'm not hiding anythin' >_></h1>
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
.app__body
  min-height: 100vh
</style>
