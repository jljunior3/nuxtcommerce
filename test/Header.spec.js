import { shallowMount, mount } from '@vue/test-utils'
import Header from '@/components/Header'
import HeartIcon from '@/components/HeartIcon'
import PlaceIcon from '@/components/PlaceIcon'
import PhoneIcon from '@/components/PhoneIcon'
import Search from '@/components/Search'

describe('Search', () => {
  let components
  let propsData

  beforeEach(() => {
    components = {
      HeartIcon,
      PlaceIcon,
      PhoneIcon,
      Search,
      NuxtLink: jest.fn(),
    }
    propsData = {
      placeholderSearch: 'Busca',
    }
  })

  describe('[DOM]', () => {
    it('is a Vue instance', () => {
      const wrapper = shallowMount(Header, {
        components,
        propsData,
      })
      expect(wrapper.vm).toBeTruthy()
    })

    it('Should render HeartIcon', () => {
      const wrapper = shallowMount(Header, {
        components,
        propsData,
      })

      expect(wrapper.find('heart-icon-stub')).toBeTruthy()
    })

    it('Should render PlaceIcon', () => {
      const wrapper = shallowMount(Header, {
        components,
        propsData,
      })

      expect(wrapper.find('place-icon-stub')).toBeTruthy()
    })

    it('Should render PhoneIcon', () => {
      const wrapper = shallowMount(Header, {
        components,
        propsData,
      })

      expect(wrapper.find('phone-icon-stub')).toBeTruthy()
    })

    it('Should render search component', () => {
      const wrapper = shallowMount(Header, {
        components,
        propsData,
      })

      expect(wrapper.find('search-stub')).toBeTruthy()
    })
  })

  describe('[METHODS]', () => {
    it('should emit search event when form is submitted', async () => {
      const wrapper = mount(Header, {
        components,
        propsData,
      })

      const term = 'nike'

      await wrapper.find('input[type="search"]').setValue(term)
      await wrapper.find('form').trigger('submit')

      expect(wrapper.emitted().search).toBeTruthy()
      expect(wrapper.emitted().search.length).toBe(1)
      expect(wrapper.emitted().search[0]).toEqual([term])
    })
  })
})
