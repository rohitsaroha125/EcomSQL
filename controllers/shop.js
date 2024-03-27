const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const product = await Product.findByPk(prodId);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    const cart = await user.getCart();
    const cartItems = await cart.getProducts();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartItems,
    });
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const user = await User.findByPk(1);
    const cart = await user.getCart();

    const findProducts = await cart.getProducts({ where: { id: prodId } });

    if (findProducts.length > 0) {
      const newQty = findProducts[0].cartItem.qty + 1;
      const addProduct = cart.addProduct(findProducts[0], {
        through: { qty: newQty },
      });
    } else {
      const product = await Product.findByPk(prodId);
      const addProduct = await cart.addProduct(product, {
        through: { qty: 1 },
      });
      console.log("added product is ", addProduct);
    }

    res.redirect("/cart");
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const user = await User.findByPk(1);
    const cart = await user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });
    if (products.length > 0) {
      const product = products[0];
      product.cartItem.destroy();
      res.redirect("/cart");
    }
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
