import * as React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet'
import CreateTaskModal from '../../../Components/ModalComponents/Create/CreateTaskModal';

interface Point {
    x: number,
    y: number
}

const ClickManager = () => {
    const map = useMap();
    const [position, setPosition]= React.useState<Point|undefined>(undefined)
    const [show, setShow] = React.useState(false)

    map.on('click', (event) => {
        setPosition({x: event.latlng.lat, y: event.latlng.lng})
        setShow(true)
    })
    return <>
       {position && <Marker position={[position.x, position.y]}></Marker>}
      {show && position && <CreateTaskModal open={true} handleClose={()=>{setShow(false)}} lat={position.x} lng={position.y}/>}
        </>
}

export default ClickManager;