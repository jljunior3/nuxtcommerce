<template>
  <div>
    <Header placeholder-search="Busca" @search="setSearchTerm" />
    <main>
      <h2>Home</h2>
      <p v-if="$fetchState.pending">Carregando...</p>
      <p v-else-if="$fetchState.error">Ocorreu um erro :(</p>

      <div v-else class="row">
        <Card
          v-for="item in list"
          :key="item.id"
          :item="item"
          :favorites="favoritesProducts"
          :show-badge="true"
          :show-remove-icon="false"
          class="col-3"
          @setFavoriteProduct="setFavoriteProduct"
        />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      searchTerm: '',
      favoritesProducts: [],
    }
  },
  async fetch() {
    this.data = await fetch(
      'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'
    ).then((res) => res.json())
    if (this.data.products) {
      this.$store.commit('products/setProducts', this.data.products)
    }
  },
  computed: {
    list() {
      if (this.searchTerm !== '') {
        return this.data.products.filter((product) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }
      return this.data.products
    },
  },
  mounted() {
    this.favoritesProducts = JSON.parse(localStorage.getItem('favorites')) || []
  },
  methods: {
    setSearchTerm(term) {
      this.searchTerm = term
    },
    setFavoriteProduct(product) {
      if (process.browser) {
        const exist = this.favoritesProducts.includes(product.id)

        if (exist) {
          this.favoritesProducts = this.favoritesProducts.filter(
            (id) => id !== product.id
          )
        } else {
          this.favoritesProducts.push(product.id)
        }
        localStorage.setItem(
          'favorites',
          JSON.stringify(this.favoritesProducts)
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  height: calc(100vh - 170px);
  overflow: auto;
  margin: 160px 40px 10px 40px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  h2 {
    padding-left: 15px;
    font-weight: 900;
  }
}
</style>
