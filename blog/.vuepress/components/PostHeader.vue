<template>
  <div class="post__props">
    <h1 class="post__title text-3xl md:text-left text-center">{{ post.title }}</h1>
    <div class="post__block font-open-light text-sm md:text-right text-center">
      <span class="post__date">Posted on {{ post.date }}</span> | <span class="post__author">By {{ post.author }}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    post() {
      return {
        title: this.$page.frontmatter.title,
        date: this.$page.frontmatter.date,
        author: this.$page.frontmatter.author
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.post__title
  margin: 10px 0
  color: #222
  font-size: 2.1rem
  font-weight: bold

.post__block
  margin: 10px 0
</style>
