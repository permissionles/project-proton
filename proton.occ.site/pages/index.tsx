import type { NextPage } from "next";
import Head from "next/head";
import Async from "../components/Async";
import Banner from "../components/Banner";
import Banner2 from "../components/Banner2";
import Uniswap from "../components/Uniswap";
import AppConstant from "../constant/AppConstant";

const Home: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>{AppConstant.meta.title}</title>
        <meta name="description" content={AppConstant.meta.description} />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Banner />
      <Banner2 />
      <Async />
      <Uniswap />
    </>
  );
};

export default Home;
