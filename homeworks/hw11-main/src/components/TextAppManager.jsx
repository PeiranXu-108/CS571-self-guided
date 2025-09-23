import { useState } from "react";
import TextApp from "./TextApp";
import useStorage from "../hooks/useStorage";
import { Container, Tabs, Tab, Box, Typography, MenuItem, Select } from "@mui/material";

export default function TextAppManager() {

    const PERSONAS = [
        {
            name: "Bucky",
            prompt: "You are a helpful assistant named Bucky after the UW-Madison Mascot. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Hello, my name is Bucky. How can I help you?",
            temp: 0.5
        },
        {
            name: "Pirate Pete",
            prompt: "You are a helpful pirate assisting your mateys with their questions. Respond like a pirate would. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Hello, my name is Pete the Pirate. How can I help you?",
            temp: 0.7
        },
        {
            name: "Professor Sage",
            prompt: "You are a wise old professor who answers questions with clarity and depth. Your tone is calm, thoughtful, and slightly academic, but always accessible.",
            initialMessage: "Greetings, I'm Professor Sage. What topic shall we explore together today?",
            temp: 0.3
        },
        {
            name: "Tech Bro Max",
            prompt: "You are an energetic tech startup founder named Max. You answer questions like you're pitching at a hackathon — fast, confident, and full of buzzwords, but still helpful.",
            initialMessage: "Yo! Max here. Ready to disrupt your confusion and innovate your understanding. What’s the question?",
            temp: 0.9
        },
        {
            name: "Detective Dot",
            prompt: "You're a sharp, no-nonsense detective who helps users solve their problems like cases. You talk like you're in a noir mystery, but you always get to the truth.",
            initialMessage: "The name’s Dot. Detective Dot. Got a mystery you need solved? Lay it on me.",
            temp: 1.0
        },
        {
            name: "Zen Master Lin",
            prompt: "You are a calm and philosophical Zen master who provides help through gentle reflection and metaphor. Your responses are peaceful, but insightful.",
            initialMessage: "Welcome, traveler. I am Master Lin. What burden weighs on your mind?",
            temp: 1.5
        },
        {
            name: "Moosh",
            prompt: "You are a helpful programmer who provides useful and good code",
            initialMessage: "Hi, any tech questions? Glad to help!",
            temp: 0.3
        }
    ];


    const [personaName, setPersonaName] = useStorage("selectedPersona", PERSONAS[0].name);
    const [conversationId, setConversationId] = useState(0)

    // 根据当前选中的persona，找到完整的persona对象
    const persona = PERSONAS.find(p => p.name === personaName) ?? PERSONAS[0];

    function handleNewChat() {
        localStorage.removeItem("conversationHistory")
        setConversationId(prev => prev + 1)
    }

    function handleSwitchPersona(selectedPersona) {
        setPersonaName(selectedPersona);
        localStorage.removeItem("conversationHistory")
        setConversationId(prev => prev + 1)
    }

    return (
        <Container sx={{ marginTop: "0.25rem" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Tab 区域（只有一个 "New Chat"） */}
                <Tabs value={0} textColor="primary" indicatorColor="primary">
                    <Tab label="New Chat" onClick={handleNewChat} />
                </Tabs>

                {/* Persona 下拉选择器 */}
                <Select
                    value={personaName}
                    onChange={(e) => handleSwitchPersona(e.target.value)}
                    variant="standard"
                    sx={{ minWidth: 120 }}
                >
                    {PERSONAS.map((p) => (
                        <MenuItem key={p.name} value={p.name}>
                            {p.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* 聊天主体 */}
            <TextApp persona={persona} key={conversationId} />
        </Container>
    );
}