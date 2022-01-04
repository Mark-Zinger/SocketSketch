import Brush from './Brush';
import Rectangle from './Rectangle';
import Circle from './Circle';
import Line from './Line';
import Eraser from './Eraser';
import BorderColor from './StrokeColor';
import FillColor from './FillColor';


export default {
    main:[
        Brush,
        Rectangle,
        Circle,
        Line,
        Eraser
    ],
    color: [
        { name: "borderColor", component: <BorderColor/> },
        { name: "fillColor", component: <FillColor/> }
    ]
}