const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: { type: Sequelize.STRING, allowNull: false },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?w=2000&t=st=1711512819~exp=1711513419~hmac=cee8f5a21746c75485ef5b5c019d9ceb03b576f6ccf08745d844efb5fd566caa",
  },
  description: {
    type: Sequelize.TEXT("long"),
    allowNull: false,
  },
});

module.exports = Product;
