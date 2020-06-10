<template>
  <div>
    <!-- HEADER -->
    <Header />

    <!-- BODY -->
    <section class="app__body container mx-auto min-h-screen flex justify-center items-center text-center px-2">
      <h1 class="text-2xl">Four'o Four. You would think I'm hiding something, but I'm not I promise! >_></h1>
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
