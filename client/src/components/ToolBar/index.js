import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import BrushIcon from '@material-ui/icons/Brush';
import Divider from '@material-ui/core/Divider';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';

import { SketchPicker,ChromePicker } from 'react-color';
import { Circle } from 'react-color/lib/components/circle/Circle';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '45%',
    left: '10px',
    transform: 'translateY(-50%);',
    display: 'flex',
    boxShadow: '12px 0px 25px 4px rgba(34, 60, 80, 0.05)',
    // borderRadius: '22px'
  }
}));

export default function GroupOrientation() {
  const classes = useStyles();

  const [view, setView] = React.useState('brush');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <div className={classes.root}>
      <ToggleButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        color="secondary"
        onChange={handleChange}
      >
        
            
        <ToggleButton value="brush">
        <Tooltip title="Brush" placement="right">
            <BrushIcon />
        </Tooltip>

        </ToggleButton>
        <ToggleButton value="rectangle">
            <CheckBoxOutlineBlankIcon />
        </ToggleButton>
        <ToggleButton value="circle">
            <RadioButtonUncheckedIcon />
        </ToggleButton>
        <ToggleButton value="line">
            <ShowChartIcon />
        </ToggleButton>
        <ToggleButton value="eraser">
            <SvgIcon viewBox="0 0 16 16">  
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
            </SvgIcon>
        </ToggleButton>
        <Divider light />

        <ToggleButton component="label">
          
            <BorderColorIcon />
            <input type="color" style={{height:0,width:0,visibility: 'hidden'}}/>
        </ToggleButton>

        <ToggleButton>
          <FormatColorFillIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
