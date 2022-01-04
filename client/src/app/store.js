import { configureStore } from '@reduxjs/toolkit';

import DrawingSlice from '../features/drawingSlice';
import ToolReducer from '../features/toolSlice';
import ElementsSlice from '../features/elementsSlice';



export const store = configureStore({
  reducer: {
    drawing: DrawingSlice,
    tool: ToolReducer,
    elements: ElementsSlice
  },
  
});
