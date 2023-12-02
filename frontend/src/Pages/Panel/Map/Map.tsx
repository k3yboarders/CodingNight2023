import { Box } from '@mui/material';
import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

const style = {
    width: "100vw",
    height: "100vh",
}

const Map = () => {
    return (
        <Box sx={style}>
            <MapContainer center={[49.84, 24.03]} zoom={13} style={{ height: '100vh' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[49.84, 24.03]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </Box>
    )
}

export default Map;