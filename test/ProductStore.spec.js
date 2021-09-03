import { mutations } from '@/store/products.js'

describe('setProducts', () => {
  it('should add products to the state', () => {
    const products = [{ id: 1, title: 'Camisa Nike' }]
    const state = {
      products: [],
    }

    mutations.setProducts(state, products)

    expect(state).toEqual({
      products,
    })
  })
})
