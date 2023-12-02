import { useEffect, useState } from 'react';
import { getAllFood } from '../../logic/food';
import { Food } from '../../logic/interfaces';
import { Bar, Line } from 'react-chartjs-2';
import "chart.js/auto";
import { getReportsByLastDays } from '../../logic/report';

const Dashboard = () => {
    
    const [foodChartData, setFoodChartData] = useState<any>({});
    const [reportChartData, setReportChartData] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllFood();
            const newData = data.map((item: Food) => {
               return item.quantity;
            });
            const categories = data.map((item: Food) => {
                return item.name;
            });

            setFoodChartData({
                labels: categories,
                datasets: [{
                    label: 'Zapasy produktów',
                    data: newData,
                }],
            });

            const reportData = (await getReportsByLastDays(7)).data;

           /* for(report of reportData) {

            } */

            setReportChartData({
                labels: reportData.map((item: any) => {
                    return item.createdAt;
                }),
                datasets: [{
                    label: 'Zgłoszenia',
                    data: reportData.map((item: any) => {
                        return item.count;
                    }),
                }],
            });
        };
        fetchData();
    }, [])

    const foodChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Zestawienie ilości produktów',
          },
        }, 
    };

    const reportChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Ilość raportów przez ostatnie 7 dni',
          },
        }, 
    };
    return <>
        <div className="chart-container">
            { Object.keys(foodChartData).length && 
            <Bar 
                data={foodChartData}
                options={foodChartOptions}
            />         
            }
            { Object.keys(reportChartData).length &&
            <Line 
                data={reportChartData}
                options={reportChartOptions}
            />
            }
        </div>
        </>
};

export default Dashboard;