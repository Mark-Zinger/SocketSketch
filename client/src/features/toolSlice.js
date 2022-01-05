import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "brush",
  lineWidth: 2,
  stroke: "#B0FF92",
  fill: "#D6FF79"
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
      state.stroke = action.payload;
    },
    setFillColor: (state, action) => {
      state.fill = action.payload;
    },
  }, 
});

export const { setTool, setLineWidth, setStrokeColor, setFillColor } = toolSlice.actions;


export const selectTool = (state) => state.tool;


export default toolSlice.reducer;