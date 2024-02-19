import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../utils/queries.js";
import Auth from "../../utils/auth.js";



const Messages = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    pollInterval: 3000,
  });
  console.log(data);

  const [conversations, setConversations] = useState([])
  const username = Auth.getProfile().data.username;
  console.log("conversations", conversations);

  useEffect(() => {
    if (data) {
      const mergeConversations = (messages) => {
        const conversations = [];

        messages.forEach(({ senderUsername, receiverUsername, ...message }) => {
          // Determine the conversation key by sorting sender and receiver usernames alphabetically
          const conversationKey = [receiverUsername, senderUsername ]
            .sort()
            .join("-");
    
          // Initialize an array for the conversation if it doesn't exist
          if (!conversations[conversationKey]) {
            conversations[conversationKey] = [];
          }

          // Add the message to the conversation array
          conversations[conversationKey].push({ receiverUsername, senderUsername, ...message });
        });

        return conversations;
      };

      const mergedConversations = mergeConversations(data.getUserMessages);
      setConversations(mergedConversations)
      console.log(mergedConversations);

  
    }
  }, [data]);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <div>
      <h2>{username[0].toUpperCase() + username.substring(1)}, here are your conversations:</h2>
      <br/>
      {Object.entries(conversations).map(([conversationKey, messages]) => {
        const [sender, receiver] = conversationKey.split("-");

        const otherUser = sender === username ? receiver : sender;

        return (
          <div key={conversationKey}>
            {console.log("object entries", conversations[conversationKey])}

            <h2>{otherUser}</h2>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>
                  <p>Sender: {message.senderUsername}</p>
                  <p>Receiver: {message.receiverUsername}</p>
                  <p>Message: {message.text}</p>
                  <p>Sent on: {message.createdAt}</p>
                  <br />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;