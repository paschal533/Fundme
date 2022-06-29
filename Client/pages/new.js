import React, { useContext, useEffect, useState } from "react";
import getWeb3 from "../getweb3";
import FundraiserFactor from "../contracts/FundraiserFactory.json";
import { useMoralis } from "react-moralis";
import { useId } from "react-id-generator";
import Head from "next/head";
import Web3 from "web3";
import { Input, Button, useToast } from "@chakra-ui/react";

const NewFundraiser = () => {
  const toast = useToast();
  const [htmlId] = useId();
  //const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/8aa0ba844efe4f3faf0e35ad39808087'))
  const { isAuthenticated, account } = useMoralis();
  const [contract, setContract] = useState(null);
  const [name, setFundraiserName] = useState(null);
  const [website, setFundraiserWebsite] = useState(null);
  const [description, setFundraiserDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState(null);

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

  const handleError = (error) => {
    toast({
      position: "top-left",
      title: "error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundraiserFactor.networks[networkId];
        const instance = new web3.eth.Contract(
          FundraiserFactor.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);
        console.log(instance);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.${error}`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  const Validate = () => {
    if (
      name != null &&
      website != null &&
      description != null &&
      image != null &&
      address != null
    ) {
      return false;
    } else {
      return true;
    }
  };

  //code to upload a fundraiser to database
  const handleSubmit = async () => {
    try {
      if (
        name != null &&
        website != null &&
        description != null &&
        image != null &&
        address != null
      ) {
        const doc = {
          _id: htmlId,
          _type: "fundraiser",
          name: name,
          website: website,
          image: image,
          ethAddress: address,
          description: description,
        };

        await fetch("/api/server", {
          method: "Post",
          body: JSON.stringify(doc),
        }).then(() => {
          handleNewFundraiser();
          setAddress("");
          setFundraiserDescription("");
          setFundraiserWebsite("");
          setFundraiserName("");
          setImage("");
        });
      }
    } catch (error) {
      console.log(error);
      handleError(error);
      alert(error);
    }
  };

  //code to upload a comfirmed fundraiser to the blockchain
  /*const handleSubmit = async () => {
    try { 
        const imageURL = image
      const url = website
      const beneficiary = address
      //const currentUser = await web3.currentProvider.
      
      console.log(contract);
    
      const transaction = await contract.methods.createFundraiser(
        name,
        url,
        imageURL,
        description,
        beneficiary
      ).send({ from: account })

        handleNewFundraiser();
        setAddress('');
        setFundraiserDescription('');
        setFundraiserWebsite('');
        setFundraiserName('');
        setImage('');
    }catch(error){
      console.log(error);
     // handleError(error);
    }
     
  }*/

  return (
    <div className="">
      <Head>
        <title>New</title>
      </Head>
      <div className="flex min-h-[85vh] md:min-h-[90vh] flex-col items-center justify-center">
        <div className="mb-6">
          <h1 className="text-3xl text-[#337EFE] font-semibold">
            New Fundraiser
          </h1>
        </div>
        <div className="md:w-[50%] w-[80%] space-y-2">
          <Input
            className="input"
            placeholder="Fundraiser Name"
            _placeholder={{ opacity: 1, color: "gray.500" }}
            onChange={(e) => setFundraiserName(e.target.value)}
            value={name}
            type="text"
            validation={{
              required: true,
            }}
          />
          <br />
          <Input
            className="input"
            placeholder="Fundraiser Website"
            _placeholder={{ opacity: 1, color: "gray.500" }}
            value={website}
            onChange={(e) => setFundraiserWebsite(e.target.value)}
            type="text"
            validation={{
              required: true,
            }}
          />
          <br />
          <Input
            className="input"
            placeholder="Fundraiser Image"
            _placeholder={{ opacity: 1, color: "gray.500" }}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            validation={{
              required: true,
            }}
          />
          <br />
          <Input
            className="input"
            placeholder="Eth Address"
            _placeholder={{ opacity: 1, color: "gray.500" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            validation={{
              required: true,
            }}
          />
          <br />
          <Input
            className="input"
            placeholder="Description"
            _placeholder={{ opacity: 1, color: "gray.500" }}
            value={description}
            onChange={(e) => setFundraiserDescription(e.target.value)}
            type="text"
            validation={{
              required: true,
            }}
          />
          <br />
          {account ? (
            <Button
              isLoading={Validate()}
              spinner={"submit"}
              id="test-button-primary"
              colorScheme="teal"
              size="md"
              onClick={handleSubmit}
            >
              Submit{" "}
            </Button>
          ) : (
            <Button
              isLoading={true}
              spinner={"submit"}
              id="test-button-primary"
              colorScheme="teal"
              size="md"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewFundraiser;
