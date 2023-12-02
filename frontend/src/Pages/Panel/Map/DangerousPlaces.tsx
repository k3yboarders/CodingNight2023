import { Marker, Popup } from 'react-leaflet'
import * as React from 'react';
import getDangerTypeParams, { DangerType } from './DangerType';
import { backendRequest } from '../../../logic/request';

export interface DangerousPlace {
    id: number,
    longitude: number,
    latitude: number,
    type: string,
    severity: number,
}

const DangerousPlaces = () => {
    const [places, setPlaces] = React.useState([] as DangerousPlace[]);

    React.useEffect(() => {
        backendRequest('dangerous-place?page=1', 'GET', true)
        .then(res => {
            if(res.ok) 
                return res.json()
            throw new Error("Request failed")
        })
        .then(json => {setPlaces(json.data) })
    }, []);


    return places.length && places.map((place) => {
        const params = getDangerTypeParams(place.type);
        return (
        params.icon ? <Marker position={[place.longitude, place.latitude]} key={place.id} icon={params.icon}>
            <Popup>
                {params.name} - poziom zagrożenia: {place.severity}
            </Popup>
        </Marker> : 
        <Marker position={[place.longitude, place.latitude]} key={place.id}></Marker>
        )
    });

}

export default DangerousPlaces;