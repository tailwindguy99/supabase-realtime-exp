import { useMessageStore } from "../lib/messageStore";

const Message = () => {
  const { channels } = useMessageStore();

  return <div>{ channels.map(channel => <div>{channel.title}</div> ) }</div>;
};

export default Message;
