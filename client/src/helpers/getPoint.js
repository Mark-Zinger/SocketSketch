const getPoint = (e) => {
    return [
        e.pageX - e.target.offsetParent.offsetLeft, 
        e.pageY - e.target.offsetParent.offsetTop
    ]
};

export default getPoint;