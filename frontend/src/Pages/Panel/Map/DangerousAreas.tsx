import { Circle, Popup, } from 'react-leaflet'
import * as React from 'react';
import getDangerTypeParams, { DangerType } from './DangerType';
import { backendRequest } from '../../../logic/request';
import { DangerousPlace } from './DangerousPlaces';

interface DangerousArea extends DangerousPlace {
    radius: number
}

const DangerousAreas = () => {
    const [areas, setAreas] = React.useState([] as DangerousArea[]);

    React.useEffect(() => {
        backendRequest('dangerous-area?page=1', 'GET', true)
        .then(res => {
            if(res.ok) 
                return res.json()
            throw new Error("Request failed")
        })
        .then(json => {setAreas(json.data); console.log(json.data)})
    }, []);


    return areas.map((area) => {
        const params = getDangerTypeParams(area.type);
        return (
           <Circle center={[area.longitude, area.latitude]} pathOptions={{color: params.color}} radius={area.radius} key={area.id}>
            <Popup>
                {params.name} - poziom zagrożenia: {area.severity}
            </Popup>
          </Circle>
        )
    });

}

export default DangerousAreas;