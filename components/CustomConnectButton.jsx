import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { IoMdArrowRoundForward, IoMdExit, IoMdWallet } from "react-icons/io";
import styled from "styled-components";
import { useConnect, useDisconnect } from "wagmi";
export const CustomConnectButton = () => {
  const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <PrimaryButton onClick={openConnectModal} type="button">
                    <IoMdWallet size={20} className="wallet-icon" />
                    <p>Connect Wallet</p>
                    <IoMdArrowRoundForward size={20} className="arrow-icon" />
                  </PrimaryButton>
                );
              }
              if (chain.unsupported) {
                return (
                  <PrimaryButton onClick={openChainModal} type="button">
                    Wrong network
                  </PrimaryButton>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <PrimaryButton onClick={disconnect} type="button">
                    <p>{account.displayName}</p>

                    <IoMdExit size={20} />
                  </PrimaryButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

const PrimaryButton = styled.button`
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
