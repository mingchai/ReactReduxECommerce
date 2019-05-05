import React, { Component } from "react";

export class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">{this.props.count} products found</div>
        <div className="col-md-4">
          <label htmlFor="">
            Order By
            <select
              className="form-control"
              value={this.props.sort}
              onChange={this.props.handleChangeSort}
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
              onChange={this.props.handleChangeSize}
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

export default Filter;
