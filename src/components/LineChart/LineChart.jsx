import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getRevenueByMonth } from '../../apis/revenue'; // Adjust the path to match your structure
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRevenueByMonth();
            console.log("Full Response: ", response);
            if (response) {
                console.log("API Response: ", response.data); // Log response to check structure

                const weeks = response.weeks.map((week) => week.week);
                const totalRevenue = response.weeks.map((week) => week.totalRevenue * 5 / 100); // Scaled revenue
                const orderCount = response.weeks.map((week) => week.orderCount);

                setChartData({
                    labels: weeks,
                    datasets: [
                        {
                            label: 'Revenue',
                            data: totalRevenue,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 2,
                            yAxisID: 'y-revenue', // Assign to the revenue axis
                        },
                        {
                            label: 'Order',
                            data: orderCount,
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderWidth: 2,
                            yAxisID: 'y-order', // Assign to the order count axis
                        },
                    ],
                });
            } else {
                console.log("Error: Invalid response data");
            }
        };

        fetchData();
    }, []);

    if (!chartData) {
        return <div>Loading chart...</div>;
    }

    return (
        <div className='mt-5 d-flex justify-content-center' style={{ height: '50%', width: '50%' }}>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Weekly Revenue and Order Count',
                        },
                    },
                    scales: {
                        'y-revenue': {
                            type: 'linear',
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Revenue',
                            },
                        },
                        'y-order': {
                            type: 'linear',
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Order',
                            },
                            min: 0, // Ensure the minimum value is 0
                            max: Math.max(...chartData.datasets[1].data) + 5, // Add a buffer above the max order count
                            grid: {
                                drawOnChartArea: false, // Avoid grid lines overlap
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
