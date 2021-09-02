<template>
  <header>
    <section class="info">
      <h1 class="info__title">MagaNets</h1>
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
            <li><heart-icon class="heart-icon" />Lista de desejos</li>
          </ul>
        </nav>
      </div>
      <div class="search">
        <input class="search__input" type="search" placeholder="Busca" />
      </div>
    </section>
  </header>
</template>

<script>
import PlaceIcon from '~/assets/icons/place.svg?inline'
import PhoneIcon from '~/assets/icons/phone.svg?inline'
import HeartIcon from '~/assets/icons/heart.svg?inline'
export default {
  components: {
    PlaceIcon,
    PhoneIcon,
    HeartIcon,
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
        }
      }
    }

    .search {
      &__input {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: none;
        outline: none;
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
