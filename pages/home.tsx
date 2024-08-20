import styles from '@/styles/home.module.scss';
import HeaderAuth from "@/src/components/common/headerAuth";
import Head from "next/head";
import FeaturedSection from '@/src/components/homeAuth/featuredSection';

const HomeAuth = () => {
  return <>
    <Head>
      <title>OneBitFlix - Home</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <header className={styles.header}>
      <HeaderAuth/>
    </header>
    <main>
      <FeaturedSection></FeaturedSection>
    </main>
  </>
};

export default HomeAuth;