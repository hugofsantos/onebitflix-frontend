import HeaderAuth from '@/src/components/common/headerAuth';
import styles from '@/styles/course.module.scss';
import Head from 'next/head';

const CoursePage = () => {
  return <>
    <Head>
      <title>OneBitFlix - {"courseName"}</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <header className={styles.header}>
      <HeaderAuth/>
    </header>
  </>;
};

export default CoursePage;
