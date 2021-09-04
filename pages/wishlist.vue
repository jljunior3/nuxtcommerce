<template>
  <div>
    <Header placeholder-search="Buscar por favoritos" @search="setSearchTerm" />
    <main>
      <h2><NuxtLink to="/">Home</NuxtLink> > Lista de desejos</h2>

      <p v-if="errorMessage !== ''" class="empty">
        Problemas ao carregar a lista de favoritos!
      </p>
      <div v-if="list.length" class="row">
        <Card
          v-for="item in list"
          :key="item.id"
          :item="item"
          :favorites="favoritedProducts"
          :show-badge="false"
          :show-remove-icon="true"
          class="col-4 col-s-6 col-m-12 col-lg-3"
          @removeFavoriteProduct="removeFavoriteProduct"
        />
      </div>
      <p v-else class="empty">Sua lista de favoritos está vazia!</p>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      favoritedProducts: [],
      searchTerm: '',
      errorMessage: '',
    }
  },
  computed: {
    ...mapState('products', ['products']),
    list() {
      if (this.favoritedProducts.length && this.searchTerm !== '') {
        return this.products.filter(
          (product) =>
            this.favoritedProducts.includes(product.id) &&
            product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      } else {
        return this.products.filter((product) =>
          this.favoritedProducts.includes(product.id)
        )
      }
    },
  },
  mounted() {
    this.favoritedProducts = JSON.parse(localStorage.getItem('favorites')) || []
    if (!this.products.length && this.favoritedProducts.length) {
      this.getProdutcts()
    }
  },
  methods: {
    setSearchTerm(term) {
      this.searchTerm = term
    },
    removeFavoriteProduct(product) {
      const exist = this.favoritedProducts.includes(product.id)

      if (exist) {
        this.favoritedProducts = this.favoritedProducts.filter(
          (id) => id !== product.id
        )
      }
      localStorage.setItem('favorites', JSON.stringify(this.favoritedProducts))
    },
    async getProdutcts() {
      try {
        const response = (
          await axios.get(
            'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'
          )
        ).data.products
        this.$store.commit('products/setProducts', response)
      } catch (error) {
        this.errorMessage = 'Problemas ao carregar a lista de favoritos!'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  a {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
}

.empty {
  text-align: center;
}
</style>
