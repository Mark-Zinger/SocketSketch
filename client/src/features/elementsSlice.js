import { createSlice } from '@reduxjs/toolkit';

const initialState = [];


export const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    addElement: (state, action) => ([ ...state, action.payload ]),
    changeLastElement: (state, action) => {
      const newState = [...state];
      newState[state.length-1] = action.payload;
      return newState;
    }
  }, 
});

export const { addElement, changeLastElement } = elementsSlice.actions;


export const selectElements = (state) => state.elements;


export default elementsSlice.reducer;