import React from "react";
import { ContextProvider } from "../context/contextProvider";
import { NextSeo } from "next-seo";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";
import { Navbar, Footer } from "../components";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: "Inter",
      colors: {
        brand: {
          blue: "#3198FE",
          cyan: "#00FFF0",
          black: "#101010",
        },
      },
    },
  });

  return (
    <div>
      <NextSeo
        title="Fundme | A Decenterized fund raiser app"
        description="Raiser funds, view your Eth balance, Send Ether to anyone across the world"
        defaultTitle="Fundme | A Decenterized fund raiser app"
        canonical="https://1fundme.vercel.app/"
        openGraph={{
          url: "https://1fundme.vercel.app/",
          title: "Fundme | A Decenterized fund raiser app",
          description:
            "Raiser funds, view your Eth balance, Send Ether to anyone across the world",
          images: [
            {
              url: "/assets/embed.png",
              width: 1280,
              height: 720,
              alt: "Fundme | A Decenterized fund raiser app",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "web3, funds, decentralized, hackathon, data, nfts, game, cloud, moralis, metamask, files, chainIDE, blockchain, on-chain funds, on-chain fundraiser, on-chain, chain, conflux",
          },
        ]}
      />
      <ChakraProvider theme={theme}>
        <MoralisProvider
          appId={process.env.AppId}
          serverUrl={process.env.serverUrl}
        >
          <ContextProvider>
            <Navbar />
            <br />
            <br />
            <br />
            <Component {...pageProps} />
            <Footer />
          </ContextProvider>
        </MoralisProvider>
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
