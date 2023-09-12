import React from "react";

interface IMessage {
  text: string;
}

export default function Message({ text }: IMessage) {
  return (
    <div className="px-2">
      <p>{text}</p>
    </div>
  );
}
