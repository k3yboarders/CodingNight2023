import { Box } from '@mui/material';
import { MapContainer, TileLayer, } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import ClickManager from './ClickManager';

interface Props {
    updatePosition: (lat: number, lng: number) => void;
}
const Map = ({updatePosition}: Props) => {
    
    return (
        <Box sx={{height: {xs: '500px', lg: '800px'}, width: '100vw', display: 'flex', justifyContent: 'center'}}>
            <MapContainer center={[49.84, 24.03]} zoom={13} style={{height: '100%', width: '80%', zIndex: 1}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ClickManager updatePosition={updatePosition} />
            </MapContainer>
        </Box>
    )
}

export default Map;