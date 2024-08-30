import profileService from '@/src/services/userService';
import styles from '@/styles/profile.module.scss';
import { FormEvent, useEffect, useState } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import ToastComponent from '../../common/toast';

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [color, setColor] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleUpdatePassword = async (event:FormEvent<HTMLElement>) => {
    event.preventDefault();

    if(newPassword !== confirmPassword) {
      setToastIsOpen(true);
      setToastMessage("Senha e confirmação de senha diferentes!");
      setColor('bg-danger');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);

      return;
    }        

    if (currentPassword === newPassword) {
      setToastIsOpen(true);
      setToastMessage("Não coloque a nova senha igual a senha antiga!");
      setColor('bg-danger');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      return;
    }         

    const responseStatus = await profileService.updatePassword({currentPassword, newPassword});

    if(responseStatus === 204) {
      setToastIsOpen(true);
      setToastMessage("Senha atualizada com sucesso!");
      setColor('bg-success');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else if (responseStatus.status === 401) {
      setToastIsOpen(true);
      setToastMessage("Senha atual incorreta!");
      setColor('bg-danger');
      setTimeout(() => setToastIsOpen(false), 1000 * 3);      
    }


  }

  return <>
    <Form className={styles.form} onSubmit={handleUpdatePassword}>
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
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.currentTarget.value)}
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
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
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
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </FormGroup>

        <Button type='submit' outline className={styles.formBtn}>Salvar Alterações</Button>
      </div>
    </Form>
    <ToastComponent
      color={color}
      isOpen={toastIsOpen}
      message={toastMessage}
    />
  </>;
};

export default PasswordForm;