import Head from "next/head";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CustomConnectButton } from "../components/CustomConnectButton";
import { useAccount } from "wagmi";
import ConnectedComponent from "../components/ConnectedComponent";
import styled from "styled-components";
import { useEffect } from "react";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <Container>
      <Head>
        <title>My Wallet</title>
        <meta name="description" content="My wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        <CustomConnectButton />
        {isConnected && <ConnectedComponent />}
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
