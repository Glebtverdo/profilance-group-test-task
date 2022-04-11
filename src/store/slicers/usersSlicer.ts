import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { usersSlicerStateType, userType} from '../../types';
import {users} from './dataForSliser';

const initialState : usersSlicerStateType = {
	users,
  isLoggedIn: false,
  isAdmin: false
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		logIn: (state: usersSlicerStateType, action: PayloadAction<userType>) => {
      state.isLoggedIn = action.payload;
      state.isAdmin = action.payload.isAdmin;
    },
    logOut: (state: usersSlicerStateType, action: PayloadAction<null>) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
    }
	}
})

export const {logIn, logOut} = usersSlice.actions
export default usersSlice.reducer