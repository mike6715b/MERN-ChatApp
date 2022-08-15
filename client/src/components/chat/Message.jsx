import React from "react";
import RemoteMessage from "components/chat/message/RemoteMessage";
import LocalMessage from "components/chat/message/LocalMessage";

const Message = ({ isRemote, content }) => {
  //   return <div>Message</div>;
  if (isRemote === "true") {
    return <RemoteMessage content={content} />;
  } else {
    return <LocalMessage content={content} />;
  }
};

export default Message;
