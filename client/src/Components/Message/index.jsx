import React from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../utils/queries.js";
import Auth from "../../utils/auth.js";

const Messages = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { userId: Auth.getProfile().data._id },
    // pollInterval: 10000,
  });
  console.log(data);

  useEffect(() => {
    if (data) {
      const mergeConversations = (messages) => {
        const conversations = {};

        messages.forEach(({ senderUsername, receiverUsername, ...message }) => {
          // Determine the conversation key by sorting sender and receiver usernames alphabetically
          const conversationKey = [senderUsername, receiverUsername]
            .sort()
            .join("-");
          console.log(conversationKey);
          // Initialize an array for the conversation if it doesn't exist
          if (!conversations[conversationKey]) {
            conversations[conversationKey] = [];
          }

          // Add the message to the conversation array
          conversations[conversationKey].push({ senderUsername, ...message });
        });

        return conversations;
      };

      const mergedConversations = mergeConversations(data.getUserMessages);
      console.log(mergedConversations);
    }
  }, [data]);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <div>
      {/* <h2>Message</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Messages;