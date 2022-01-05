import React, {useCallback, useRef, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import rough from 'roughjs/bundled/rough.esm';
import Paper from '@mui/material/Paper';
import tools from '../ToolBar/tools';
import './canvas.css';

import { setDrawing } from '../../features/drawingSlice';

import getPoint from '../../helpers/getPoint';
import throttle from '../../helpers/throttle';
import roughElements from '../../app/roughElements';

import { getSelectedBufferElement } from '../../features/selectedSlice';
import { removeBufferElementById } from '../../features/bufferElementsSlice';
import { addElement } from '../../features/elementsSlice';
import { unSelected } from '../../features/selectedSlice';


const toolsActions = {};
tools.main.forEach(({name,actions}) => toolsActions[name] = actions)


export default function Canvas () {

    const [canvasArea, setCanvasArea] = useState({ height: 800, width: 1600});

    const containerRef = useRef();
    const bufferCanvasRef = useRef();
    const canvasRef = useRef();

    useEffect(()=> {
        if(containerRef.current) {
            const resizeHandler = throttle(() => {
                setCanvasArea({
                    height: containerRef.current.clientHeight,
                    width: containerRef.current.clientWidth
                    
                })
            }, 1000);
            resizeHandler();
            window.addEventListener('resize', resizeHandler)
        }
    },[])


    const dispatch = useDispatch();
    const {drawing, tool, elements, bufferElements} = useSelector(state => state);

    
    // MAIN CANVAS RENDERER
    useEffect(()=> {
        requestAnimationFrame(() => {
            const canvas = canvasRef.current
            console.log('test')
            
            const ctx = canvasRef.current.getContext('2d');
            const rc = rough.canvas(canvas);

            ctx.clearRect(0, 0,canvas.width, canvas.height);
            elements.forEach(({id}) => rc.draw(roughElements.get(id)));
        })
    },[elements,canvasArea])

    // BUFFER CANVAS RENDERER
    useEffect(()=> {
        requestAnimationFrame(() => {
            const canvas = bufferCanvasRef.current
            
            const ctx = canvas.getContext('2d');
            const rc = rough.canvas(canvas);

            ctx.clearRect(0, 0,canvas.width, canvas.height);
            bufferElements.forEach(({id}) => rc.draw(roughElements.get(id)));

        })
        
    },[bufferElements,canvasArea])

    // HANDLERS
    const handleMouseDown = useCallback((event) => {
        dispatch(setDrawing(true));
        const point = getPoint(event);
        toolsActions[tool.name].handleMouseDown(point, tool);
    },[tool]);

    const handleMouseMove = useCallback((event) => {
        if(drawing) {
            const point = getPoint(event)
            toolsActions[tool.name].handleMouseMove(point, tool);
        }
    },[tool, drawing]);

    const handleMouseUp = () => {
        const element = getSelectedBufferElement();
        if(element) {
            dispatch(unSelected());
            dispatch(addElement(element));
            dispatch(removeBufferElementById(element.id));
            dispatch(setDrawing(false));
        }
    };

    return (
        <Paper 
            elevation={0} 
            className='canvas-container'
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseUp}
        >
            <canvas 
                height={canvasArea.height} 
                width={canvasArea.width} 
                ref={canvasRef}
            ></canvas>
            <canvas 
                height={canvasArea.height} 
                width={canvasArea.width} 
                ref={bufferCanvasRef}
            ></canvas>
            
        </Paper>
    )
}