import Head from "next/head";
import { Apps, CardContainer } from "../components";

const Donate = () => {
  return (
    <>
      <Head>
        <title>Donate</title>
      </Head>
      <CardContainer top />
      <Apps />
    </>
  );
};

export default Donate;
