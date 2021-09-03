import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'
import Card from '@/components/Card'
import HeartIcon from '@/components/HeartIcon'

describe('Card', () => {
  let components
  let propsData

  beforeEach(() => {
    components = {
      HeartIcon,
    }
    propsData = {
      item: {
        id: 0,
        title: 'Camisa Nike',
        image: 'https://via.placeholder.com/300x300',
        price: 229.9,
      },
      showBadge: true,
      showRemoveIcon: false,
      favorites: [0],
    }
  })

  describe('[DOM]', () => {
    it('is a Vue instance', () => {
      const wrapper = shallowMount(Card, {
        components,
        propsData,
      })
      expect(wrapper.vm).toBeTruthy()
    })

    it('Should render HeartIcon', () => {
      const wrapper = shallowMount(Card, {
        components,
        propsData,
      })

      expect(wrapper.find('heart-icon-stub')).toBeTruthy()
    })

    it('Should display corrects info', () => {
      const wrapper = shallowMount(Card, {
        components,
        propsData,
      })

      expect(wrapper.text()).toContain('Camisa Nike')
      expect(wrapper.text()).toContain('R$ 229.90')
    })

    it('Should display remove button favorite product', () => {
      const wrapper = shallowMount(Card, {
        components,
        propsData: {
          ...propsData,
          showRemoveIcon: true,
        },
      })

      const button = wrapper.find('[data-testid="remove-favorite-product"]')

      expect(button.exists()).toBe(true)
    })
  })

  describe('[COMPUTED]', () => {
    it('Should return class when call isFavorited', () => {
      const wrapper = shallowMount(Card, {
        components,
        propsData,
      })

      expect(wrapper.vm.isFavorited).toEqual('card__item__badge--icon--red')
    })

    it('Should return empty when call isFavorited', () => {
      const wrapper = shallowMount(Card, {
        components,
        propsData: {
          ...propsData,
          favorites: [1],
        },
      })

      expect(wrapper.vm.isFavorited).toEqual('')
    })
  })

  describe('[METHODS]', () => {
    it('Should emit event when click favorite product', async () => {
      const wrapper = shallowMount(Card, {
        components,
        propsData,
      })

      const item = {
        id: 0,
        title: 'Camisa Nike',
        image: 'https://via.placeholder.com/300x300',
        price: 229.9,
      }

      const button = wrapper.find('[data-testid="set-favorite-product"]')
      await button.trigger('click')

      expect(wrapper.emitted().setFavoriteProduct).toBeTruthy()
      expect(wrapper.emitted().setFavoriteProduct.length).toBe(1)
      expect(wrapper.emitted().setFavoriteProduct[0]).toEqual([item])
    })

    it('Should emit event when click remove favorite product', async () => {
      const wrapper = shallowMount(Card, {
        components,
        propsData: {
          ...propsData,
          showRemoveIcon: true,
        },
      })

      const item = {
        id: 0,
        title: 'Camisa Nike',
        image: 'https://via.placeholder.com/300x300',
        price: 229.9,
      }

      const button = wrapper.find('[data-testid="remove-favorite-product"]')
      await button.trigger('click')

      expect(wrapper.emitted().removeFavoriteProduct).toBeTruthy()
      expect(wrapper.emitted().removeFavoriteProduct.length).toBe(1)
      expect(wrapper.emitted().removeFavoriteProduct[0]).toEqual([item])
    })
  })
})
