import { createSlice } from '@reduxjs/toolkit';

const initialState = [];


export const bufferElementsSlice = createSlice({
  name: 'bufferElements',
  initialState,
  reducers: {
    addBufferElement: (state, action) => ([ ...state, action.payload ]),
    changeBufferElementById: (state, action) => {
      const newElement = action.payload;
      return state.map((el) => el.id === newElement.id ? newElement : el );
    },
    removeBufferElementById: (state, action) => {
      const id = action.payload;
      return state.filter(el => el.id !== id);
    }
  }, 
});

export const { addBufferElement, changeBufferElementById, removeBufferElementById } = bufferElementsSlice.actions;


export const selectBufferElements = (state) => state.bufferElements;


export default bufferElementsSlice.reducer;