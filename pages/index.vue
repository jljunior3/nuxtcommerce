<template>
  <div>
    <Header placeholder-search="Busca" @search="setSearchTerm" />
    <main>
      <h2>Home</h2>
      <p v-if="!list.length">Carregando...</p>

      <div v-else class="row">
        <Card
          v-for="item in list"
          :key="item.id"
          :item="item"
          :favorites="favoritesProducts"
          :show-badge="true"
          :show-remove-icon="false"
          class="col-4 col-s-6 col-m-12 col-lg-3"
          @setFavoriteProduct="setFavoriteProduct"
        />
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      data: [],
      searchTerm: '',
      favoritesProducts: [],
    }
  },
  computed: {
    list() {
      if (this.searchTerm !== '') {
        return this.data.products.filter((product) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }
      return this.data.products || []
    },
  },
  mounted() {
    this.favoritesProducts = JSON.parse(localStorage.getItem('favorites')) || []
    this.getProdutcts()
  },
  methods: {
    setSearchTerm(term) {
      this.searchTerm = term
    },
    setFavoriteProduct(product) {
      const exist = this.favoritesProducts.includes(product.id)

      if (exist) {
        this.favoritesProducts = this.favoritesProducts.filter(
          (id) => id !== product.id
        )
      } else {
        this.favoritesProducts.push(product.id)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favoritesProducts))
    },
    async getProdutcts() {
      try {
        this.data = (
          await axios.get(
            'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'
          )
        ).data

        this.$store.commit('products/setProducts', this.data.products)
      } catch (error) {
        this.errorMessage = 'Problemas ao carregar a lista de produtos!'
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
