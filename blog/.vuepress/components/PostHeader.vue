<template>
  <div class="post-props">
    <h1 class="post-title">{{ post.title }}</h1>
    <div class="post-meta-props">
      <span class="post-meta-date">Posted on {{ post.date }}</span> | <span class="post-meta-author">By {{ post.author }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["page"],
  
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
