<template>
  <div>
    <h1>Страница с постами</h1>
    <div class="app__buttons">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="posts" @remove="removePost" />
    <div class="observer" v-intersection="lodaMorePosts"></div>
    <!-- <div class="page__wrapper">
      <div
        class="page"
        v-for="pageNumber in totalPages"
        :class="{ 'current-page': page === pageNumber }"
        :key="pageNumber"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import postForm from '@/components/postForm.vue'
import postList from '@/components/postList.vue'
import axios from 'axios'

export default {
  components: {
    postList,
    postForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержанию' },
        { value: 'id', name: 'По номеру ID' },
      ],
    }
  },
  methods: {
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert('Ошибка')
      }
    },
    async lodaMorePosts() {
      try {
        this.page += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('Ошибка')
      }
    },
  },
  mounted() {
    this.fetchPosts()
  },

  // computed: {
  //   sortedPosts() {
  //     return [...this.posts].sort((post1, post2) => {
  //       return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
  //     })
  //   },
  // },
  watch: {
    selectedSort(newValue) {
      console.log(newValue)
      this.posts.sort((post1, post2) => {
        return post1[newValue]?.localeCompare(post2[newValue])
      })
    },
    // page() {
    //   this.fetchPosts()
    // },
  },
}
</script>

<style>
.app__buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
  gap: 10px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid grey;
}
.observer {
  height: 30px;
  background-color: red;
}
</style>
