<template>
  <div>
    <!-- HEADER -->
    <Header />

    <!-- BODY -->
    <section class="app__body min-h-screen page font-noto container px-2 mx-auto md:w-3/5">
      <Content class="px-2" />
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
.page > div
  padding: 10px 0

.page > div > p,
.page > div > ul,
.page > div > ol
  margin: 15px 0
  color: #222
  line-height: 1.5em

.page > div > h1,
.page > div > h2,
.page > div > h3,
.page > div > h4
  color: #333

.page > div > h1
  font-size: 1.875rem

.page > div > h2
  font-size: 1.5em

.page > div > h3
  font-size: 1.25rem

.page > div > h4
  font-size: 1.125rem

.page > div > h1 > a,
.page > div > h2 > a,
.page > div > h3 > a
  color: #333
  display: none

.page > div > * > a
  text-decoration: underline

.page > div ul
  margin-left: 30px
  list-style-type: disc
</style>
