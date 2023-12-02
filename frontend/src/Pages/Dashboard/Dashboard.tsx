import { useEffect, useState } from 'react';
import { getAllFood } from '../../logic/food';
import { Food } from '../../logic/interfaces';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
    
    const [foodChartOptions, setFoodChartOptions] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllFood();
            const newData = data.map((item: Food) => {
               return item.quantity;
            });
            const categories = data.map((item: Food) => {
                return item.name;
            });

            setFoodChartOptions({
                labels: categories,
                datasets: [{
                    data: newData,
                }],
            });
        };
        fetchData();
    }, [])

    return <>
        <div  className="chart-container">
            <Bar 
                data={foodChartOptions}
            />         
        </div>
        </>
};

export default Dashboard;
