import { cn } from "@/lib/utils";
import React from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}


const Agent = ({ userName }: AgentProps) => {
  const callStatus = CallStatus.ACTIVE;
  const isSpeaking = true;
  const message = [
    'What is Your Name ?',
    'My name is Rohit, nice to meet you!'
  ];
  const lastmessage = message[message.length -1];

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer ">
          <div className="avatar">
            <img src="/ai-avatar.png" alt="ai-vapi" width={65} height={540} />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border flex flex-col sm:flex-row">
          <div className="card-content w-full">
            <img
              src="/user-avatar.png"
              alt="user_avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-30"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {message.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p key = {lastmessage} className={cn('transition-opacity duration-500 opacity-100')}>{lastmessage}</p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== 'ACTIVE' ? (
          <button className=" btn-call">
            <span>
              {callStatus === 'INACTIVE' ||
              callStatus === 'FINISHED'
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End</button>
        )}
      </div>

    </>
  );
};

export default Agent;


