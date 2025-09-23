import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 你可以选择一个喜欢的主题，例如 `atomDark`, `tomorrow`, `oneDark`, 等
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Message = (props) => {
    return (
        <div
            className={props.role + "-message"}
            style={{ width: "fit-content", maxWidth: "80%", display: "inline-block" }}
        >
            <ReactMarkdown
                children={props.content}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            />
        </div>
    );
};

export default Message;
