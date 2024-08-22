import styles from '@/styles/home.module.scss';
import HeaderAuth from "@/src/components/common/headerAuth";
import Head from "next/head";
import FeaturedSection from '@/src/components/homeAuth/featuredSection';
import NewestCategory from '@/src/components/homeAuth/newestCategory';
import FavoriteCategory from '@/src/components/homeAuth/favoriteCategory';
import FeaturedCategory from '@/src/components/homeAuth/featuredCategory';
import ListCategories from '@/src/components/homeAuth/listCategories';

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
      <NewestCategory></NewestCategory>
      <FavoriteCategory/>
      <FeaturedCategory/> 
      <ListCategories/>
    </main>
  </>
};

export default HomeAuth;