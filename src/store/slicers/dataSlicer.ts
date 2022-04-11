import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dataItemForCreateType, dataItemType} from '../../types';
import {data} from './dataForSliser';

const initialState = {
	data, ids: data.map(el => el.id)
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		addNews: (state: {data: dataItemType[], ids: number[]}, action: PayloadAction<dataItemForCreateType>) => {
      let id = -1;
      for (let i = 1; i < state.ids.length; i++) {
        if (state.ids[i] - state.ids[i-1] > 1) {
          id = state.ids[i-1] + 1;
        }
      }
      if (id === -1) {
        id = state.ids[state.ids.length - 1] + 1
      }
      state.data.push({id, isSubmited: false, ...action.payload})
      state.ids.push(id)
      state.ids = state.ids.sort((a, b) => a - b);
    },
    makeSubmited: (state: {data: dataItemType[], ids: number[]}, action: PayloadAction<number>) => {
      state.data.forEach((el) => {
        if(el.id === action.payload)
        {
          el.isSubmited = true;
        }
      })
    },
    deleteNews: (state: {data: dataItemType[], ids: number[]}, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((el) => el !== action.payload)
      state.data = state.data.filter((el) => el.id !== action.payload)
    }
	}
})

export const {addNews, makeSubmited, deleteNews} = dataSlice.actions
export default dataSlice.reducer