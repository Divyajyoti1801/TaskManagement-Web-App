import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

//PERSIST REDUCER CONFIGURATION
const persistedReducer = persistReducer(persistConfig, rootReducer);

//CONFIGURE REDUX STORE
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, REGISTER, PERSIST, PAUSE, PURGE],
      },
    }),
});

//PERSIST STORE SETUP
export const persister = persistStore(store);
