import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">{this.props.count} products found</div>
        <div className="col-md-4">
          <label htmlFor="">
            Order By Price
            <select
              className="form-control"
              value={this.props.price}
              onChange={ (e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}
            >
              <option value="">Select</option>
              <option value="lowest">Lowest to Highest</option>
              <option value="highest">Highest to Lowest</option>
            </select>
          </label>
        </div>

        <div className="col-md-4">
          <label>
            Order by Size
            <select
              className="form-control"
              value={this.props.size}
              onChange={(e) =>
                this.props.filterProducts(this.props.products, e.target.value)
              }
            >
              <option value="">All</option>
              <option value="x">X-Small</option>
              <option value="s">Small</option>
              <option value="m">Medium</option>
              <option value="l">Large</option>
              <option value="xl">X-Large</option>
              <option value="xxl">XX-Large</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  filteredProducts: state.products.filteredItems,
  size: state.products.size,
  sort: state.products.sort
});

export default connect(
  mapStateToProps,
  { filterProducts, sortProducts }
)(Filter);
