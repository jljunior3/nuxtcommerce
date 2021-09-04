<template>
  <div class="card">
    <div class="card__item">
      <div v-if="showBadge" class="card__item__badge">
        <span data-testid="set-favorite-product" @click="setFavoriteProduct">
          <heart-icon class="card__item__badge--icon" :class="isFavorited" />
        </span>
      </div>
      <div
        v-if="showRemoveIcon"
        data-testid="remove-favorite-product"
        class="card__item__button--remove"
        @click="removeFavoriteProduct"
      ></div>
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
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    favorites: {
      type: Array,
      required: true,
    },
    showBadge: {
      type: Boolean,
      required: true,
      default: true,
    },
    showRemoveIcon: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    isFavorited() {
      return this.favorites.includes(this.item.id)
        ? 'card__item__badge--icon--red'
        : ''
    },
  },
  methods: {
    setFavoriteProduct() {
      this.$emit('setFavoriteProduct', this.item)
    },
    removeFavoriteProduct() {
      this.$emit('removeFavoriteProduct', this.item)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  height: 300px;

  @media only screen and (max-width: 600px) {
    max-height: 270px;
  }

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

      @media only screen and (max-width: 600px) {
        max-width: 30%;
      }
    }

    &__title {
      font-weight: bold;
      white-space: break-spaces;
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

      &--red {
        color: red;
      }
    }
  }

  .card__item__button--remove {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #f3f2f2;
    position: absolute;
    top: 5px;
    right: 5px;
    border: solid 2px black;

    &::before {
      content: ' ';
      position: absolute;
      display: block;
      background-color: black;
      width: 2px;
      left: 12px;
      top: 5px;
      bottom: 5px;
      transform: rotate(45deg);
    }

    &::after {
      content: ' ';
      position: absolute;
      display: block;
      background-color: black;
      height: 2px;
      top: 12px;
      left: 5px;
      right: 5px;
      transform: rotate(45deg);
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
