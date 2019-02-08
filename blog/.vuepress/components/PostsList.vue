<template>
  <div class="posts" v-if="posts.length != 0">
    <div class="post" v-for="post in posts">
      <router-link :to="post.permalink">
        <h1 class="title">{{ post.title }}</h1>
      </router-link>
      <div class="post-meta-props">
        <span class="post-meta-date">Posted on {{ post.date }}</span> | <span class="post-meta-author">By {{ post.author }}</span>
      </div>
      <p class="description">{{ post.description }} <a :href="post.permalink">Read More</a></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["page"],
  computed: {
    posts() {
      let posts = []
      
      // select only the posts, via frontmatter
      this.$site.pages.forEach(el => {
        if (el.frontmatter.isPost)
          posts.push(el.frontmatter)
      })

      // sort array by date
      posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

      return posts
    }
  }
}
</script>
