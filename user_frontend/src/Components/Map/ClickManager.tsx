import * as React from 'react';
import { Marker, useMap } from 'react-leaflet';

interface Point {
    x: number,
    y: number
}
interface Props {
    updatePosition: (lat: number, lng: number) => void;
}
const ClickManager = ({updatePosition}: Props) => {
    const map = useMap();
    const [position, setPosition]= React.useState<Point|undefined>(undefined)

    map.on('click', (event) => {
        setPosition({x: event.latlng.lat, y: event.latlng.lng})
        updatePosition(event.latlng.lat, event.latlng.lng)
    })
    return (
       position && <Marker position={[position.x, position.y]}>
      </Marker>
    )
}

export default ClickManager;