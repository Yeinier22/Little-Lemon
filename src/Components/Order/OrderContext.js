import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

const OrderContext = createContext();

const STORAGE_KEY = 'll_order_state_v1';

const initialState = { items: [] }; // {id, name, price, qty, image}

function orderReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, name, price, image } = action.payload;
      const existing = state.items.find(i => i.id === id);
      if (existing) {
        return {
          ...state,
            items: state.items.map(i => i.id === id ? { ...i, qty: i.qty + action.payload.qty } : i)
        };
      }
      return { ...state, items: [...state.items, { id, name, price, image, qty: action.payload.qty }] };
    }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      return { ...state, items: state.items.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i) };
    }
    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

function init(initial) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) return parsed;
    }
  } catch (e) {
    // ignore parse errors
  }
  return initial; 
}

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState, init);

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalAmount = state.items.reduce((sum, i) => sum + i.qty * i.price, 0);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* storage might be full or blocked; silently fail */ }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch, totalItems, totalAmount }), [state, totalItems, totalAmount]);
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => useContext(OrderContext);
