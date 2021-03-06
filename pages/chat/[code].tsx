import { Chat } from "../../components/chat";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const ChatPage: NextPage = () => {
  const router = useRouter();
  const { endTime } = router.query;
  return <Chat isEvaluator endTime={Number(endTime)} />;
};

export default ChatPage;
