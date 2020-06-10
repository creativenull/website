<template>
  <div>
    <!-- HEADER -->
    <Header show-banner />

    <!-- BODY -->
    <section class="app__body">
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
