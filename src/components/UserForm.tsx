import React, { useEffect, useState } from "react";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { useNavigate } from "react-router-dom";
import { toaster } from "./ui/toaster";
import { useAuth } from "../context/AuthProvider";

const UserForm: React.FC = () => {
    const authContext = useAuth();
    const user = authContext ? authContext.user : null;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [isDirty, setIsDirty] = useState(false);

    // Generate user ID when the component loads
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            userId: `USER-${Math.floor(1000 + Math.random() * 9000)}`, // Random ID
        }));

        // Load saved data (if any)
        const savedData = JSON.parse(localStorage.getItem("userForm") || "{}");
        if (savedData && savedData.userId) {
            setFormData(savedData);
        }

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = "You have unsaved changes!";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDirty(true);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save form data
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("userForm", JSON.stringify(formData));
        setIsDirty(false);
        toaster.create({
            title: "Data Saved!",
            type: "success",
        });
        setFormData({
            userId: `USER-${Math.floor(1000 + Math.random() * 9000)}`,
            name: "",
            email: "",
            phone: "",
            address: "",
        });
    };

    // Handle navigation warning
    const handleNavigation = (path: string) => {
        if (isDirty && !window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
            return;
        }
        navigate(path);
    };

    return (
        <>
            {user ? (
                <VStack gap={5} p={5} as="form" onSubmit={handleSubmit}>
                    <FormControl isReadOnly>
                        <FormLabel>User ID</FormLabel>
                        <Input value={formData.userId} readOnly />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" value={formData.name} onChange={handleChange} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Phone</FormLabel>
                        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input name="address" value={formData.address} onChange={handleChange} />
                    </FormControl>

                    <Button type="submit">
                        Save Data
                    </Button>
                    <Button onClick={() => handleNavigation("/")}>
                        Cancel
                    </Button>
                </VStack>
            ) : handleNavigation("/")}
        </>
    );
};

export default UserForm;