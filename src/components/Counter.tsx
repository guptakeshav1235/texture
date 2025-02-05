import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        // Load counter history from localStorage
        const storedCounts = JSON.parse(localStorage.getItem("countHistory") || "[]");
        if (storedCounts.length > 0) {
            setCount(storedCounts[storedCounts.length - 1]); // Load last count
        }
    }, []);

    useEffect(() => {
        // Save counter history to localStorage
        const storedCounts = JSON.parse(localStorage.getItem("countHistory") || "[]");
        storedCounts.push(count);
        localStorage.setItem("countHistory", JSON.stringify(storedCounts));
    }, [count]);

    return (
        <VStack gap={5} p={5}>
            <Text fontSize="2xl">Counter: {count}</Text>
            <Button colorScheme="green" onClick={() => setCount(count + 1)}>
                Increment
            </Button>
            <Button colorScheme="red" onClick={() => setCount(count - 1)}>
                Decrement
            </Button>
            <Button colorScheme="gray" onClick={() => setCount(0)}>
                Reset
            </Button>
        </VStack>
    );
};

export default Counter;