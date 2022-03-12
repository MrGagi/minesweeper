import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import boardReducer from "../board/BoardSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    boardReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
