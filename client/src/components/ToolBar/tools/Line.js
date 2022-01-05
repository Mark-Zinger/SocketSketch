import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import rough from 'roughjs/bundled/rough.esm';
import { store } from '../../../app/store';
import { addBufferElement, changeBufferElementById } from '../../../features/bufferElementsSlice';
import { setSelectElement, getSelectedBufferElement } from '../../../features/selectedSlice';
import { v4 } from 'uuid';
import roughElements from '../../../app/roughElements';

import pickOptions from '../../../helpers/pickOptions';


export function Line () {
    return (
        <Tooltip title="Line" placement="right">
            <ShowChartIcon/>
        </Tooltip>
    )
}

const generator = rough.generator();
const optionList = ["stroke"];

const createLine = (args,id) => {
    const {x1,y1,x2,y2, options} = args;
    const roughElement = generator.line(x1,y1,x2,y2, options);
    return [{ id, shape: 'line', args }, roughElement];
}

const actions = {
    handleMouseDown: ([x1, y1], tool) => {
        const options = pickOptions(...optionList)(tool)

        const [element,roughElement] = createLine({x1, y1, x2:x1, y2:y1, options}, v4());
        
        roughElements.set(element.id, roughElement)
        store.dispatch(setSelectElement(element.id));
        store.dispatch(addBufferElement(element));
    },
    handleMouseMove: ([x2, y2]) => {
        const {id, args} = getSelectedBufferElement();
        const [element,roughElement] = createLine({...args, x2, y2}, id);
        
        roughElements.set(id, roughElement);
        store.dispatch(changeBufferElementById(element));
    }
}

export default { name: 'line', component: <Line/>, actions, create: createLine };
