import { sendTransaction } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import React from "react";
import { IoMdArrowRoundForward, IoMdWallet } from "react-icons/io";
import { IoPaperPlane, IoTicket } from "react-icons/io5";

import { RiCollageFill, RiQrScanFill } from "react-icons/ri";
import styled from "styled-components";
import {
  useAccount,
  useBalance,
  useNetwork,
  usePrepareSendTransaction,
  useProvider,
  useSendTransaction,
} from "wagmi";

const ConnectedComponent = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const { config } = usePrepareSendTransaction({
    request: { to: address, value: BigNumber.from("100000000000") },
  });
  const { sendTransaction, isError, isSuccess, data } = useSendTransaction({
    ...config,
    onError: (error) => {
      setShowBalance(false);
      setShowChainId(false);
      setShowLoading(false);
    },
    onSuccess: (transaction) => {
      setShowTransaction(true);
      setShowLoading(false);
    },
  });

  const [balance, setBalance] = React.useState(null);
  const [showChainId, setShowChainId] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(false);
  const [showTransaction, setShowTransaction] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const getChainId = () => {
    setShowLoading(true);
    setShowChainId(true);
    setShowTransaction(false);
    setShowBalance(false);
    setShowLoading(false);
  };
  const getBalance = () => {
    setShowLoading(true);
    provider.getBalance(address).then((balance) => {
      setBalance(ethers.utils.formatEther(balance));
      setShowTransaction(false);
      setShowBalance(true);
      setShowChainId(false);
      setShowLoading(false);
    });
  };
  const makeTransaction = () => {
    setShowLoading(true);
    setShowTransaction(true);
    setShowBalance(false);
    setShowChainId(false);
    sendTransaction?.();
  };
  return (
    <Container>
      <VerticalSpacer></VerticalSpacer>
      <HorizontalSpacer></HorizontalSpacer>
      <ChoiceContainer>
        <PrimaryButtonContainer>
          <VerticalSpacerGradient></VerticalSpacerGradient>
          <PrimaryButton onClick={getChainId}>
            <IoTicket size={20} className="wallet-icon" />
            <p>Get Chain ID</p>
            <IoMdArrowRoundForward size={20} className="arrow-icon" />
          </PrimaryButton>
        </PrimaryButtonContainer>
        <PrimaryButtonContainer>
          <VerticalSpacerGradient></VerticalSpacerGradient>
          <PrimaryButton onClick={getBalance}>
            <RiQrScanFill size={20} className="wallet-icon" />
            <p>Get Balance</p>
            <IoMdArrowRoundForward size={20} className="arrow-icon" />
          </PrimaryButton>
        </PrimaryButtonContainer>
        <PrimaryButtonContainer>
          <VerticalSpacerGradient></VerticalSpacerGradient>
          <PrimaryButton onClick={makeTransaction}>
            <IoPaperPlane size={20} className="wallet-icon" />
            <p>Send Transaction</p>
            <IoMdArrowRoundForward size={20} className="arrow-icon" />
          </PrimaryButton>
        </PrimaryButtonContainer>
      </ChoiceContainer>
      <ResultContainer>
        {/* <img src={"/loader.svg"} alt="" /> */}
        <ResultTitle>
          Output
          {showLoading && <img src={"/loader.svg"} alt="" />}
        </ResultTitle>
        {showChainId && (
          <ResultCard>
            <span>Chain ID</span>
            <p>1</p>
          </ResultCard>
        )}
        {showBalance && (
          <ResultCard>
            <span>Balance</span>
            <p>{balance}</p>
          </ResultCard>
        )}

        {showTransaction && (
          <ResultCard>
            <span>Transaction status</span>
            <p>{isSuccess ? "Success" : "Failed"}</p>
          </ResultCard>
        )}
      </ResultContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VerticalSpacer = styled.div`
  height: 60px;
  width: 1px;
  background: #fff;
`;
const VerticalSpacerGradient = styled.div`
  height: 60px;
  width: 1px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(145, 145, 145, 1) 28%,
    rgba(255, 255, 255, 1) 100%
  );
`;
const HorizontalSpacer = styled.div`
  height: 1px;
  width: 72.5%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(145, 145, 145, 1) 28%,
    rgba(255, 255, 255, 1) 100%
  );
`;
const ChoiceContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
`;
const PrimaryButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PrimaryButton = styled.button`
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(128, 128, 128, 0.407);
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: -0.009em;
  color: #ffffff;
  cursor: pointer;
  .arrow-icon {
    transition: all 0.3s ease-in-out;
    width: 0;
  }
  .wallet-icon {
    transition: all 0.3s ease-in-out;
    width: 26px;
  }
  :hover {
    .wallet-icon {
      width: 0;
    }
    .arrow-icon {
      width: 26px;
    }
  }
  transition: all 0.3s ease-in-out;
`;

const ResultCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;

  width: 800px;
  height: 60px;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  span {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    display: flex;
    align-items: center;
    /* identical to box height, or 26px */

    letter-spacing: -0.009em;

    color: rgba(255, 255, 255, 0.6);
  }
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    letter-spacing: -0.009em;
    color: #fff;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ResultTitle = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 130%;
  /* identical to box height, or 21px */

  letter-spacing: -0.009em;

  color: rgba(255, 255, 255, 0.6);
  img {
    height: 12px;
  }
`;
export default ConnectedComponent;
