import styles from '@/styles/home.module.scss';
import HeaderAuth from "@/src/components/common/headerAuth";
import Head from "next/head";

const HomeAuth = () => {
  return <>
    <Head>
      <title>OneBitFlix - Home</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <header className={styles.header}>
      <HeaderAuth/>
    </header>
    <main></main>
  </>
};

export default HomeAuth;