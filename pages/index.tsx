import Head from "next/head";
import { Fragment } from "react";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import styles from "../styles/HomeNoAuth.module.scss";

const HomeNoAuth = () => {
  return (
    <Fragment>
      <Head>
        <title>OneBitFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="OneBitFlix" key="title"/>
        <meta name="description" content="Tenha acesso aos melhores conteúdos de programação de uma forma simples e fácil!" />
      </Head>
      <main>
        <HeaderNoAuth></HeaderNoAuth>
      </main>
    </Fragment>
  );
};

export default HomeNoAuth;