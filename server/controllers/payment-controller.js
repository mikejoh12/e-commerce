const { cartsService, ordersService } = require('../services')
const { fetchCartById } = cartsService
const { calculateOrderAmount } = ordersService
const stripe = require("stripe")(process.env.STRIPE_KEY)

const createPaymentIntent = async (req, res, next) => {
    const userId = req.user.id //Extract user id from passport user object
    // Create a PaymentIntent with the order amount and currency
    const amount = await calculateOrderAmount(userId)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd"
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    })
}

module.exports = {
    createPaymentIntent
}