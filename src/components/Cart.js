import React from "react";
import util from "../util";

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

        {cartItems.length > 0 &&
          <div>
            <ul>
              {cartItems.map(item => 
                
                <li>
                  <b>{item.title}</b> x {item.count}
                  <button className="btn btn-danger" style={{"marginLeft":"5px", "padding":"2px"}}>x</button>
                </li>
              )}
            </ul>
            Total: {util.formatCurrency(cartItems.reduce((a,c) => a + c.price * c.count, 0))}
            {/* 
              cartItems is an array, so we iterate through it and perform the above calculation: 
              [Total] + ([current element's price] * [current element's quantity]) 
              to get the total value of all goods inthe cart
            */}
          </div>
        }
      </div>
    );
  }
}
