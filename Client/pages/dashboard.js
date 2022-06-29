import Head from "next/head";
import { useMoralis } from "react-moralis";
//import { useContext } from 'react';
//import { Context } from '../context/contextProvider';
import {
  Box,
  Button,
  Flex,
  TabList,
  Tabs,
  Text,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Profile, Balance, Transactions, NFTs, Send } from "../components";
import { ConnectButton } from "web3uikit";

export default function Home() {
  const { isAuthenticated, user } = useMoralis();

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Dashboard</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          overflowX="hidden"
          bgGradient="linear(to-br, teal.400, purple.700)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
            Dashboard
          </Text>
          <div className="flex ml-[0vw] md:ml-[0vw] justify-center items-center w-full">
            <ConnectButton />
          </div>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Flex
        bgGradient="linear(to-br, teal.400, purple.700)"
        direction="column"
        width="100vw"
        height="100vh"
        overflowX="hidden"
      >
        <Box flex="1" px="44" py="20">
          <Tabs
            size="lg"
            colorScheme="purple"
            align="center"
            variant="enclosed"
          >
            <TabList>
              <Tab _selected={{ color: "white" }} fontWeight="bold">
                Profile
              </Tab>
              <Tab _selected={{ color: "white" }} fontWeight="bold">
                Balance
              </Tab>
              <Tab _selected={{ color: "white" }} fontWeight="bold">
                Transactions
              </Tab>
              <Tab _selected={{ color: "white" }} fontWeight="bold">
                NFTs
              </Tab>
              <Tab _selected={{ color: "white" }} fontWeight="bold">
                Send ETH
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile user={user} />
              </TabPanel>
              <TabPanel>
                <Balance user={user} />
              </TabPanel>
              <TabPanel>
                <Transactions user={user} />
              </TabPanel>
              <TabPanel>
                <NFTs user={user} />
              </TabPanel>
              <TabPanel>
                <Send user={user} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  );
}
