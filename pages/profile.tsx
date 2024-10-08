import Head from "next/head";
import styles from '@/styles/profile.module.scss';
import UserForm from "@/src/components/profile/user";
import HeaderAuth from "@/src/components/common/headerAuth";
import {Container, Row, Col, Button} from 'reactstrap';
import Footer from "@/src/components/common/footer";
import { useEffect, useState } from "react";
import PasswordForm from "@/src/components/profile/password";
import { useRouter } from "next/router";
import SpinnerPage from "@/src/components/common/spinner";

const Profile = () => {
  const [form, setForm] = useState("userForm");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) router.push("/login");
    else setLoading(false);
  }, []);

  if (loading) return <SpinnerPage />

  return <>
    <Head>
      <title>OneBitFlix - Perfil</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      <script src="https://jsuites.net/v4/jsuites.js"></script>
    </Head>  
    <header className={styles.header}>
      <HeaderAuth/>
    </header>
    <main>
      <Container className="py-5">
        <p className={styles.title}>Minha Conta</p>
        <Row className="pt-3 pb-5">
          <Col md={4} className={styles.btnColumn}>
            <Button 
              className={styles.renderForm} 
              onClick={() => setForm("userForm")}
              style={{"color": form === 'userForm' ? "#FF0044": "#FFFFFF"}}
            >
              DADOS PESSOAIS
            </Button>
            <Button 
              className={styles.renderForm}
              onClick={() => setForm("passwordForm")}
              style={{"color": form === 'passwordForm' ? "#FF0044" : "#FFFFFF"}}
            >
              SENHA
            </Button>
          </Col>
          <Col md>
            {form === 'userForm' ? <UserForm/> : <PasswordForm/>}
          </Col>
        </Row>
      </Container>
    </main>
    <footer className={styles.footer}>
      <Footer/>
    </footer>
  </>;
};

export default Profile;