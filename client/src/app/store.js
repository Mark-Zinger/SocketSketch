import { configureStore } from '@reduxjs/toolkit';

import DrawingSlice from '../features/drawingSlice';
import ToolReducer from '../features/toolSlice';
import ElementsSlice from '../features/elementsSlice';
import BufferElementsSlice from '../features/bufferElementsSlice';
import SelectedSlice from '../features/selectedSlice';



export const store = configureStore({
  reducer: {
    drawing: DrawingSlice,
    selected: SelectedSlice,
    tool: ToolReducer,
    elements: ElementsSlice,
    bufferElements: BufferElementsSlice,
  },
  
});
