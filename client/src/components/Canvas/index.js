import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import rough from 'roughjs/bundled/rough.esm';
import Paper from '@mui/material/Paper';
import tools from '../ToolBar/tools';
import './canvas.css';


import { setDrawing } from '../../features/drawingSlice';

import getPoint from '../../helpers/getPoint';
import roughElements from '../../app/roughElements';



const toolsActions = {};
tools.main.forEach(({name,actions}) => toolsActions[name] = actions)


export default function Canvas () {

    const dispatch = useDispatch();
    const {drawing, tool, elements} = useSelector(state => state);

    const canvasRef = useRef();

    useEffect(()=> {

        const canvas = canvasRef.current
        const ctx = canvasRef.current.getContext('2d');
        const rc = rough.canvas(canvas);

        ctx.clearRect(0, 0,canvas.width, canvas.height);
        elements.forEach(({id}) => rc.draw(roughElements.get(id)));
    
    },[elements])
 
    const handleMouseDown = (event) => {
        dispatch(setDrawing(true));
        toolsActions[tool.name].handleMouseDown(getPoint(event));
    };

    const handleMouseMove = (event) => {
        if(drawing) toolsActions[tool.name].handleMouseMove(getPoint(event));
    };

    const handleMouseUp = () => {
        dispatch(setDrawing(false));
    };

    return (
        <Paper elevation={0} className='canvas'>
            <canvas 
                height={800} 
                width={1600} 
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
        </Paper>
    )
}