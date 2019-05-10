import React from "react";
import "./App.css";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import {Provider} from "react-redux";
import store from './store';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      cart: [],
      cartItems: []
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentWillMount() {
    fetch("http://localhost:9000/products")
      .then(res => res.json())
      .then(data =>
        this.setState({
          products: data,
          filteredProducts: data
        })
      );

    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
      // returns an object corresponding to the given JSON text
    }
  }

  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProducts();
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }

  listProducts() {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((productA, productB) =>
          // use a callback function to determine sorting criteria
          state.sort === "lowest"
            ? // did the user select the option with value of 'lowest' (i.e. sort from lowest to highest)? If not, then they've decided to sort from highes to lowest
              productA.price > productB.price
              ? // if element 'productA' has a higher price, 'productB' comes first, else 'productA' comes first
                // if both have the same price, leave the order unchanged
                1
              : -1
            : productA.price < productB.price
            ? // similar logic as above, if element 'productB' has a higher price, it gets indexed to a higher position than element 'productA'
              1
            : -1
        );
      } else {
        state.products.sort((productA, productB) =>
          productA.id > productB.id ? 1 : -1
        );
      }

      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            product =>
              product.availableSizes.indexOf(state.size.toUpperCase()) >= 0
            // show the products that are available in the size specified (from the dropdown menu) as chosen by the user
          )
        };
      }
      return { filteredProducts: state.products };
    });
  }

  handleAddToCart(e, product) {
    this.setState(state => {
      const cartItems = state.cartItems;
      let isProductInCart = false;

      cartItems.forEach(item => {
        if (item.id === product.id) {
          item.count += 1;
          isProductInCart = true;
          // If the same product is clicked, let's increment its quantity in the cart
        }
      });

      if (!isProductInCart) {
        cartItems.push({ ...product, count: 1 });
        console.log(`${product.title} added to cart`);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // convert cartItems to JSON strings to store in localStorage
      return { cartItems: cartItems };
    });
  }

  handleRemoveFromCart(e, item) {
    this.setState(state => {
      const cartItems = state.cartItems.filter(
        itemToBeRemoved => itemToBeRemoved.id !== item.id
      );
      localStorage.setItem("cartItem", cartItems);
      return { cartItems };
      // return cartItems as an object because the initial object is an array and setState() is expecting an object
    });
  }

  render() {
    return (
      <Provider>
        <div className="container">
          <h1>eCommerce Sample App</h1>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <Filter
                size={this.state.size}
                sort={this.state.sort}
                handleChangeSize={this.handleChangeSize}
                handleChangeSort={this.handleChangeSort}
                count={this.state.filteredProducts.length}
              />
              <hr />
              <Products
                products={this.state.filteredProducts}
                handleAddToCart={this.handleAddToCart}
              />
            </div>
            <div className="col-md-4">
              <Cart
                cartItems={this.state.cartItems}
                handleRemoveFromCart={this.handleRemoveFromCart}
              />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
