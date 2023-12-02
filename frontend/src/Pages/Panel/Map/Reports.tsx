import { Marker, Popup } from 'react-leaflet'
import * as React from 'react';
import { backendRequest } from '../../../logic/request';
import ReportIcon from './icons/exlamation.svg'
import { DangerType } from './DangerType';

export interface Report {
    id: number,
    longitude: number,
    latitude: number,
    createdAt: Date,
    text: string,
    isCompleted: boolean,
    type: DangerType
    ambulance?: {
        driver: {
            firstName: string,
            lastName: string,
        }
    }
}

const Shelters = () => {
    const [reports, setReports] = React.useState([] as Report[]);

    React.useEffect(() => {
        backendRequest('report', 'GET', true)
        .then(res => {
            if(res.ok) 
                return res.json()
            throw new Error("Request failed")
        })
        .then(json => {setReports(json.data);})
    }, []);


    return reports.length && reports.map((report) => {
        return (
        <Marker position={[report.longitude, report.latitude]} key={report.id} icon={L.icon({iconUrl: ReportIcon, iconSize: [60, 60]})}>
            <Popup>
                Czy ukończono: {report.isCompleted ? 'Tak' : 'Nie'}<br/>
                Treść: {report.text}<br/>
                Imię kierowcy zmierzającego tutaj: {report.ambulance?.driver.firstName} {report.ambulance?.driver.lastName}
            </Popup>
        </Marker>
        )
    });

}

export default Shelters;