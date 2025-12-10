export default postModule = {
  state: () => ({
    posts: [],
    selectedSort: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По содержанию' },
      { value: 'id', name: 'По номеру ID' },
    ],
  }),
  getters: {},
  mutations: {
    setPosts(state) {
      state.posts = posts
    },
  },
  actions: {},
}
