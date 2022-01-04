import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import Tools from './tools';
import useStyles from './styles';

import { setTool, selectTool} from '../../features/toolSlice';


export default function GroupOrientation() {
  const classes = useStyles();

  const currentTool = useSelector(selectTool);
  const dispatch = useDispatch();

  const handleChange = (event, nextView) => {
    dispatch(setTool(nextView));
  };

  return (
    <div className={classes.root}>
      <ToggleButtonGroup
        className={classes.group}
        orientation="vertical"
        value={currentTool.name}
        exclusive
        color="secondary"
        onChange={handleChange}
      >
        { 
          Tools.main.map(({name, component}) => 
          (<ToggleButton key={name} value={name}>{component}</ToggleButton>))
        }
      </ToggleButtonGroup>
      <ToggleButtonGroup
        className={classes.group}
        orientation="vertical"
        color="secondary"
      >
        { 
          Tools.color.map(({name, component}) => 
          (<ToggleButton key={name} value={name} component="label">{component}</ToggleButton>))
        }
        </ToggleButtonGroup>
    </div>
  );
}
