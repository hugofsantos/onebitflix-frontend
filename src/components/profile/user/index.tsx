import styles from '@/styles/profile.module.scss';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const UserForm = () => {
  return <>
    <Form className={styles.form}>
      <div className={styles.formName}>
        <p className={styles.nameAbbreviation}>NT</p>
        <p className={styles.userName}>NAME TEST</p>
      </div>
      <div className={styles.memberTime}>
        <img src="/profile/iconUserAccount.svg" alt="Perfil" className={styles.memberTimeImg} />
        <p className={styles.memberTimeText}>Membro desde <br/> 20 de Abril de 2020</p>
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
            value={"Name"}
            className={styles.fullNameInput}
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
            value={"Test"}
            className={styles.fullNameInput}
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
            value={"+55 (84) 99999-9999"}
            className={styles.input}
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
            value={"test@example.com"}
            className={styles.input}
          />
        </FormGroup>

        <Button type='submit' outline className={styles.formBtn}>
          Salvar Alterações
        </Button>        
      </div>
    </Form>
  </>
};

export default UserForm;