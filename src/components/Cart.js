import React from "react";

export default class Cart extends React.Component {
  render() {
    const {cartItems} = this.props;

    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          <p>Your Cart is Empty</p>
        ) : (
          <div>You currently have {cartItems.length} items ready to go!</div>
        )}
      </div>
    );
  }
}
