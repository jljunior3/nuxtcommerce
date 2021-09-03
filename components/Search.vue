<template>
  <form @submit.prevent="doSearch">
    <input
      v-model="term"
      class="search"
      type="search"
      :placeholder="placeholder"
      @keydown.esc.prevent="clear"
    />
  </form>
</template>

<script>
export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      default: 'Busca',
    },
  },
  data() {
    return {
      term: '',
    }
  },
  watch: {
    term() {
      if (this.term === '') {
        this.doSearch()
      }
    },
  },
  methods: {
    doSearch() {
      this.$emit('doSearch', { term: this.term })
    },
    clear() {
      this.term = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  padding-left: 40px;
  background-image: url('~/assets/icons/search2x.svg');
  background-size: 18px 18px;
  background-repeat: no-repeat;
  background-position: 10px 8px;
}
</style>
