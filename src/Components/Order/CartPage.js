import React from 'react';
import { useOrder } from './OrderContext';
import '../Order/OrderNow.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { state, dispatch, totalAmount, totalItems } = useOrder();
  const navigate = useNavigate();

  const changeQty = (id, delta) => {
    const item = state.items.find(i => i.id === id);
    if (!item) return;
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty: item.qty + delta } });
  };

  const remove = id => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const clear = () => dispatch({ type: 'CLEAR' });

  return (
    <div className="order-now-page cart-page">
      <h1 className="order-title">Your Order</h1>
      {state.items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p>Your cart is empty.</p>
          <button className="add-btn" onClick={() => navigate('/order')}>Browse Dishes</button>
        </div>
      )}
      {state.items.length > 0 && (
        <div className="cart-layout">
          <div className="cart-items">
            {state.items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="thumb">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="info">
                  <h3>{item.name}</h3>
                  <div className="controls">
                    <div className="qty-mini">
                      <button onClick={() => changeQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)}>+</button>
                    </div>
                      <span className="line-price">$ {(item.price * item.qty).toFixed(2)}</span>
                    <button className="remove" onClick={() => remove(item.id)}>×</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Summary</h2>
            <p className="summary-line"><span>Items</span><span>{totalItems}</span></p>
            <p className="summary-line"><span>Subtotal</span><span>$ {totalAmount.toFixed(2)}</span></p>
            <p className="summary-small">(Taxes & fees calculated at checkout)</p>
            <button className="add-btn" style={{ width: '100%' }}>Checkout</button>
            <button className="clear-btn" onClick={clear}>Clear Cart</button>
            <button className="back-btn" onClick={() => navigate('/order')}>Continue Ordering</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
