import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import rough from 'roughjs/bundled/rough.esm';
import { store } from '../../../app/store';
import { addElement, changeLastElement } from '../../../features/elementsSlice';
import { v4 } from 'uuid';
import roughElements from '../../../app/roughElements';

export function Circle () {
    return (
        <Tooltip title="Circle" placement="right">
            <RadioButtonUncheckedIcon />
        </Tooltip>
    )
}

const generator = rough.generator();

const createCircle = ({x1,y1,x2,y2}) => {
    const diameter = Math.sqrt( (x1-x2)**2 + (y1-y2)**2 )*2;

    const roughElement = generator.circle(x1,y1,diameter);
    return [{ id: null, shape: 'circle', args: { x1, y1, x2, y2 } }, roughElement];
}

const actions = {
    handleMouseDown: ([x1, y1]) => {
        const [circle,roughElement] = createCircle({x1, y1, x2:x1, y2:y1});
        circle.id = v4();
        roughElements.set(circle.id, roughElement)
        store.dispatch(addElement(circle));
    },
    handleMouseMove: ([x2, y2]) => {
        const {id, args} = store.getState().elements.at(-1);
        const [circle,roughElement] = createCircle({...args, x2, y2});
        roughElements.set(id, roughElement);
        store.dispatch(changeLastElement({...circle, id}));
    }
}

export default { name: 'circle', component: <Circle/>, actions, create: createCircle };
