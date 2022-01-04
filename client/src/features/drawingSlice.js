import { createSlice } from '@reduxjs/toolkit';

const initialState = false;


export const DrawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    setDrawing: (state, action) => (action.payload)
    
  }, 
});

export const { setDrawing } = DrawingSlice.actions;


export const selectDrawing = (state) => state.drawing;


export default DrawingSlice.reducer;