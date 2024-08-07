import styles from '@/styles/registerLogin.module.scss';
import Head from 'next/head';
import HeaderGeneric from '@/src/components/common/headerGeneric';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import Footer from '@/src/components/common/footer';
import { FormEvent, useEffect, useState } from 'react';
import ToastComponent from '@/src/components/common/toast';
import { useRouter } from 'next/router';
import authService from '@/src/services/authService';

const Login = () => {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  useEffect(() => {
    if(sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    const registerSuccess = router.query.registred ?? "false";

    if(registerSuccess === 'true') {
      setToastIsOpen(true);
      setToastMessage("Usuário cadastrado com sucesso!");
      setToastColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  }, [router.query]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();

    const params = {email, password};

    const {status} = await authService.login(params);

    if(status === 200) {
      router.push("/home");
    } else {
      setToastIsOpen(true);
      setToastMessage("Email ou senha incorretos!");
      setToastColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);      
    }
  }

  return <>
    <Head>
      <title>OneBitFlix - Login</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" /> 
    </Head>
    <header>
      <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Quero fazer parte'/>
    </header>
    <main className={styles.main}>
      <Container className='py-5'>
        <p className={styles.greetings}>Bem-vindo(a) de volta!</p>
        <Form className={styles.form} onSubmit={handleLogin}>
          <p className='text-center'><strong>Bem-vindo(a) ao OneBitFlix!</strong></p>

          <FormGroup>
            <Label for="email" className={styles.label}>E-MAIL</Label>
            <Input 
              id='email'
              name='email'
              type='email'
              placeholder='Qual o seu email?'
              required
              className={styles.input}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password" className={styles.label}>SENHA</Label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='Digite a sua senha'
              required
              className={styles.input}
            />
          </FormGroup>

          <Button outline className={styles.formBtn} type='submit'>
            ENTRAR
          </Button>
        </Form>
      </Container>
      <ToastComponent isOpen={toastIsOpen} message={toastMessage} color={toastColor}/>
    </main>
    <footer className={styles.footer}>
      <Footer></Footer>
    </footer>
  </>
};

export default Login;