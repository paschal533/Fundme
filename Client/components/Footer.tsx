/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Flex, Text, Box, Grid, Divider, Link } from "@chakra-ui/react";
import Image from "next/image";
//import config from "../../utils/helpers/config";
import NextLink from "next/link";
import { TwitterShareButton } from "react-twitter-embed";
import Linode from "../assets/linode.svg";
import Hashnode from "../assets/hashnode.svg";
import Logo from "../assets/logo.svg";

import type { TextLinkProps } from "../types/props";

const TextLink: React.FC<TextLinkProps> = ({ text, href }) => {
  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <Text color="black">{text}</Text>
    </Link>
  );
};

export default function Footer() {
  return (
    <Box
      zIndex={999}
      bottom="0"
      left="0"
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      transitionDuration="300ms"
      //bg="linear-gradient(292.63deg, #00254A -20.23%, #000012 88.04%)"
      justifyContent="center"
    >
      <Flex
        justify="space-between"
        w="full"
        alignItems="center"
        px={{ md: "10", lg: "10" }}
        direction={{ base: "column", md: "row" }}
        py="16"
        maxW="5xl"
      >
        <NextLink href="/" passHref>
          <Flex alignItems="center" experimental_spaceX="6" cursor="pointer">
            <Image height={80} width={80} src={Logo} alt="fundme" />
            <Flex
              fontSize={{ base: "4xl", lg: "6xl" }}
              color="#337EFE"
              alignItems="center"
            >
              <Text fontFamily="heading" fontWeight="extrabold">
                Fund{" "}
              </Text>
              <Text ml="0.5" fontFamily="body" fontWeight="medium" mb="1">
                me
              </Text>
            </Flex>
          </Flex>
        </NextLink>
        <Grid
          mt={{ base: "10", md: "0" }}
          templateColumns={{
            base: "repeat(3,1fr)",
            sm: "repeat(3,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ md: "10", lg: "20" }}
          textAlign="center"
          fontSize="base"
          color="white"
        >
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink text="Contract" href="/" />
            <TwitterShareButton
              url={"https://dfund.netlify.app/"}
              options={{
                text: "Fundme | A Decenterized fund raiser app",
              }}
            />
          </Grid>
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink text="Support" href="mailto:okwuosahpaschal@gmail.com" />
            <TextLink text="Product" href="/" />
          </Grid>
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink text="How to use" href="/" />

            <TextLink href="/about" text="Team" />
          </Grid>
        </Grid>
      </Flex>
      <div className="-mt-8 justify-center text-center md:ml-0 md:mr-0 ml-2 mr-2">
        <h1 className="font-semibold">
          Built for participating in 2022 Linode X Hashnode Hackathon
        </h1>
        <div className="flex justify-center mt-4 mb-4">
          <div>
            <Image
              src={Linode}
              alt="linode"
              height={60}
              width={200}
              objectFit="contain"
            />
          </div>
          <div>
            <Image
              src={Hashnode}
              alt="hashnode"
              height={60}
              width={200}
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </Box>
  );
}
