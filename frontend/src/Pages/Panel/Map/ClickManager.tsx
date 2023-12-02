import * as React from 'react';
import { Marker, useMap } from 'react-leaflet';
import CreateTaskModal from '../../../Components/ModalComponents/Create/CreateMapItemModal';

interface Point {
    x: number,
    y: number
}

const ClickManager = (props: {onChange: ()=>void}) => {
    const map = useMap();
    const [position, setPosition]= React.useState<Point|undefined>(undefined)
    const [show, setShow] = React.useState(false)
    map.on('click', (event) => {
        setPosition({x: event.latlng.lat, y: event.latlng.lng});
        setShow(true);
    })
    return <>
       {position && <Marker position={[position.x, position.y]}></Marker>}
      {show && position && <CreateTaskModal open={true} handleClose={()=>{setShow(false); setPosition(undefined); props.onChange()}} lat={position.x} lng={position.y}/>}
        </>
}

export default ClickManager;