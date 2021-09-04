import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import Wishlist from '@/pages/wishlist'
import Card from '@/components/Card'

jest.mock('axios', () => ({
  get: jest.fn(),
}))

describe('Wishlist', () => {
  let localVue
  let store

  const components = {
    Card,
    NuxtLink: jest.fn(),
  }

  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({
      modules: {
        products: {
          namespaced: true,
          state: {
            products: [],
          },
        },
      },
    })

    store.commit = jest.fn()
  })

  describe('[DOM]', () => {
    it('should mount the component', () => {
      const wrapper = mount(Wishlist, {
        components,
        store,
        localVue,
      })

      expect(wrapper.vm).toBeDefined()
    })

    it('should render component Card', async () => {
      const wrapper = shallowMount(Wishlist, {
        components,
        store,
        localVue,
      })

      wrapper.vm.$store.state.products = {
        products: [
          {
            id: 0,
            title: 'Camisa Nike',
            image: 'https://via.placeholder.com/300x300',
            price: 229.9,
          },
        ],
      }

      wrapper.setData({ favoritedProducts: [0] })

      await wrapper.vm.$nextTick()

      const card = wrapper.findComponent(Card)
      expect(card.exists()).toBe(true)
    })

    it('should not render component Card and show empty text', async () => {
      const wrapper = shallowMount(Wishlist, {
        components,
        store,
        localVue,
      })

      wrapper.vm.$store.state.products = {
        products: [
          {
            id: 0,
            title: 'Camisa Nike',
            image: 'https://via.placeholder.com/300x300',
            price: 229.9,
          },
        ],
      }

      wrapper.setData({ favoritedProducts: [1] })

      await wrapper.vm.$nextTick()

      const card = wrapper.findComponent(Card)
      expect(card.exists()).toBe(false)
      expect(wrapper.text()).toContain('Sua lista de favoritos está vazia!')
    })
  })
  describe('[data]', () => {})
  describe('[COMPUTED]', () => {})
  describe('[METHODOS]', () => {
    it('should set searchTerm when call setSearchTerm()', () => {
      const wrapper = shallowMount(Wishlist, {
        components,
        store,
        localVue,
      })

      wrapper.vm.setSearchTerm('nike')
      expect(wrapper.vm.searchTerm).toEqual('nike')
    })

    it('should remove product from favorites when call removeFavoriteProduct()', async () => {
      const wrapper = shallowMount(Wishlist, {
        components,
        store,
        localVue,
      })

      const product = {
        id: 0,
        title: 'Camisa Nike',
        image: 'https://via.placeholder.com/300x300',
        price: 229.9,
      }

      wrapper.vm.$store.state.products = {
        products: [product],
      }

      wrapper.setData({ favoritedProducts: [0] })
      await wrapper.vm.$nextTick()

      wrapper.vm.removeFavoriteProduct(product)
      expect(wrapper.vm.favoritedProducts).toEqual([])
    })

    it('should getProducts', async () => {
      const wrapper = shallowMount(Wishlist, {
        components,
        store,
        localVue,
        $axios: axios,
      })

      wrapper.vm.getProdutcts()
      await wrapper.vm.$nextTick()

      expect(axios.get).toHaveBeenCalled()
      expect(axios.get).toHaveBeenCalledWith(
        'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'
      )
    })

    it('should getProducts on mounted', async () => {
      const wrapper = shallowMount(Wishlist, {
        components,
        store,
        localVue,
        $axios: axios,
      })

      await wrapper.vm.$nextTick()

      expect(axios.get).toHaveBeenCalled()
      expect(axios.get).toHaveBeenCalledWith(
        'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'
      )
    })
  })
})
