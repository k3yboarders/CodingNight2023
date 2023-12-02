import { Box } from '@mui/material';
import { MapContainer, TileLayer, } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import DangerousPlaces from './DangerousPlaces';
import DangerousAreas from './DangerousAreas';
import ClickManager from './ClickManager';

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
                <DangerousPlaces />
                <DangerousAreas />
                <ClickManager/>
            </MapContainer>
        </Box>
    )
}

export default Map;