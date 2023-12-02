import { Marker, Popup } from 'react-leaflet'
import * as React from 'react';
import { backendRequest } from '../../../logic/request';
import AmbulanceIcon from './icons/ambulance.svg'
import UnvailableAmbulanceIcon from './icons/unavailable-ambulance.svg'
import { Ambulance } from '../../../logic/interfaces';


const Ambulances = () => {
    const [ambulances, setAmbulances] = React.useState([] as Ambulance[]);

    React.useEffect(() => {
        backendRequest('ambulance', 'GET', true)
        .then(res => {
            if(res.ok) 
                return res.json()
            throw new Error("Request failed")
        })
        .then(json => { setAmbulances(json.data) })
    }, []);


    return ambulances.length && ambulances.map((ambulance) => {
        return (
        <Marker position={[ambulance.longitude, ambulance.latitude]} key={ambulance.id} icon={L.icon({iconUrl: ambulance.isAvailable ? AmbulanceIcon : UnvailableAmbulanceIcon, iconSize: [60, 60]})}>
            <Popup>
                {ambulance.driver?.firstName} {ambulance.driver?.lastName} - {ambulance.isAvailable? 'Dostępny' : 'Niedostępny'}
            </Popup>
        </Marker>
        )
    });

}

export default Ambulances;