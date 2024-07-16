import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../components/Products/slice";
import categoryReducer from '../components/Category/slice'
import detailReducer from '../pages/Detail/slice';
import basketReducer from '../pages/Basket/slice';
import favoritesReducer from '../pages/Favorites/slice';
import productsCategoryReducer from '../pages/CategoryProducts/slice'
import searchReducer from '../components/Navbar/slice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    category: categoryReducer,
    detail: detailReducer,
    basket: basketReducer,
    favorites: favoritesReducer,
    productsCategory: productsCategoryReducer,
    search: searchReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
