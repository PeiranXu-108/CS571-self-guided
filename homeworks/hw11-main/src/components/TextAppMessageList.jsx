import { useEffect, useRef } from "react";
import { Container, Box } from "@mui/material";
import Message from "./Message";
import Constants from "../constants/Constants";

export default function TextAppMessageList({ messages }) {
  const lastItem = useRef();

  useEffect(() => {
    lastItem.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container className="message-list" disableGutters sx={{ mt: 1 }}>
      {messages.map((message, i) => (
        message.role !== Constants.Roles.Developer && (
          <Box
            ref={i === messages.length - 1 ? lastItem : null}
            key={i}
            sx={{ mb: 0.5 }}
          >
            <Message role={message.role} content={message.content} />
          </Box>
        )
      ))}
    </Container>
  );
}
