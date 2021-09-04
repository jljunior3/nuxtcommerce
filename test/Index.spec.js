import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import Index from '@/pages/index'
import Card from '@/components/Card'

jest.mock('axios', () => ({
  get: jest.fn(),
}))

describe('Wishlist', () => {
  const components = {
    Card,
    Header: jest.fn(),
    NuxtLink: jest.fn(),
  }

  beforeAll(() => {})

  describe('[DOM]', () => {
    it('should mount the component', () => {
      const wrapper = shallowMount(Index, {
        components,
        mocks: {
          $fetchState: {},
        },
      })

      expect(wrapper.vm).toBeDefined()
    })

    it('should render component Card', async () => {
      const wrapper = shallowMount(Index, {
        components,
        mocks: {
          $fetchState: {},
        },
        data() {
          return {
            searchTerm: '',
            favoritesProducts: [0, 1],
            data: {
              products: [
                {
                  id: 0,
                  title: 'Camisa Nike',
                  image: 'https://via.placeholder.com/300x300',
                  price: 229.9,
                },
              ],
            },
          }
        },
      })

      await wrapper.vm.$nextTick()

      const card = wrapper.findComponent(Card)
      expect(card.exists()).toBe(true)
    })

    it('should not render component Card', async () => {
      const wrapper = shallowMount(Index, {
        components,
        mocks: {
          $fetchState: {},
        },
        data() {
          return {
            data: [],
            searchTerm: '',
            favoritesProducts: [],
          }
        },
      })
      await wrapper.vm.$nextTick()

      const card = wrapper.findComponent(Card)
      expect(card.exists()).toBe(false)
    })
  })

  describe('[METHODOS]', () => {
    it('should set searchTerm when call setSearchTerm()', () => {
      const wrapper = shallowMount(Index, {
        components,
        mocks: {
          $fetchState: {},
        },
        data() {
          return {
            searchTerm: '',
            favoritesProducts: [],
            data: {
              products: [
                {
                  id: 0,
                  title: 'Camisa Nike',
                  image: 'https://via.placeholder.com/300x300',
                  price: 229.9,
                },
              ],
            },
          }
        },
      })
      wrapper.vm.setSearchTerm('nike')
      expect(wrapper.vm.searchTerm).toEqual('nike')
    })

    it('should add product from favorites when call setFavoriteProduct()', async () => {
      const product = {
        id: 1,
        title: 'Camisa Nike',
        image: 'https://via.placeholder.com/300x300',
        price: 229.9,
      }
      const wrapper = shallowMount(Index, {
        components,
        mocks: {
          $fetchState: {},
        },
      })

      await wrapper.vm.$nextTick()
      wrapper.vm.setFavoriteProduct(product)
      expect(wrapper.vm.favoritesProducts).toEqual([1])
    })

    it('should getProducts', async () => {
      const wrapper = shallowMount(Index, {
        components,
        mocks: {
          $fetchState: {},
        },
        data() {
          return {
            searchTerm: '',
            favoritesProducts: [],
            data: {
              products: [
                {
                  id: 0,
                  title: 'Camisa Nike',
                  image: 'https://via.placeholder.com/300x300',
                  price: 229.9,
                },
              ],
            },
          }
        },
      })

      wrapper.vm.getProdutcts()
      await wrapper.vm.$nextTick()

      expect(axios.get).toHaveBeenCalled()
      expect(axios.get).toHaveBeenCalledWith(
        'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'
      )
    })
  })
})
