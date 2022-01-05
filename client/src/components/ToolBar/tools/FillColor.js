import React, { useEffect, useRef} from 'react'
import Tooltip from '@mui/material/Tooltip';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';

import { useSelector, useDispatch } from 'react-redux';
import { setFillColor, selectTool } from '../../../features/toolSlice';

import useThrottle from '../../../hooks/useThrottle'


export default function FillColor () {

    const iconRef = useRef();

    const color = useSelector(selectTool).fill;
    const dispatch = useDispatch();

    const onChangeHandler =  useThrottle((e) => {
        dispatch(setFillColor(e.target.value))
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
            <Tooltip title="Fill Color" placement="right">
                <FormatColorFillIcon ref={iconRef}/>
            </Tooltip>            
        </>

        
    )
}
