import { useActor } from '@xstate/react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { createConnection } from '../../hooks/useEvaluatorState'
import { useReconnect } from '../../hooks/useReconnect'
import { WebsocketContext } from '../../providers/WebSocketProvider'
import { ServerMessage } from '../../types'

const Invite: NextPage = () => {
  const { connection, sendMsg } = useContext(WebsocketContext);
  const router = useRouter();
  const code = router.query.code as string;
  useReconnect({ code, sendMsg, isEvaluator: true });
  useEffect(() => {
    const sub = connection!.subscribe((msg) => {
        console.log(msg);
      const message = msg as ServerMessage;
      if (message.message === 'GAME_START') {
        router.push(`/chat/${code}`);
      }
    });

    return () => sub.unsubscribe();
  }, [router, code, connection]);

  return (
    <div>
      <Head>
        <title>Turing Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Invite
      <div>{`localhost:3000/join/${code}`}</div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Invite), { ssr: false });
