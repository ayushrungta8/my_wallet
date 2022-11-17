import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  useSigner,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";

function MyApp({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [
      chain.mainnet,
      chain.polygon,
      chain.optimism,
      chain.arbitrum,
      chain.polygonMumbai,
    ],
    [
      alchemyProvider({
        apiKey: "EAkMvMHVPq32MvnaJzSc5pM9tGZAwUTI",
        stallTimeout: 1_000,
        priority: 0,
      }),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "my_wallet",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={darkTheme()}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
