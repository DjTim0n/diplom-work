import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer, { authSlice } from "./reducers/authSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "./storage";
import { PersistConfig as PersistConfigType } from "redux-persist/lib/types";

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
});

const SECRET_KEY = process.env.SECRET_KEY ?? "my-super-secret-key-v2";

const transforms = [
  encryptTransform({
    secretKey: SECRET_KEY,
    onError: function (error) {
      console.error("🚀 ~ encryptTransform ~ error:", error);
      // Handle the error.
    },
  }),
];

const persistConfig: PersistConfigType<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
  transforms,
  whitelist: ["auth"],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
