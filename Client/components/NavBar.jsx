import { Flex, Text, Box } from "@chakra-ui/react";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import { useState, useEffect, useContext } from "react";
import { ConnectButton } from "web3uikit";
//import { Context } from '../context/contextProvider';
import Logo from "../assets/logo.svg";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
//import { getCurrentWalletConnected } from "./interact";
import Link from "next/link";

export default function Navigation({ color = "white" }) {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis();
  const [topOfPage, setTopOfPage] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [status, setStatus] = useState("");
  //const { setCurrentAccount, currentAccount } = useContext(Context);

  const NavBarItem = ({ title, classprops }) => (
    <Link href={`/${title.toLowerCase()}`}>
      <li
        onClick={() => setToggleMenu(false)}
        className={`mx-4 cursor-pointer font-bold ${classprops}`}
      >
        {title}
      </li>
    </Link>
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        setTopOfPage(false);
      } else {
        setTopOfPage(true);
      }
    });
  }, []);

  const TextColor = topOfPage ? "text-[#337EFE]" : "text-white";

  return (
    <Box
      position="fixed"
      zIndex={999}
      top="0"
      left="0"
      w="full"
      display="flex"
      transitionDuration="300ms"
      bg={
        topOfPage
          ? "transparent"
          : color === "blue-glassmorphism"
          ? "rgba(255, 255, 255, 0.43);"
          : "rgba(4, 12, 30, 0.53)"
      }
      backdropFilter={!topOfPage ? "blur(7px)" : ""}
      borderBottom={!topOfPage ? "1px" : "1px"}
      borderColor={
        !topOfPage
          ? color === "white"
            ? "blackAlpha.100"
            : "whiteAlpha.200"
          : "transparent"
      }
      justifyContent="center"
    >
      <Flex
        justify="space-between"
        w="full"
        alignItems="center"
        p="4"
        className={TextColor}
      >
        <Link href="/" passHref>
          <Flex
            alignItems="center"
            className={TextColor}
            experimental_spaceX="3"
            cursor="pointer"
          >
            <Image height={50} width={50} src={Logo} alt="fundme" />
            <Flex
              fontSize="2xl"
              color={color == "#337EFE" ? "blackAlpha.900" : "white"}
              alignItems="center"
              className="text-white"
            >
              <Text
                fontFamily="heading"
                className={TextColor}
                fontWeight="extrabold"
              >
                Fund{" "}
              </Text>
              <Text
                ml="0.5"
                className={TextColor}
                fontFamily="body"
                fontWeight="medium"
                mb="1"
              >
                me
              </Text>
            </Flex>
          </Flex>
        </Link>
        <ul className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {["New", "Dashboard"].map((item, index) => (
            <NavBarItem key={item + index} title={item} />
          ))}
          <li>
            <ConnectButton />
          </li>
        </ul>
        <div className="flex relative md:hidden">
          {!toggleMenu && (
            <FiMenu
              fontSize={28}
              className=" md:hidden TextColor cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <AiOutlineClose
              fontSize={28}
              className=" md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          )}
          {toggleMenu && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] list-height h-[100%] shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              {["New", "Dashboard"].map((item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classprops="my-2 text-white text-lg"
                />
              ))}
              <li>{!user && <ConnectButton />}</li>
            </ul>
          )}
        </div>
      </Flex>
    </Box>
  );
}
