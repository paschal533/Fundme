import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import getWeb3 from "../getweb3";
import Web3 from "web3";
import Link from "next/link";
import FundraiserFactor from "../contracts/FundraiserFactory.json";
import FundraiserContract from "../contracts/Fundraiser.json";
import { useToast, Button } from "@chakra-ui/react";

const cc = require("cryptocompare");

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const { isAuthenticated, account } = useMoralis();
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://rinkeby.infura.io/v3/${process.env.Private_key}`
    )
  );
  const toast = useToast();
  const [acct, setAccount] = useState("");
  const [display, setDisplay] = useState(true);
  const [factoryContract, setFactoryContract] = useState(null);
  const [beneficiary, setNewBeneficiary] = useState("");
  const [loading, setLoading] = useState(true);
  const [funds, setFunds] = useState([]);
  const [open, setOpen] = useState(true);
  const [contract, setContract] = useState(null);
  const [fundName, setFundname] = useState(null);
  const [description, setDescription] = useState(null);
  const [totalDonations, setTotalDonations] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [url, setURL] = useState(null);
  const [donationAmount, setDonationAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [userDonations, setUserDonations] = useState(null);
  const [Owner, setIsOwner] = useState(false);
  const [perc, setPerc] = useState(1);

  const handleError = (error) => {
    toast({
      position: "top-left",
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleNewNotification = () => {
    toast({
      position: "top-left",
      title: "Not Authenticated",
      description: "Please Connect Your Crypto Wallet",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleNewFundraiser = () => {
    toast({
      position: "top-left",
      title: "New Fundraiser",
      description: "Fundraiser Created",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleDonation = () => {
    toast({
      position: "top-left",
      title: "Donation",
      description: `You have successfully donated $ ${donationAmount} USD to the fundraiser`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleNewBeneficiary = () => {
    toast({
      position: "top-left",
      title: "New Beneficiary",
      description: "You have successfully changed the beneficary",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleWithdraw = () => {
    toast({
      position: "top-left",
      title: "Withdraw",
      description: "You have successfully withdrawn your funds",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleNotEnuogh = () => {
    toast({
      position: "top-left",
      title: "Not enuogh fund",
      description: "Sorry you do not have enuogh fund to make this transaction",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        let web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundraiserFactor.networks[networkId];
        const instance = new web3.eth.Contract(
          FundraiserFactor.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);

        const funds = await instance.methods.fundraisers(10, 0).call();
        setFunds(funds);
        setLoading(false);
      } catch (error) {
        handleError(error);
        console.error(error);
      }
    };
    init();
  }, []);

  const getAFundraiser = async (fundraiser) => {
    try {
      const fund = fundraiser;
      const instance = new web3.eth.Contract(FundraiserContract.abi, fund);
      setContract(instance);

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
      handleError(error);
    }
  };

  const getFundraiserDetails = async (fundraiser) => {
    setDisplay(true);
    try {
      const fund = fundraiser;
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          `https://rinkeby.infura.io/v3/${process.env.Private_key}`
        )
      );
      const instance = new web3.eth.Contract(FundraiserContract.abi, fund);
      setFactoryContract(instance);

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
      setFundname(name);
      setDescription(description);
      setImageURL(imageURL);
      setURL(url);
      setDisplay(false);

      if (account) {
        try {
          const userDonations = await instance.methods
            .myDonations()
            .call({ from: account });
          setUserDonations(userDonations);

          const isUser = account;
          const isOwner = await instance.methods.owner().call();

          if (isOwner === account) {
            setIsOwner(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitFunds = async () => {
    try {
      const ethRate = exchangeRate;
      const ethTotal = donationAmount / ethRate;
      const donation = web3.utils.toWei(ethTotal.toString());

      await factoryContract?.methods.donate().send({
        from: account,
        value: donation,
        gas: 650000,
      });
      setDonationAmount("");
      handleDonation();
      setOpen(false);
    } catch (error) {
      handleNotEnuogh();
      console.log("submit Donation error", error);
    }
  };

  const renderDonationsList = () => {
    var donations = userDonations;
    if (donations === null) {
      return false;
    }

    const totalDonations = donations.values.length;
    let donationList = [];
    var i;
    for (i = 0; i < totalDonations; i++) {
      const ethAmount = web3.utils.fromWei(donations.values[i]);
      const userDonation = exchangeRate * ethAmount;
      const donationDate = donations.dates[i];
      donationList.push({
        donationAmount: userDonation.toFixed(2),
        date: donationDate,
      });
    }

    return donationList.map((donation) => {
      return (
        <div className="flex w-full">
          <p>${donation.donationAmount}</p>

          <Button colorScheme="green">
            <Link
              className="donation-receipt-link"
              to={{
                pathname: "/receipts",
                state: {
                  fund: fundName,
                  donation: donation.donationAmount,
                  date: donation.date,
                },
              }}
            >
              Request Receipt
            </Link>
          </Button>
        </div>
      );
    });
  };

  const withdrawalFunds = async () => {
    try {
      await factoryContract.methods.withdraw().send({
        from: account,
      });
      handleWithdraw();
    } catch (error) {
      console.log(error);
    }
  };

  // set beneficiary
  const setBeneficiary = async () => {
    await factoryContract.methods.setBeneficiary(beneficiary).send({
      from: account,
    });

    handleNewBeneficiary();
  };

  const ethAmount = (donationAmount / exchangeRate || 0).toFixed(4);

  return (
    <Context.Provider
      value={{
        ethAmount,
        display,
        handleNewNotification,
        handleNewFundraiser,
        factoryContract,
        funds,
        getAFundraiser,
        loading,
        imageURL,
        fundName,
        description,
        getFundraiserDetails,
        submitFunds,
        setDonationAmount,
        totalDonations,
        donationAmount,
        renderDonationsList,
        url,
        Owner,
        withdrawalFunds,
        setBeneficiary,
        beneficiary,
        perc,
        open,
      }}
    >
      {children}
    </Context.Provider>
  );
};
