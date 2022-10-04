import type { NextPage } from "next";
import Head from "next/head";
import ProtonLanding from "../components/ProtonLanding";
import AppConstant from "../constant/AppConstant";

const Home: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>{AppConstant.meta.title}</title>
        <meta name="description" content={AppConstant.meta.description} />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <ProtonLanding />
    </>
  );
};

export default Home;
