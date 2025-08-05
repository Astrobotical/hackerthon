import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, Textarea } from "@flyde/editor";
export const NoteEditor = ({ value, onChange, }) => {
    const [content, setContent] = useState(value.content);
    useEffect(() => {
        onChange({ content });
    }, [content, onChange]);
    return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px" } },
        React.createElement(Textarea, { value: content, onChange: (e) => setContent(e.target.value), placeholder: "Enter your note here (A subset of Markdown is supported)", rows: 10, style: { width: "100%", padding: "8px 6px", minHeight: "200px" } }),
        React.createElement(Alert, null,
            React.createElement(AlertDescription, null, "A subset of markdown is supported"))));
};
export default NoteEditor;
