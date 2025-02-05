import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useAuth } from "../context/AuthProvider";

Chart.register(...registerables);

const Dashboard: React.FC = () => {
    const authContext = useAuth();
    const user = authContext ? authContext.user : null;
    const [countData, setCountData] = useState<number[]>([]);

    useEffect(() => {
        // Simulating a count history for visualization
        const storedCounts = JSON.parse(localStorage.getItem("countHistory") || "[]");
        setCountData(storedCounts);
    }, []);

    const chartData = {
        labels: countData.map((_, index) => `Step ${index + 1}`),
        datasets: [
            {
                label: "Counter Value",
                data: countData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.4,
            },
        ],
    };

    return (
        <VStack gap={5} p={5}>
            <Heading>Dashboard</Heading>

            {user && (
                <Box>
                    <Text fontSize="lg">👤 {user.displayName}</Text>
                    <Text fontSize="md">📧 {user.email}</Text>
                </Box>
            )}

            {countData.length > 0 ? (
                <Box width="80%">
                    <Line data={chartData} />
                </Box>
            ) : (
                <Text>No counter data available</Text>
            )}
        </VStack>
    );
};

export default Dashboard;