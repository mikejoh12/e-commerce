const { check, validationResult } = require('express-validator')

const validateSignUp = [
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    check('first_name').not().isEmpty().isLength({max: 100}),
    check('last_name').not().isEmpty().isLength({max: 100}),
    check('address1').not().isEmpty().isLength({max: 100}),
    check('address2').isLength({max: 100}),
    check('postcode').not().isEmpty().isLength({max: 10}),
    check('city').not().isEmpty().isLength({max: 100}),
    check('country').isLength({max: 100})
    , (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
}]

const validateLogin = [
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100})
    , (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
}]

const validateGetProducts = [
    check('id').not().isEmpty().isInt()
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validatePostProduct = [
    check('name').not().isEmpty().isLength({max: 100}),
    check('price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('category').not().isEmpty().isLength({max: 100}),
    check('image_url').isLength({max: 100}),
    check('status').not().isEmpty().isLength({max: 100})
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validatePutProduct = [
    check('id').not().isEmpty().isInt(),
    check('name').not().isEmpty().isLength({max: 100}),
    check('price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('category').not().isEmpty().isLength({max: 100}),
    check('image_url').isLength({max: 100}),
    check('status').not().isEmpty().isLength({max: 100})
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validateDeleteProduct = [
    check('id').not().isEmpty().isInt()
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validatePutUser = [
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    check('first_name').not().isEmpty().isLength({max: 100}),
    check('last_name').not().isEmpty().isLength({max: 100}),
    check('address1').not().isEmpty().isLength({max: 100}),
    check('address2').isLength({max: 100}),
    check('postcode').not().isEmpty().isLength({max: 10}),
    check('city').not().isEmpty().isLength({max: 100}),
    check('country').isLength({max: 100})
    , (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
}]

const validateDeleteUser = [
    check('id').not().isEmpty().isInt()
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validateCart = [
    check('product_id').not().isEmpty().isInt(),
    check('quantity').not().isEmpty().isInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validateDeleteCartProduct = [
    check('product_id').not().isEmpty().isInt()
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validateOrder = [
    check('orderId').not().isEmpty().isInt()
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

module.exports = {
    validateSignUp,
    validateLogin,
    validateGetProducts,
    validatePostProduct,
    validatePutProduct,
    validatePutUser,
    validateDeleteUser,
    validateDeleteProduct,
    validateCart,
    validateDeleteCartProduct,
    validateOrder
}
