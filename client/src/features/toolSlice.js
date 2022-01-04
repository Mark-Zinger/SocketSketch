import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "brush",
  lineWidth: 2,
  strokeColor: "#B0FF92",
  fillColor: "#D6FF79"
};


export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action) => {
      state.name = action.payload;
    },
    setLineWidth: (state, action) => {
      state.lineWidth = parseInt(action.payload)
    },
    setStrokeColor: (state, action) => {
      state.strokeColor = action.payload;
    },
    setFillColor: (state, action) => {
      state.fillColor = action.payload;
    },
  }, 
});

export const { setTool, setLineWidth, setStrokeColor, setFillColor } = toolSlice.actions;


export const selectTool = (state) => state.tool;


export default toolSlice.reducer;