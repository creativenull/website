<template>
<div>
  <!-- HEADER -->
  <Header :showBanner="false" />

  <!-- BODY -->
  <section class="tcn__body container mx-auto text-center">
    <h1>Four'o Four. I guess you didn't find the secret code :)</h1>
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

