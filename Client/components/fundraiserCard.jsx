 import React, { useEffect, useContext, useState } from "react";
import Web3 from "web3";
import FundraiserContract from "../contracts/Fundraiser.json";
import {
  Progress,
  Button,
  Box,
  SkeletonCircle,
  SkeletonText,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";

const cc = require("cryptocompare");

const FundraiserCard = ({ fundraiser }) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://rinkeby.infura.io/v3/${process.env.Private_key}`
    )
  );
  const [fundName, setFundname] = useState(null);
  const [description, setDescription] = useState(null);
  const [totalDonations, setTotalDonations] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [perc, setPerc] = useState(1);
  const [open, setOpen] = useState(false);
  const [url, setURL] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const getAFundraiser = async (fundraiser) => {
    try {
      const fund = fundraiser;
      const instance = new web3.eth.Contract(FundraiserContract.abi, fund);
      ///(instance)

      const name = await instance.methods.name().call();
      const description = await instance.methods.description().call();
      const totalDonations = await instance.methods.totalDonations().call();
      const imageURL = await instance.methods.imageURL().call();
      const url = await instance.methods.url().call();

      const exchangeRate = await cc.price("ETH", ["USD"]);
      //const exchangeRate =  10
      setExchangeRate(exchangeRate.USD);
      const eth = web3.utils.fromWei(totalDonations, "ether");
      const dollarDonationAmount = exchangeRate.USD * eth;

      setTotalDonations(dollarDonationAmount.toFixed(2));
      setPerc((dollarDonationAmount.toFixed(2) / 1000) * 100);
      setFundname(name);
      setDescription(description);
      setImageURL(imageURL);
      setURL(url);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fundraiser) {
      getAFundraiser(fundraiser);
    }
  }, [fundraiser]);

  return (
    <div className="md:ml-4">
      <div className="bg-white p-2 md:mt-4 drop-shadow-lg md:mb-0 md:ml w-full md:w-[250px] rounded-lg mt-3 mb-3 ml-0 mr-0 ">
        {open ? (
          <div>
            {imageURL && (
              <img
                src={imageURL}
                className="md:w-[250px] w-full"
                alt="fundraiser-img"
                objectFit="contain"
              />
            )}
            <h1 className="mt-4 font-bold text-2xl">
              {fundName?.length > 17
                ? `${fundName?.slice(0, 17)}...`
                : fundName}
            </h1>
            <p className="mt-2 w-[240px] pl-1 pr-1">{`${description?.slice(
              0,
              100
            )}...`}</p>
            <div className="mt-4">
              <Progress className="rounded-lg" value={10 + perc} />
              <div className="flex w-full mt-2 justify-between">
                <p className="font-bold text-1xl">Target: $1000</p>
                <p className="font-bold text-1xl">{10 + perc}%</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Link
                className="donation-receipt-link"
                href={{
                  pathname: "/fundraiser",
                  query: { address: fundraiser },
                }}
              >
                <Button colorScheme="blue">Donate now</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        )}
      </div>
    </div>
  );
};

export default FundraiserCard;

