import profileService from '@/src/services/userService';
import styles from '@/styles/profile.module.scss';
import { profile } from 'console';
import { FormEvent, useEffect, useState } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import ToastComponent from '../../common/toast';
import { useRouter } from 'next/router';

const UserForm = () => {
  const router = useRouter();

  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState(email);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    profileService.fetchCurrentProfile().then(user => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setInitialEmail(user.email);
      setCreatedAt(user.createdAt);
    })
  }, []);

  const handleUserUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await profileService.updateUser({
      firstName,
      lastName,
      email,
      phone,
    });

    if (res===200) {
      setToastIsOpen(true);
      setToastMessage("Informações alteradas com sucesso!");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);

      if(email != initialEmail) {
        router.push("/");
        sessionStorage.clear();
      }
      
    } else {
      setToastIsOpen(true);
      setToastMessage("Você não pode mudar para esse email");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);      
    }
  }


  return <>
    <Form className={styles.form} onSubmit={handleUserUpdate}>
      <div className={styles.formName}>
        <p className={styles.nameAbbreviation}>{firstName[0] + lastName[0]}</p>
        <p className={styles.userName}>{firstName + ' ' + lastName}</p>
      </div>
      <div className={styles.memberTime}>
        <img src="/profile/iconUserAccount.svg" alt="Perfil" className={styles.memberTimeImg} />
        <p className={styles.memberTimeText}>
          Membro desde <br/>
          {new Date(createdAt).toLocaleString('pt-BR', {month: 'long', day:'numeric', year: 'numeric'})}
        </p>
      </div>
      <hr/>

      <div className={styles.fullNameDiv}>
        <FormGroup>
          <Label for='firstName' className={styles.label}>NOME</Label>
          <Input
            name='firstName'
            id='firstName'
            type='text'
            placeholder='Qual o seu primeiro nome?'
            required
            maxLength={20}
            value={firstName}
            className={styles.fullNameInput}
            onChange={(event) => setFirstName(event.target.value.toString().toUpperCase())}
          />
        </FormGroup>

        <FormGroup>
          <Label for='lastName' className={styles.label}>SOBRENOME</Label>
          <Input
            name='lastName'
            id='lastName'
            type='text'
            placeholder='Qual o seu último nome?'
            required
            maxLength={20}
            value={lastName}
            className={styles.fullNameInput}
            onChange={(event) => setLastName(event.target.value.toString().toUpperCase())}
          />
        </FormGroup>
      </div>

      <div className={styles.phoneAndEmailDiv}>
        <FormGroup>
          <Label for='phone' className={styles.label}>WHATSAPP / TELEGRAM</Label>
          <Input
            name='phone'
            id='phone'
            type='tel'
            placeholder='(xx) 9xxxx-xxxx'
            required
            value={phone}
            className={styles.input}
            onChange={(event) => setPhone(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email" className={styles.label}>E-MAIL</Label>
          <Input
            name='email'
            id='email'
            type='email'
            required
            placeholder='Digite o seu e-mail'
            value={email}
            className={styles.input}
            onChange={(event) => {console.log(initialEmail);setEmail(event.target.value)}}
          />
        </FormGroup>

        <Button type='submit' outline className={styles.formBtn}>
          Salvar Alterações
        </Button>        
      </div>
    </Form>
    <ToastComponent
      color={color}
      isOpen={toastIsOpen}
      message={toastMessage}
    />
  </>
};

export default UserForm;