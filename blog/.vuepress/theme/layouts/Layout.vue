<template>
  <div>
    <!-- HEADER -->
    <Header :showBanner="false" />

    <!-- BODY -->
    <section class="app__body post font-noto container mx-auto px-2 md:px-5">
      <Content />
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

.post
  padding: 10px 0

.post > div > p,
.post > div > ul,
.post > div > ol
  margin: 15px 0
  color: #222
  line-height: 1.5em
  font-size: 1rem

.post > div > h1 > a,
.post > div > h2 > a,
.post > div > h3 > a,
.post > div > h4 > a
  display: none

.post > div > h1
  font-size: 1.875rem

.post > div > h2
  font-size: 1.5em

.post > div > h3
  font-size: 1.25rem

.post > div > h4
  font-size: 1.125rem

.post > div > h2,
.post > div > h3,
.post > div > h4
  color: #333

.post > div > * > a
  color: #333
  text-decoration: underline
</style>
