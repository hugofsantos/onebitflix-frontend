import Link from 'next/link';
import styles from './styles.module.scss';
import {Container, Form, Input} from 'reactstrap';
import Modal from 'react-modal';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import profileService from '@/src/services/userService';

Modal.setAppElement("#__next");

const HeaderAuth = () => {  
  const [searchName, setSearchName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    profileService.fetchCurrentProfile().then(user => {
      setInitials((user.firstName[0] ?? '') + (user.lastName[0] ?? ''));
    });
  }, [])

  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`search?name=${searchName}`);
    setSearchName('');
  }

  const handleSearchClick = () => {
    router.push(`search?name=${searchName}`);
    setSearchName('');    
  }


  return <>
    <Container className={styles.nav}>
      <Link href="/home">
        <img src="/logoOnebitflix.svg" alt="OneBitFlix" className={styles.imgLogoNav}/>
      </Link>
      <div className="d-flex align-items-center">
        <Form onSubmit={handleSearch}>
          <Input
            name='search'
            type='search'
            placeholder='Pesquisar'
            value={searchName}
            onChange={(event) => setSearchName(event.currentTarget.value.toLowerCase())}
            className={styles.input}
          />
        </Form>
        <img 
          src="/homeAuth/iconSearch.svg" 
          alt="Lupa de pesquisa" 
          role='button' 
          className={styles.searchImg}
          onClick={handleSearchClick}
        />
        <p className={styles.userProfile} onClick={() => setModalOpen(true)}>{initials}</p>
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