import React from "react";
import { Box, Button, VStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth?.user;
    const login = auth?.login;
    const logout = auth?.logout;

    return (
        <VStack gap={5} p={5}>
            <Heading>Welcome to the App</Heading>

            {user ? (
                <>
                    <Text fontSize="lg">Hello, {user.displayName} 👋</Text>
                    <Button colorScheme="red" onClick={logout}>
                        Logout
                    </Button>
                </>
            ) : (
                <Button colorScheme="blue" onClick={login}>
                    Sign in with Google
                </Button>
            )}

            <Button colorScheme="blue" onClick={() => navigate("/counter")}>
                Go to Counter
            </Button>
            <Button colorScheme="green" onClick={() => navigate("/form")}>
                Fill User Form
            </Button>
            <Button colorScheme="purple" onClick={() => navigate("/editor")}>
                Open Rich Text Editor
            </Button>
            <Button colorScheme="orange" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
            </Button>
        </VStack>
    );
};

export default Home;