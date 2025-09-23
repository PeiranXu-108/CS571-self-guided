import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';
import useStorage from '../hooks/useStorage';

function TextApp({ persona }) {

    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);
    // Track streaming state
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingMessageId, setStreamingMessageId] = useState(null);

    const [messages, setMessages] = useStorage("conversationHistory", [])
    const inputRef = useRef();
    const eventSourceRef = useRef(null);

    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome() {
        if (messages.length === 0) {
            addMessage(Constants.Roles.Assistant, "Welcome!");
        }
    }

    /**
     * Called whenever the "Send" button is pressed.
     * @param {Event} e default form event; used to prevent from reloading the page.
     */
    async function handleSend(e) {
        e?.preventDefault();
        const input = inputRef.current.value?.trim();
        
        if (!input) return;
        
        // Clean up any existing event source
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }
        
        setIsLoading(true);
        setIsStreaming(true);
        
        // Add user message
        addMessage(Constants.Roles.User, input);
        inputRef.current.value = "";

        // Add empty assistant message for streaming
        const messageId = Date.now();
        setStreamingMessageId(messageId);
        addMessage(Constants.Roles.Assistant, "");

        try {
            // Create conversation history for API
            const conversationHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await fetch("https://api.deepseek.com/chat/completions", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                method: "POST",
                body: JSON.stringify({
                    "model": "deepseek-chat",
                    "messages": [
                        { role: "system", content: persona.prompt },
                        ...conversationHistory,
                        { role: "user", content: input }
                    ],
                    "max_tokens": 1200,
                    "temperature": persona.temp
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const reply = data?.choices[0]?.message?.content ?? "No reply from the model.";
            
            // Simulate streaming by displaying the response character by character
            await simulateStreaming(messageId, reply);
            
        } catch (error) {
            console.error('API error:', error);
            updateStreamingMessage(messageId, "Error: Failed to get response from the model.");
            setIsStreaming(false);
            setStreamingMessageId(null);
        }
        
        setIsLoading(false);
    }

    /**
     * Adds a message to the ongoing TextAppMessageList
     * 
     * @param {string} role The role of the message; either "user", "assistant", or "developer"
     * @param {*} content The content of the message
     * @param {number} messageId Optional message ID for streaming updates
     */
    function addMessage(role, content, messageId = null) {
        setMessages(o => [...o, {
            role: role,
            content: content,
            id: messageId || Date.now()
        }]);
    }

    /**
     * Updates a streaming message with new content
     * 
     * @param {number} messageId The ID of the message to update
     * @param {string} newContent The new content to append
     */
    function updateStreamingMessage(messageId, newContent) {
        setMessages(o => o.map(msg => 
            msg.id === messageId 
                ? { ...msg, content: msg.content + newContent }
                : msg
        ));
    }

    /**
     * Simulates streaming by displaying text word by word
     * 
     * @param {number} messageId The ID of the message to update
     * @param {string} fullText The complete text to display
     */
    async function simulateStreaming(messageId, fullText) {
        const words = fullText.split(' ');
        
        // Clear the initial empty message
        setMessages(o => o.map(msg => 
            msg.id === messageId 
                ? { ...msg, content: '' }
                : msg
        ));
        
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const space = i > 0 ? ' ' : '';
            
            updateStreamingMessage(messageId, space + word);
            
            // Add a small delay to simulate streaming
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        setIsStreaming(false);
        setStreamingMessageId(null);
    }

    useEffect(() => {
        if (messages.length === 0) {
            addMessage(Constants.Roles.Assistant, persona.initialMessage);
            addMessage(Constants.Roles.Developer, `System Prompt: ${persona.prompt}`)
        }

    }, [persona]);

    // Cleanup event source on component unmount
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    return (
        <div className="app">
            <TextAppMessageList messages={messages} />

            {(isLoading || isStreaming) && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress size={24} />
                    {isStreaming && (
                        <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', color: '#666' }}>Streaming...</span>
                        </Box>
                    )}
                </Box>
            )}

            <Box
                component="form"
                onSubmit={handleSend}
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
                className="input-area"
            >
                <TextField
                    fullWidth
                    inputRef={inputRef}
                    placeholder="Type a message..."
                    variant="outlined"
                    disabled={isLoading || isStreaming}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading || isStreaming}
                >
                    {isStreaming ? "Streaming..." : "Send"}
                </Button>
            </Box>
        </div>
    );
}

export default TextApp;
