import React from "react";
import util from "../util";
import {connect} from "react-redux";
import {removeFromCart} from '../actions/cartActions';


class Cart extends React.Component {
  render() {
    const { cartItems } = this.props;

    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          <p>Your Cart is Empty</p>
        ) : (
          <div>You currently have {cartItems.length} items ready to go!</div>
        )}

        {cartItems.length > 0 && (
          <div>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <b>{item.title}</b> x {item.count}
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "5px", padding: "2px" }}
                    onClick={() => {console.log("from cart",this.props.cartItems); this.props.removeFromCart(this.props.cartItems, item)}}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
            Total:{" "}
            {util.formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
            {/* 
              cartItems is an array, so we iterate through it and perform the above calculation: 
              [Total] + ([current element's price] * [current element's quantity]) 
              to get the total value of all goods inthe cart
            */}
            <button
              className="btn btn-danger"
              onClick={() => alert("There's more to be done")}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ products: state.products.filteredItems, cartItems: state.cart.items})
export default connect(mapStateToProps, removeFromCart)(Cart)