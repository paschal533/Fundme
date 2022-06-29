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
        canonical="https://vault3.live"
        openGraph={{
          url: "http://localhost300",
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
          appId={"PhHzazleoS4huOotpxjGCiBr54pFCFHKCRiZBe4Z"}
          serverUrl={"https://jzo6ate4hkqf.usemoralis.com:2053/server"}
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
