import { useEffect, useState } from 'react';
import { getAllFood } from '../../logic/food';
import { Food } from '../../logic/interfaces';
import { Bar, Line } from 'react-chartjs-2';
import "chart.js/auto";
import { getReportsByLastDays } from '../../logic/report';
import { Box } from '@mui/material';

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
            const reportMap: any = {};

            for(const report of reportData) {
                const key = new Date(report.createdAt).toLocaleDateString("pl-PL")
                if (!reportMap[key])
                    reportMap[key] = 0;
                reportMap[key]++;
            } 
            console.log(reportMap);

            setReportChartData({
                labels: Object.keys(reportMap),
                datasets: [{
                    label: 'Ilość zgłoszeń w ciągu ostatniego tygodnia',
                    data: Object.values(reportMap),
                    backgroundColor: 'rgba(255, 255, 0, 1)',
                    borderColor: 'rgba(255, 255, 0, 1)',
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
        <Box>
            { Object.keys(foodChartData).length && 
            <Bar 
                data={foodChartData}
                options={foodChartOptions}
            />         
            }
        </Box>
        <Box>
            { Object.keys(reportChartData).length &&
            <Line 
                data={reportChartData}
                options={reportChartOptions}
            />
            }
        </Box>
        </>
};

export default Dashboard;