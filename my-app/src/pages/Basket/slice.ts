import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: BasketItem[];
  count: number;
}

const initialState: CartState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
    count: JSON.parse(localStorage.getItem("cartCount") || "0"),
  };

  const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<BasketItem>) => {
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (existingItemIndex === -1) {
          state.cartItems.push({ ...action.payload, quantity: 1 });
          state.count++;
        } else {
          state.cartItems[existingItemIndex].quantity++;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("cartCount", JSON.stringify(state.count));
      },
      removeItem: (state, action: PayloadAction<number>) => {
        const indexToRemove = state.cartItems.findIndex(
          (item) => item.id === action.payload
        );
        if (indexToRemove !== -1) {
          state.cartItems.splice(indexToRemove, 1);
          state.count--;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("cartCount", JSON.stringify(state.count));
      },
      updateQuantity: (
        state,
        action: PayloadAction<{ id: number; quantity: number }>
      ) => {
        const { id, quantity } = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === id);
        if (existingItem) {
          if (quantity <= 0) {
            const indexToRemove = state.cartItems.findIndex(
              (item) => item.id === id
            );
            if (indexToRemove !== -1) {
              state.cartItems.splice(indexToRemove, 1);
              state.count--;
            }
          } else {
            existingItem.quantity = quantity;
          }
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("cartCount", JSON.stringify(state.count));
      },
      incrementQuantity: (state, action: PayloadAction<number>) => {
        const existingItem = state.cartItems.find(
          (item) => item.id === action.payload
        );
        if (existingItem) {
          existingItem.quantity++;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      },
      decrementQuantity: (state, action: PayloadAction<number>) => {
        const existingItem = state.cartItems.find(
          (item) => item.id === action.payload
        );
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          const indexToRemove = state.cartItems.findIndex(
            (item) => item.id === action.payload
          );
          if (indexToRemove !== -1) {
            state.cartItems.splice(indexToRemove, 1);
            state.count--;
          }
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("cartCount", JSON.stringify(state.count));
      },
      clearCart: (state) => {
        state.cartItems = [];
        state.count = 0;
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartCount");
      },
    },
  });
  
  export const {
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = basketSlice.actions;
  
  export default basketSlice.reducer;