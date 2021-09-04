<template>
  <header>
    <div class="row">
      <section class="info col-3">
        <NuxtLink to="/">
          <h1 class="info__title">MagaNets</h1>
        </NuxtLink>
      </section>
      <section class="navbar col-9">
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
    </div>
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
  height: 150px;
  background: #5a2d82;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  border-top: solid 8px #371050;

  @media only screen and (max-width: 600px) {
    height: 220px;
  }

  @media only screen and (min-width: 601px) and (max-width: 899px) {
    height: 200px;
  }

  .info {
    margin-top: 20px;
    a {
      text-decoration: none;
      color: white;
    }

    &__title {
      color: white;
      margin: 0;
    }

    @media only screen and (max-width: 479px) {
      padding-bottom: 0;
    }

    @media only screen and (max-width: 899px) {
      margin-top: initial;
    }
  }

  ul {
    width: 100%;
    padding: 0;
    color: white;

    @media only screen and (max-width: 479px) {
      display: inline-table;
    }
  }
  ul li {
    display: inline-block;
  }
  li:nth-child(1) {
    width: 33%;
    text-align: left;

    @media only screen and (max-width: 600px) {
      display: block;
      text-align: left;
      padding-bottom: 10px;
    }

    @media only screen and (max-width: 479px) {
      width: 100%;
    }
  }
  li:nth-child(2) {
    width: 32%;
    text-align: center;

    @media only screen and (max-width: 600px) {
      width: 45%;
      text-align: left;
    }
  }
  li:nth-child(3) {
    width: 33%;
    text-align: right;
    a {
      text-decoration: none;
      color: white;
    }

    @media only screen and (max-width: 600px) {
      width: 54%;
      text-align: right;
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
