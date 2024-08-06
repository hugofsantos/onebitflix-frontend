import Footer from '@/src/components/common/footer';
import HeaderGeneric from '@/src/components/common/headerGeneric';
import styles from '@/styles/registerLogin.module.scss';
import Head from 'next/head';
import { Container ,Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { FormEvent, useState } from 'react';
import authService from '@/src/services/authService';
import { useRouter } from 'next/router';
import ToastComponent from '@/src/components/common/toast';

const Register = () => {
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); //getMonth() retorna valores de 0 a 11, por isso o +1
  const day = String(today.getDate()).padStart(2, '0');
  const maxDate = `${year}-${month}-${day}`; 

  const router = useRouter();
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    const firstName = formData.get("firstName")!.toString().toUpperCase();
    const lastName = formData.get("lastName")!.toString().toUpperCase();
    const phone = formData.get("phone")!.toString();
    const birth = formData.get("birth")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const confirmedPassowrd = formData.get("confirmedPassword")!.toString();
    
    const params = {firstName, lastName, phone, birth, email, password};

    if(password != confirmedPassowrd) {
      setToastIsOpen(true);
      setToastMessage("A senha e confirmação são diferentes!");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      return;
    }

    const {status, data} = await authService.register(params);

    if(status === 201) router.push("/login?registred=true");
    else {
      setToastIsOpen(true);
      setToastMessage(data.message);
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
    
  };

  return <>
    <Head>
      <title>OneBitFlix - Registro</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      <script src="https://jsuites.net/v4/jsuites.js"></script>
    </Head>
    <header>
      <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero fazer login'/>
    </header>
    <main className={styles.main}>
      <Container className="py-5">
        <p className={styles.greetings}><strong>Bem-vindo (a) ao OneBitFlix!</strong></p>
        <Form className={styles.form} onSubmit={handleRegister}>
          <p className='text-center'><strong>Faça a sua conta!</strong></p>
          <FormGroup>
            <Label for="firstName" className={styles.label}>NOME</Label>
            <Input 
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Qual o seu nome?"
              maxLength={20}
              required
              className={styles.inputName}
            />
          </FormGroup>

          <FormGroup>
            <Label for="lastName" className={styles.label}>SOBRENOME</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Qual o seu sobrenome?"
              maxLength={20}
              required
              className={styles.inputName}
            />
          </FormGroup>

          <FormGroup>
            <Label for="phone" className={styles.label}>WHATSAPP / TELEGRAM</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(xx) 9xxxx-xxxx"
              data-mask='[-]+55 (00) 00000-0000'
              required
              className={styles.input}
            />
          </FormGroup>

          <FormGroup>
            <Label for="email" className={styles.label}>E-MAIL</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite o seu e-mail"
              required
              className={styles.input}
            />
          </FormGroup>

          <FormGroup>
            <Label for="birth" className={styles.label}>DATA DE NASCIMENTO</Label>
            <Input
              id="birth"
              name="birth"
              type="date"
              min="1930-01-01"
              max={maxDate}
              required
              className={styles.input}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password" className={styles.label}>SENHA</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha (Min: 6, Max: 20)"
              min-length="6"
              max-length="20"
              required
              className={styles.input}
            />
          </FormGroup>

          <FormGroup>
            <Label for="confirmedPassword" className={styles.label}>CONFIRMAR SENHA</Label>
            <Input
              id="confirmedPassword"
              name="confirmedPassword"
              type="password"
              placeholder="Confirme a sua senha"
              min-length="6"
              max-length="20"
              required
              className={styles.input}
            />
          </FormGroup>    

          <Button type="submit" outline className={styles.formBtn}>CADASTRAR</Button>      
        </Form>
        <ToastComponent color="bg-danger" isOpen={toastIsOpen} message={toastMessage}/>
      </Container>
    </main>

    <footer className={styles.footer}>
      <Footer/>
    </footer>
  </>;
};

export default Register;