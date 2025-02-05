import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { VStack, Button, Heading } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RichTextEditor: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useAuth();
    const user = authContext ? authContext.user : null;
    const [editorContent, setEditorContent] = useState("");

    // Load user data from localStorage on mount
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userForm") || "{}");
        if (userData && userData.name) {
            const formattedData = `
                <h2>User Profile</h2>
                <strong>Name:</strong> ${userData.name} <br/>
                <strong>Email:</strong> ${userData.email} <br/>
                <strong>Phone:</strong> ${userData.phone || "N/A"} <br/>
                <strong>Address:</strong> ${userData.address || "N/A"} <br/>
            `;
            setEditorContent(formattedData);
        }
    }, []);

    // Handle content change
    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    // Save edited content
    const handleSave = () => {
        localStorage.setItem("editorContent", editorContent);
        toaster.create({
            title: "Content Saved!",
            type: "success",
        });
    };

    return (
        <>
            {user ? (
                <VStack gap={5} p={5} width="80%">
                    <Heading>Rich Text Editor</Heading>
                    <ReactQuill value={editorContent} onChange={handleEditorChange} />
                    <Button colorScheme="blue" onClick={handleSave}>
                        Save Content
                    </Button>
                </VStack>
            ) : navigate('/')
            }
        </>
    );
};

export default RichTextEditor;