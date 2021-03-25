const { fetchCartsDb, fetchCartByIdDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb } = require('../db')

const fetchCarts = async () => {
    return await fetchCartsDb()
}

const fetchCartById = async (userId) => {
    const cartContentsDB = await fetchCartByIdDb(userId)
    //Store product details separately from quantity in the cart array
    const cartContents = cartContentsDB.map(cartObj => ({
        product: {
          id: cartObj.id,
          name: cartObj.name,
          price: cartObj.price,
          description: cartObj.description,
          image_url: cartObj.image_url,
          status: cartObj.status
        },
        quantity: cartObj.quantity
      })
    )
    return cartContents
}

const createCart = async (userId) => {
    return await createCartDb(userId)
}

const createProductInCart = async(cartProduct) => {
    return await createProductInCartDb(cartProduct)
}

const modifyCart = async (updateCartProduct) => {
    return await modifyCartDb(updateCartProduct)
}

const removeCartProduct = async (cartProduct) => {
    return await removeCartProductDb(cartProduct)
}

const removeCart = async (userId) => {
    return await removeCartDb(userId)
}

module.exports = {
  fetchCarts, fetchCartById, createCart, createProductInCart, modifyCart, removeCartProduct, removeCart
}