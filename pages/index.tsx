import Head from "next/head";
import { Fragment, ReactNode } from "react";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardsSection from "@/src/components/homeNoAuth/cardsSection";
import styles from "../styles/HomeNoAuth.module.scss";
import SlideSection from "@/src/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/src/services/courseService";

interface IndexPageProps {
  children?: ReactNode;
  courses: Array<CourseType> 
}

const HomeNoAuth = ({courses}: IndexPageProps) => {
  return (
    <Fragment>
      <Head>
        <title>OneBitFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="OneBitFlix" key="title"/>
        <meta name="description" content="Tenha acesso aos melhores conteúdos de programação de uma forma simples e fácil!" />
      </Head>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardsSection/>
        <SlideSection newestCourses={courses}/>
      </main>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();

  return {
    props: {
      courses: (res as any)?.data || []
    },
    revalidate: 60 * 60 * 24 // Um dia (24h) em segundos
  }
}

export default HomeNoAuth;