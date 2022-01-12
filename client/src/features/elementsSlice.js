import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import socket from '../app/WebSocket';

const elementsAdapter = createEntityAdapter();
const initialState = elementsAdapter.getInitialState();


export const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    addElement: (state, action) => {
      if(!action.method) socket.sync(action);
        
      elementsAdapter.addOne(state, action.payload)
    },
    updateElementById: elementsAdapter.updateOne
  }
});

export const { addElement, updateElementById } = elementsSlice.actions;

export const elementsSelectors =  elementsAdapter.getSelectors((state) => state.elements);

export const selectElements = (state) => state.elements;


export default elementsSlice.reducer;