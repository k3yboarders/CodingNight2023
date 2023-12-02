import { Marker, Popup } from 'react-leaflet'
import * as React from 'react';
import { backendRequest } from '../../../logic/request';
import { Task } from '../../../logic/interfaces';

const Tasks= () => {
    const [tasks, setTasks] = React.useState([] as Task[]);

    React.useEffect(() => {
        backendRequest('task/all', 'GET', true)
        .then(res => {
            if(res.ok) 
                return res.json()
            throw new Error("Request failed")
        })
        .then(json => {setTasks(json);})
    }, []);


    return tasks.length && tasks.map((report) => {
        return (
        <Marker position={[report.longitude, report.latitude]} key={report.id} >
            <Popup>
                {report.urgency}
                {report.isCompleted}
            </Popup>
        </Marker>
        )
    });

}

export default Tasks;