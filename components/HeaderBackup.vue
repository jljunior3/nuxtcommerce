<template>
  <header>
    <section class="info">
      <NuxtLink to="/">
        <h1 class="info__title">MagaNets</h1>
      </NuxtLink>
    </section>
    <section class="navbar">
      <div class="container">
        <nav class="navbar__container__menu">
          <ul class="navbar__container__menu__list">
            <li><place-icon class="place-icon" /> Cidade: São Paulo</li>
            <li>
              <phone-icon class="phone-icon" />
              Central de atendimento
            </li>
            <li>
              <NuxtLink to="/wishlist">
                <heart-icon class="heart-icon" />Lista de desejos
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="search">
        <search
          :placeholder="placeholderSearch"
          @doSearch="setEmitSearchTerm"
        />
      </div>
    </section>
  </header>
</template>

<script>
export default {
  components: {},
  props: {
    placeholderSearch: {
      type: String,
      required: true,
    },
  },
  methods: {
    setEmitSearchTerm(filter) {
      this.$emit('search', filter.term)
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 150px;
  background: #5a2d82;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  border-top: solid 8px #371050;

  .info {
    width: 200px;
    display: flex;
    align-items: center;
    margin-top: -30px;
    padding-left: 30px;

    a {
      text-decoration: none;
      color: white;
    }

    &__title {
      color: white;
      margin: 0;
    }
  }

  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin: 0px 40px;

    &__container {
      &__menu {
        &__list {
          display: flex;
          justify-content: space-between;
          list-style: none;
          padding-left: 0;
          color: white;
          font-weight: 500;

          li:last-child {
            a {
              text-decoration: none;
              color: white;
            }
          }
        }
      }
    }
  }
}

.phone-icon,
.place-icon,
.heart-icon {
  color: white;
  vertical-align: bottom;
}

.place-icon {
  width: 10px;
}

.phone-icon {
  width: 14px;
}

.heart-icon {
  width: 16px;
  padding-right: 5px;
}
</style>
