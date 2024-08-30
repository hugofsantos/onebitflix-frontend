import styles from '@/styles/profile.module.scss';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const PasswordForm = () => {
  return <>
    <Form className={styles.form}>
      <div className={styles.inputNormalDiv}>
        <FormGroup>
          <Label for="currentPassword" className={styles.label}>SENHA ATUAL</Label>
          <Input
            name='currentPassword'
            id='currentPassword'
            type='password'
            placeholder='************'
            required
            minLength={6}
            maxLength={20}
            className={styles.input} 
          />
        </FormGroup>
      </div>
      <div className={styles.inputFlexDiv}>
        <FormGroup>
          <Label for="newPassowrd" className={styles.label}>NOVA SENHA</Label>
          <Input
            name='newPassoword'
            id='newPassword'
            type='password'
            placeholder='************'
            required
            minLength={6}
            maxLength={20}
            className={styles.inputFlex}
          />
        </FormGroup>

        <FormGroup>
          <Label for='confirmPassword' className={styles.label}>CONFIRMAR NOVA SENHA</Label>
          <Input
            name='confirmPassword'
            id='confirmPassword'
            type='password'
            placeholder='************'
            required
            minLength={6}
            maxLength={20}
            className={styles.inputFlex}
          />
        </FormGroup>

        <Button type='submit' outline className={styles.formBtn}>Salvar Alterações</Button>
      </div>
    </Form>
  </>;
};

export default PasswordForm;