import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../utils/queries.js";

const Messages = () => {
    const { loading, error, data } = useQuery (GET_MESSAGES );
const messages = data?.messages|| []
    if (loading) return <p>Loading..</p>;
    if (error) return <p>Error :</p>;

    return (
        <div>
            <h2>Message</h2>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>{message.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;