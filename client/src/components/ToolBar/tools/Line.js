import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import rough from 'roughjs/bundled/rough.esm';
import { store } from '../../../app/store';
import { addElement, changeLastElement } from '../../../features/elementsSlice';
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

const createLine = (args) => {
    const {x1,y1,x2,y2, options} = args;
    const roughElement = generator.line(x1,y1,x2,y2, options);
    return [{ id: null, shape: 'line', args }, roughElement];
}

const actions = {
    handleMouseDown: ([x1, y1], tool) => {
        const options = pickOptions(...optionList)(tool)

        const [line,roughElement] = createLine({x1, y1, x2:x1, y2:y1, options});
        line.id = v4();
        roughElements.set(line.id, roughElement)
        store.dispatch(addElement(line));
    },
    handleMouseMove: ([x2, y2]) => {
        const {id, args} = store.getState().elements.at(-1);
        const [line,roughElement] = createLine({...args, x2, y2});
        roughElements.set(id, roughElement);
        store.dispatch(changeLastElement({...line, id}));
    }
}

export default { name: 'line', component: <Line/>, actions, create: createLine };
