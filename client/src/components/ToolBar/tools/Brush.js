import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import BrushIcon from '@material-ui/icons/Brush';

import rough from 'roughjs/bundled/rough.esm';
import { store } from '../../../app/store';
import { addElement, changeLastElement } from '../../../features/elementsSlice';
import { v4 } from 'uuid';
import roughElements from '../../../app/roughElements';
import throttle from '../../../helpers/throttle'
import bzCurve from '../../../helpers/bzCurve';
import { curveToBezier } from 'points-on-curve/lib/curve-to-bezier.js';


export function Brush () {
    return (
        <Tooltip title="Brush" placement="right">
            <BrushIcon />
        </Tooltip>
    )
}

const generator = rough.generator();

const createBrush = (args) => {
    const {points} = args;
    const path = bzCurve(points);
    
    const roughElement = generator.path(path, {
        roughness: 0.5, strokeWidth: 1.3,  
    });
    return [{ id: null, shape: 'brush', args }, roughElement];
}

const actions = {
    handleMouseDown: ([x1, y1]) => {
        const [brush,roughElement] = createBrush({points: [[x1, y1]]});
        brush.id = v4();
        roughElements.set(brush.id, roughElement)
        store.dispatch(addElement(brush));
    },
    handleMouseMove: throttle(([x2, y2]) => {
        const {id, args} = store.getState().elements.at(-1);
        
        const [brush,roughElement] = createBrush({
            ...args, 
            points: [...args.points, [x2, y2]]
        });
        roughElements.set(id, roughElement);
        store.dispatch(changeLastElement({...brush, id}));
    },30)
}

export default { name: 'brush', component: <Brush/>, actions, create: createBrush};