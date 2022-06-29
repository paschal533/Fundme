import Link from "next/link";
import { Box, Flex, AspectRatio } from "@chakra-ui/react";

const About = () => {
  return (
    <div className="w-full justify-center text-center">
      <div className="md:px-20 pb-0 pt-10 px-3 ">
        <div className="about">
          <div className="md:w-[250px] w-[100vw] md:mb-0 mb-4">
            <p className="text-[#337EFE] mb-3 text-2xl font-medium">Help</p>
            <h1 className="text-3xl font-bold">
              Your help will be very useful to us
            </h1>
          </div>
          <div className="w-[40vw]" />
          <div className="md:w-[500px] w-[100vw]">
            <p className="text-[#337EFE] mb-3 text-2xl font-medium">About Us</p>
            <p className="mb-8 text-xl">
              we are a safe, transparent and trusted donation platform with more
              than 10+ years of experience. We have helped people around the
              world to live safely and in place.
            </p>

            <div className="md:mb-0">
              <button className="bg-[#337EFE] h-12 md:mt-0 md:w-[200px] w-[250px] rounded-full text-[#fff]">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="justify-center text-center">
          <Box
            fontSize={{ base: "6xl", md: "6xl", lg: "7xl", xl: "8xl" }}
            mt="10"
            textAlign="center"
            fontWeight="black"
            display="flex"
            justifyContent="center"
            experimental_spaceX={{ md: "7" }}
            experimental_spaceY={{ base: "-7", md: "0" }}
            flexDir={{ base: "column", md: "row" }}
          >
            <Flex
              position="relative"
              w="full"
              maxW="1300px"
              h="fit-content"
              justify="center"
              className="gradient-box"
              mt="14"
              rounded="2xl"
            >
              <AspectRatio
                ratio={16 / 9}
                position="relative"
                w="full"
                rounded="xl"
                overflow="hidden"
              >
                <div
                  style={{
                    paddingBottom: "56.25%",
                    height: "0",
                  }}
                >
                  <iframe
                    src="https://www.loom.com/embed/2ccfdb9ded9c43a98c9b22f3e0925f6d"
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    }}
                  ></iframe>
                </div>
              </AspectRatio>
            </Flex>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default About;
