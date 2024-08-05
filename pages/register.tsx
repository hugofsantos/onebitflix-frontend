import HeaderGeneric from '@/src/components/common/headerGeneric';
import styles from '@/styles/registerLogin.module.scss';
import Head from 'next/head';


const Register = () => {
  return <>
    <Head>
      <title>OneBitFlix - Registro</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <header>
      <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero fazer login'/>
    </header>
  </>;
};

export default Register;