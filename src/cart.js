// import React, { useReducer } from 'react';

// const initialState = {
//   cartItems: [
//     { id: 1, product: 'Apple', price: 100, quantity: 0 },
//     { id: 2, product: 'Orage', price: 100, quantity: 0 },
//     { id: 3, product: 'Chocolate', price: 100, quantity: 0 },
//     { id: 4, product: 'Fresh Juice', price: 100, quantity: 0 },
//   ],
//   totalAmount: 0,
// };

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_QUANTITY':
//       return {
//         ...state,
//         cartItems: state.cartItems.map((item) => {
//           if (item.id === action.id) {
//             return { ...item, quantity: action.quantity };
//           }
//           return item;
//         }),
//       };
//     case 'CALCULATE_TOTAL_AMOUNT':
//       return {
//         ...state,
//         totalAmount: state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
//       };
//     default:
//       return state;
//   }
// };

// export default function Cart() {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   const handleQuantityChange = (id, quantity) => {
//     dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
//     dispatch({ type: 'CALCULATE_TOTAL_AMOUNT' });
//   };

//   const handleIncrement = (id) => {
//     dispatch({ type: 'UPDATE_QUANTITY', id, quantity: state.cartItems.find((item) => item.id === id).quantity + 1 });
//     dispatch({ type: 'CALCULATE_TOTAL_AMOUNT' });
//   };

//   const handleDecrement = (id) => {
//     const itemToUpdate = state.cartItems.find((item) => item.id === id);
//     if (itemToUpdate.quantity > 0) {
//       dispatch({ type: 'UPDATE_QUANTITY', id, quantity: itemToUpdate.quantity - 1 });
//       dispatch({ type: 'CALCULATE_TOTAL_AMOUNT' });
//     }
//   };

//   return (
//     <div className='section'>
//       <div className='container'>
//         <h2>Cart</h2>
//         <div className='row'>
//           <div className='col-md-6'>
//             <h2>Products</h2>
//             <div className="table-responsive">
//               <table className="table table-striped">
//                 <tr>
//                   <th>S.no</th>
//                   <th>Product</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Amount</th>
//                 </tr>
//                 {state.cartItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.id}</td>
//                     <td>{item.product}</td>
//                     <td>${item.price}</td>
//                     <td>
//                       <input
//                         type="number"
//                         value={item.quantity}
//                         onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
//                       />
//                     </td>
//                     <td>${item.price * item.quantity}</td>
//                   </tr>
//                 ))}
//               </table>
//             </div>
//           </div>
//           <div className='col-md-6 billing-section'>
//             <h3>Billing Details</h3>
//             <table>
//               <tr>
//                 <th>S.no</th>
//                 <th>Product</th>
//                 <th>Subtotal</th>
//                 <th>Actions</th>
//               </tr>
//               {state.cartItems.filter((item) => item.quantity > 0).map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{item.product} x {item.quantity}</td>
//                   <td>${item.price * item.quantity}</td>
//                   <td>
//                     <button onClick={() => handleIncrement(item.id)}>+</button>
//                     <button onClick={() => handleDecrement(item.id)}>-</button>
//                   </td>
//                 </tr>
//               ))}
              
//                 <h5>Total Amount: <span>${state.totalAmount}</span></h5>
                
            
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useReducer } from 'react';
import { initialState, reducer } from './Reducer';
import './App.css';

const ShoppingCart = ({ products }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  return (
    <div id="total">
      <h2 id='pro'>SHOPPING CART</h2>
     
      <h2 >PRODUCTS</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img id='img1' src={product.image}></img>
            {product.name} - RS.{product.price}
            <button onClick={() => addItemToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <ul>
        <h1>Add to Cart</h1>
        {state.cart.map(item => (
          <li key={item.id}>
            {item.name} - Rs.{item.price} x {item.quantity}
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3 id='bill'>Total: Rs.{state.cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
    </div>
  );
};

export default ShoppingCart;