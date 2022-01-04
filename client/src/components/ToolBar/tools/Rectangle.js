import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import rough from 'roughjs/bundled/rough.esm';
import { store } from '../../../app/store';
import { addElement, changeLastElement } from '../../../features/elementsSlice';
import { v4 } from 'uuid';
import roughElements from '../../../app/roughElements';

export function Rectangle () {
    return (
        <Tooltip title="Rectangle" placement="right">
            <CheckBoxOutlineBlankIcon />
        </Tooltip>
    )
}

const generator = rough.generator();

const createRectangle = (args) => {
    const {x1,y1,x2,y2} = args;
    const roughElement = generator.rectangle(x1,y1,x2-x1,y2-y1);
    return [{ id: null, shape: 'rectangle', args }, roughElement];
}

const actions = {
    handleMouseDown: ([x1, y1]) => {
        const [rect,roughElement] = createRectangle({x1, y1, x2:x1, y2:y1});
        rect.id = v4();
        roughElements.set(rect.id, roughElement)
        store.dispatch(addElement(rect));
    },
    handleMouseMove: ([x2, y2]) => {
        const {id, args} = store.getState().elements.at(-1);
        const [rect,roughElement] = createRectangle({...args, x2, y2});
        roughElements.set(id, roughElement);
        store.dispatch(changeLastElement({...rect, id}));
    }
}

export default { name: 'rectangle', component: <Rectangle/>, actions, create: createRectangle };
