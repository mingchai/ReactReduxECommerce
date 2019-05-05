import React from "react";
import "./App.css";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [] };
    this.handleChangeSort = this.handleChangeSort.bind(this);
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
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }

  listProducts() {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) => (
          // use a callback function to determine sorting criteria
          (state.sort === "lowest")
          // did the user select the option with value of 'lowest' (i.e. sort from lowest to highest)? If not, then they've decided to sort from highes to lowest
            ? (a.price > b.price
              // if element 'a' has a higher price, 'b' comes first, else 'a' comes first
              // if both have the same price, leave the order unchanged
              ? 1
              : -1)
            : (a.price < b.price
              // similar logic as above, if element 'b' has a higher price, it gets indexed to a higher position than element 'a'
            ? 1
            : -1)
        )
        )} else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      return { filteredProducts: state.products };
    });
  }

  render() {
    return (
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
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

export default App;
