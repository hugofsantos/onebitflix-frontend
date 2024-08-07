import Link from 'next/link';
import styles from './styles.module.scss';
import {Container, Form, Input} from 'reactstrap';
import Modal from 'react-modal';
import { useState } from 'react';
import { useRouter } from 'next/router';

Modal.setAppElement("#__next");

const HeaderAuth = () => {  
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };


  return <>
    <Container className={styles.nav}>
      <Link href="/home">
        <img src="/logoOnebitflix.svg" alt="OneBitFlix" className={styles.imgLogoNav}/>
      </Link>
      <div className="d-flex align-items-center">
        <Form>
          <Input
            name='search'
            type='search'
            placeholder='Pesquisar'
            className={styles.input}
          />
        </Form>
        <img src="/homeAuth/iconSearch.svg" alt="Lupa de pesquisa" role='button' className={styles.searchImg}/>
        <p className={styles.userProfile} onClick={() => setModalOpen(true)}>HS</p>
      </div>

      <Modal 
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        shouldCloseOnEsc={true}
        overlayClassName={styles.overlayModal}
        className={styles.modal}
      >
        <Link href="/profile" className={styles.link}>
          <p className={styles.modalLink} role='button'>Meus Dados</p>
        </Link>
        <p className={styles.modalLink} role='button' onClick={handleLogout}>Sair</p>
      </Modal>
    </Container>
  </>;
}

export default HeaderAuth;