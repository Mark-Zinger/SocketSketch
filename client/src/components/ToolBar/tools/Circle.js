import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import rough from 'roughjs/bundled/rough.esm';
import { store } from '../../../app/store';
import { addBufferElement, changeBufferElementById } from '../../../features/bufferElementsSlice';
import { setSelectElement, getSelectedBufferElement } from '../../../features/selectedSlice';
import { v4 } from 'uuid';
import roughElements from '../../../app/roughElements';

import pickOptions from '../../../helpers/pickOptions';


export function Circle () {
    return (
        <Tooltip title="Circle" placement="right">
            <RadioButtonUncheckedIcon />
        </Tooltip>
    )
}

const generator = rough.generator();
const optionList = ["stroke", "fill"];

const createCircle = ({x1,y1,x2,y2, options},id) => {
    const diameter = Math.sqrt( (x1-x2)**2 + (y1-y2)**2 )*2;
    const roughElement = generator.circle(x1,y1,diameter, options);
    return [{ id, shape: 'circle', args: { x1, y1, x2, y2, options} }, roughElement];
}

const actions = {
    handleMouseDown: ([x1, y1], tool) => {
        const options = pickOptions(...optionList)(tool)

        const [element,roughElement] = createCircle({x1, y1, x2:x1, y2:y1, options}, v4());

        roughElements.set(element.id, roughElement)
        store.dispatch(setSelectElement(element.id));
        store.dispatch(addBufferElement(element));
    },
    handleMouseMove: ([x2, y2]) => {
        const {id, args} = getSelectedBufferElement();
        const [element,roughElement] = createCircle({...args, x2, y2}, id);
        roughElements.set(id, roughElement);
        store.dispatch(changeBufferElementById(element));
    }
}

export default { name: 'circle', component: <Circle/>, actions, create: createCircle };
