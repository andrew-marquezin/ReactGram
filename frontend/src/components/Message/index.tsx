import "./Message.css";

function Message({ msg, type }: { msg: string; type: string }) {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
}

export default Message;
