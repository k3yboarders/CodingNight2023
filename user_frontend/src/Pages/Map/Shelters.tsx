import { Marker } from 'react-leaflet'
import * as React from 'react';
import { backendRequest } from "../../logic/request"
import ShelterIcon from './icons/shelter.svg'

export interface Shelter {
    id: number,
    longitude: number,
    latitude: number,
}

const Shelters = () => {
    const [shelters, setShelters] = React.useState([] as Shelter[]);

    React.useEffect(() => {
        backendRequest('shelter/public', 'GET', true)
        .then(res => {
            if(res.ok) 
                return res.json()
            throw new Error("Request failed")
        })
        .then(json => {setShelters(json) })
    }, []);


    return shelters.length && shelters.map((shelter) => {
        return (
        <Marker position={[shelter.longitude, shelter.latitude]} key={shelter.id} icon={L.icon({iconUrl: ShelterIcon, iconSize: [60, 60]})}></Marker>
        )
    });

}

export default Shelters;