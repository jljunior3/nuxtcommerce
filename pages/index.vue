<template>
  <div>
    <Header />
    <main>
      <h2>Home</h2>
      <p v-if="$fetchState.pending">Fetching mountains...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>

      <div v-else class="row">
        <div v-for="item in data.products" :key="item.id" class="col-3 card">
          <div class="card__item">
            <div class="card__item__badge">
              <heart-icon class="card__item__badge--icon" />
            </div>
            <img class="card__item__image" :src="item.image" />
            <p class="card__item__title">{{ item.title }}</p>
            <p class="card__item__price">
              {{
                item.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HeartIcon from '~/assets/icons/heart.svg?inline'

export default {
  components: {
    HeartIcon,
  },
  data() {
    return {
      data: [],
      search: '',
    }
  },
  async fetch() {
    this.data = await fetch(
      'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'
    ).then((res) => res.json())
  },
  computed: {
    filteredData() {
      return this.data.productsfilter((product) =>
        product.title.includes(this.search)
      )
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

  .card {
    height: 300px;
    /* border: solid 1px black; */

    &__item {
      background: white;
      text-align: center;
      height: 100%;
      border-radius: 5px;
      border: solid 1px #dbdbdb;
      -webkit-box-shadow: 0px 10px 13px -7px #b5b2b2, 0px 2px 2px -1px #dbdbdb;
      box-shadow: 0px 10px 13px -7px #b5b2b2, 0px 2px 2px -1px #dbdbdb;
      position: relative;

      &__image {
        max-width: 40%;
        margin-top: 15px;
      }

      &__title {
        font-weight: bold;
      }

      &__price {
        color: #ebca15;
        font-weight: bold;
        margin-bottom: 30px;
      }
    }

    .card__item__badge {
      width: 35px;
      height: 45px;
      background: black;
      position: absolute;
      top: -3px;
      left: 6px;

      &:after {
        content: '';
        left: 0;
        position: absolute;
        top: 45px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 13.6px 20px 0 15px;
        border-color: black transparent transparent transparent;
      }

      &--icon {
        color: white;
        height: 100%;
      }
    }
  }
}
</style>
