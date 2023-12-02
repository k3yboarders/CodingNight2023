import { Modal, Box } from "@mui/material";
import { style } from "./modalStyles";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const MapModal = (props: {
    open: boolean;
    handleClose: () => void;
    lang: number;
    lat: number;
}) => {
    console.log(props.lat, props.lang)
    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Box sx={style}>
                <MapContainer center={[props.lat, props.lang]} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[props.lat, props.lang]} />
                </MapContainer>
            </Box>
        </Modal>
    );
};

export default MapModal;