import "./styles/boxed-messages.css";

interface BoxedMessagesProps {
  messageType: string;
  children: React.ReactNode;
}

export const BoxedMessages = ({
  messageType,
  children,
}: BoxedMessagesProps) => {
  return (
    <div className="boxedmessages">
      {messageType === "success" && (
        <div className="boxedMessages__displaySuccess">
          <p>{children}</p>
        </div>
      )}
      {messageType === "warn" && (
        <div className="boxedMessages__displayWarning">
          <p>{children}</p>
        </div>
      )}
      {messageType === "error" && (
        <div className="boxedMessages__displayError">
          <p>{children}</p>
        </div>
      )}
    </div>
  );
};
