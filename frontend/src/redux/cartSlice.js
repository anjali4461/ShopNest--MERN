import { createSlice } from '@reduxjs/toolkit';

const getUserId = () => {
  try {
    const rawUser = localStorage.getItem('userInfo');
    if (!rawUser) return 'guest';
    const user = JSON.parse(rawUser);
    return user?._id || user?.email || 'guest';
  } catch (error) {
    return 'guest';
  }
};

const getCartKey = () => `cartItems_${getUserId()}`;

const getStoredCart = () => {
  try {
    const rawCart = localStorage.getItem(getCartKey());
    if (!rawCart) return [];

    const parsed = JSON.parse(rawCart);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && item.productId)
      .map((item) => ({
        productId: item.productId,
        name: item.name || 'Product',
        price: Number(item.price) || 0,
        imageUrl: item.imageUrl || '',
        qty: Number(item.qty) > 0 ? Number(item.qty) : 1,
      }));
  } catch (error) {
    console.error('Cart storage parse failed:', error);
    return [];
  }
};

const initialState = {
  cartItems: getStoredCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const safeItem = {
        productId: item.productId,
        name: item.name || 'Product',
        price: Number(item.price) || 0,
        imageUrl: item.imageUrl || '',
        qty: Number(item.qty) > 0 ? Number(item.qty) : 1,
      };

      const existItem = state.cartItems.find((x) => x.productId === safeItem.productId);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === existItem.productId ? { ...x, ...safeItem } : x
        );
      } else {
        state.cartItems.push(safeItem);
      }
      localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.productId !== action.payload);
      localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem(getCartKey());
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;