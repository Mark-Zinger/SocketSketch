import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import SvgIcon from '@material-ui/core/SvgIcon';

import rough from 'roughjs/bundled/rough.esm';
import { store } from '../../../app/store';
import { addBufferElement, changeBufferElementById } from '../../../features/bufferElementsSlice';
import { setSelectElement, getSelectedBufferElement } from '../../../features/selectedSlice';
import { v4 } from 'uuid';
import roughElements from '../../../app/roughElements';

import throttle from '../../../helpers/throttle'
import bzCurve from '../../../helpers/bzCurve';
import pickOptions from '../../../helpers/pickOptions';

export function Eraser () {
    return (
        <Tooltip title="Eraser" placement="right">
            <SvgIcon viewBox="0 0 16 16">  
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
            </SvgIcon>
        </Tooltip>
    )
}

const generator = rough.generator();
const optionList = []

const createEraser = (args, id) => {
    const {points, options} = args;
    const path = bzCurve(points);
    
    const roughElement = generator.path(path, {
        roughness: 0.5, strokeWidth: 8, ...options, stroke: "#ffffff"
    });
    return [{ id, shape: 'eraser', args }, roughElement];
}


const actions = {
    handleMouseDown: ([x1, y1], tool) => {
        const options = pickOptions(...optionList)(tool);
        const [element,roughElement] = createEraser({points: [[x1, y1]], options}, v4());

        roughElements.set(element.id, roughElement)
        store.dispatch(setSelectElement(element.id))
        store.dispatch(addBufferElement(element));
    },
    handleMouseMove: throttle(([x2, y2]) => {
        if(!getSelectedBufferElement()) return;
        const {id, args} = getSelectedBufferElement();
        
        const [element,roughElement] = createEraser(
            {
                ...args, 
                points: [...args.points, [x2, y2]],
            }, id
        );

        roughElements.set(id, roughElement);
        store.dispatch(changeBufferElementById(element));
    },30)
}

export default { name: 'eraser', component: <Eraser/>, actions, create: createEraser };
