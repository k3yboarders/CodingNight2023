import * as React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet'

interface Point {
    x: number,
    y: number
}

const ClickManager = () => {
    const map = useMap();
    const [position, setPosition]= React.useState<Point|undefined>(undefined)

    map.on('click', (event) => {
        setPosition({x: event.latlng.lat, y: event.latlng.lng})
    })
    return (
       position && <Marker position={[position.x, position.y]}>
      </Marker>
    )
}

export default ClickManager;