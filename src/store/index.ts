import {combineReducers, configureStore} from "@reduxjs/toolkit";
import dataReducer from "./slicers/dataSlicer";
import usersReducer from "./slicers/usersSlicer";


const rootReducer = combineReducers({
	dataReducer,
  usersReducer
})

export const setupStore = () => {
    return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']