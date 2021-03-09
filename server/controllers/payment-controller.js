const { cartsService } = require('../services')
const { fetchCartById } = cartsService
const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = async ({items, userId}) => {
    // Get price from carts in db and not from items (for now)
    try {
        const cart = await fetchCartById(userId)
        const totalPrice = cart.reduce((acc, item) => 
            acc + parseFloat(item.product.price) * parseInt(item.quantity, 10), 0)
        return totalPrice * 100 //Return price in cents
    } catch (e) {
        console.log(e)
    }
}

const createPaymentIntent = async (req, res, next) => {
    const userId = req.user.id //Extract user id from passport user object
    const { items } = req.body
    // Create a PaymentIntent with the order amount and currency
    try {
        const amount = await calculateOrderAmount({items, userId})
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd"
        })
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

module.exports = {
    createPaymentIntent
}