import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import BrushIcon from '@material-ui/icons/Brush';

import rough from 'roughjs/bundled/rough.esm';
import { store } from '../../../app/store';
import { addBufferElement, changeBufferElementById } from '../../../features/bufferElementsSlice';
import { setSelectElement, getSelectedBufferElement } from '../../../features/selectedSlice';

import { v4 } from 'uuid';
import roughElements from '../../../app/roughElements';

import throttle from '../../../helpers/throttle'
import bzCurve from '../../../helpers/bzCurve';
import pickOptions from '../../../helpers/pickOptions';


export function Brush () {
    return (
        <Tooltip title="Brush" placement="right">
            <BrushIcon />
        </Tooltip>
    )
}

const generator = rough.generator();
const optionList = ["stroke"];

const createBrush = (args,id) => {
    const {points, options} = args;
    const path = bzCurve(points);
    
    const roughElement = generator.path(path, {
        roughness: 0.5, strokeWidth: 1.3, ...options
    });
    
    return [{ id, shape: 'brush', args }, roughElement];
}

const actions = {
    handleMouseDown: ([x1, y1], tool) => {
        const options = pickOptions(...optionList)(tool);
        const [element,roughElement] = createBrush({points: [[x1, y1]], options}, v4());

        roughElements.set(element.id, roughElement)
        store.dispatch(setSelectElement(element.id))
        store.dispatch(addBufferElement(element));
    },
    handleMouseMove: throttle(([x2, y2]) => {
        if(!getSelectedBufferElement()) return;
        const {id, args} = getSelectedBufferElement();
        
        
        const [element,roughElement] = createBrush(
            {
                ...args, 
                points: [...args.points, [x2, y2]],
            }, id
        );

        roughElements.set(id, roughElement);
        store.dispatch(changeBufferElementById(element));
    },30)
}

export default { name: 'brush', component: <Brush/>, actions, create: createBrush};