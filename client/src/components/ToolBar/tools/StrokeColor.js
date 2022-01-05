import BorderColorIcon from '@material-ui/icons/BorderColor';
import React, {useEffect, useRef, useContext} from 'react'
import rough from 'roughjs/bundled/rough.esm';
import Tooltip from '@mui/material/Tooltip';

import { useSelector, useDispatch } from 'react-redux';
import { setStrokeColor, selectTool } from '../../../features/toolSlice';

import useThrottle from '../../../hooks/useThrottle'

export default function StrokeColor () {

    const iconRef = useRef();
    
    const color = useSelector(selectTool).stroke;
    const dispatch = useDispatch();

    const onChangeHandler =  useThrottle((e) => {
        dispatch(setStrokeColor(e.target.value))
    })


    useEffect(()=>{
        iconRef.current.children[1].setAttribute('fill-opacity', "1")
    })

    useEffect(() => {
        iconRef.current.children[1].style.fill = color
    }, [color])

    return (
        
        <>
            <input type="color" style={{height:0,width:0,visibility: 'hidden'}} onChange={onChangeHandler}/>
            <Tooltip title="Stroke Color" placement="right">
                <BorderColorIcon ref={iconRef}/> 
            </Tooltip>
        </>
        
    )
}

