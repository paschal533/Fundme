import { useRouter } from "next/router";
import Head from "next/head";
import { Context } from "../context/contextProvider";
import { useMoralis } from "react-moralis";
import { Loader } from "../components";
import { ConnectButton } from "web3uikit";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Input,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";

const Fundraiser = () => {
  const { isAuthenticated, account } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState(null);
  const {
    description,
    fundName,
    url,
    donationAmount,
    renderDonationsList,
    imageURL,
    submitFunds,
    setDonationAmount,
    getFundraiserDetails,
    ethAmount,
    Owner,
    withdrawalFunds,
    setNewBeneficiary,
    setBeneficiary,
    beneficiary,
    display,
  } = useContext(Context);
  const { query } = useRouter();

  useEffect(() => {
    const init = () => {
      try {
        query.address && getFundraiserDetails(query.address);
        setAddress(query.address);
      } catch (error) {
        alert(error);
      }
    };
    init();
  }, [query.address]);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <>
      <Head>
        <title>Fundraiser</title>
      </Head>
      <div className="md:flex justify-center item-center">
        {!display ? (
          <div className="md:flex md:pl-10 md:pr-10 pl-5 mt-8 pr-5">
            <div>
              <img
                src={imageURL}
                className="h-[450px] drop-shadow-lg w-[400px] rounded-md"
              />
            </div>
            <div className="md:w-[50vw] md:mt-0 mt-4 w-full md:ml-8 ml-0">
              <h1 className="font-bold text-3xl mb-8">{fundName}</h1>
              <p>{description}</p>
              <div className="mt-4">
                <Button onClick={() => onOpen()} colorScheme="blue">
                  Donate now
                </Button>
                {Owner && (
                  <Button onClick={() => withdrawalFunds()} colorScheme="green">
                    Withdrawal
                  </Button>
                )}
              </div>
              <div className="justify-center w-full mt-4 text-center">
                <h3 className="font-bold mb-2 text-2xl">My donations</h3>
                {!renderDonationsList() ? (
                  renderDonationsList()
                ) : (
                  <p>No donation record found.</p>
                )}
              </div>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Make a donation</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input
                      onChange={(e) => setDonationAmount(e.target.value)}
                      id="Amount"
                      value={donationAmount}
                      type="text"
                      placeholder="Amount in USD"
                    />
                    <p className="ml-2 mt-2">ETH Amount: {ethAmount}</p>
                  </ModalBody>
                  <ModalFooter>
                    {account ? (
                      <Button
                        onClick={submitFunds}
                        colorScheme="blue"
                        className="mr-4"
                      >
                        Donate
                      </Button>
                    ) : (
                      <ConnectButton />
                    )}
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Fundraiser;
