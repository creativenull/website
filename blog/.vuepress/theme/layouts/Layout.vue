<template>
  <div>
    <!-- HEADER -->
    <Header />

    <!-- BODY -->
    <section class="app__body min-h-screen post font-noto container mx-auto md:w-3/5">
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
.post
  padding: 10px 5px

.post > div > p,
.post > div ul,
.post > div ol
  margin: 15px 0
  color: #222
  line-height: 2em
  font-size: 1.2rem

.post > div ul
  list-style-type: disc

.post > div li
  margin-left: 3rem

.post > div > h1 > a,
.post > div > h2 > a,
.post > div > h3 > a,
.post > div > h4 > a
  display: none

.post > div > h1
  font-size: 2rem

.post > div > h2
  font-size: 1.8em
  font-weight: bold

.post > div > h3
  font-size: 1.25rem
  font-weight: bold

.post > div > h4
  font-size: 1.125rem

.post > div > h2,
.post > div > h3,
.post > div > h4
  color: #333

.post > div a
  color: #0f57a7
  text-decoration: underline

.post > div > table
  margin: 0 auto

.post > div > table thead
  padding: 10px

.post > div > table tr
  border: 1px solid #333

.post > div > table td
  padding: 10px

.post > div > blockquote
  margin-top: 20px
  margin-bottom: 20px
  margin-left: 20px
  padding: 10px
  border-left: solid #333 2px
  font-size: 0.9rem
</style>
