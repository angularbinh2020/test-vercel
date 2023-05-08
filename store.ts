import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import rootReducer from "sites/mogivi/redux";

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<
  void,
  Types.RootState,
  unknown,
  Action<string>
>;
