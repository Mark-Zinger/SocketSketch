import { createSlice } from '@reduxjs/toolkit';
import { store } from '../app/store';

const initialState = null;


export const selectSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectElement: (_, action) => (action.payload),
    unSelected: () => null
  }, 
});

export const { setSelectElement, unSelected } = selectSlice.actions;


export const selectSelected = (state) => state.selected;

export const getSelectedBufferElement = () => {
  const id = store.getState().selected;
  return store.getState().bufferElements.find(el => el.id === id);
}

export default selectSlice.reducer;