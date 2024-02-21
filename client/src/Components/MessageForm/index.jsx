import React from "react";
import './style.css';

function MessageForm({ conversationKey, messages }) {
    return (
        <div key={conversationKey} className="container">
            <h2>{conversationKey}</h2>
            <div className="message-cards-container">
                {messages.map((message, index) => (
                    <div key={index} className="message-card">
                        <p>Sender: {message.sendUsername}</p>
                        <p>Receiver: {message.receiverUsername}</p>
                        <p>Message: {message.text}</p>
                        <p>Sent: {message.createdAt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MessageForm;