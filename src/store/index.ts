import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import {
  playersReducer,
  journeyReducer,
} from "./duks";

const rootReducer = combineReducers({
  playersReducer,
  journeyReducer,
});

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  storage,
  key: "root",
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

const persistor = persistStore(store);

export { store, persistor };
