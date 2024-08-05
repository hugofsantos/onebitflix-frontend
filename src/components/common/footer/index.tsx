import styles from './styles.module.scss';
import { Container } from 'reactstrap';

const Footer = () => {
  return <>
    <Container className={styles.footer}>
      <img src="/logoOnebitcode.svg" alt="OneBitCode" className={styles.footerLogo}/>
      <a href="https://onebitcode.com" target='_blank' className={styles.footerLink}>
        ONEBITCODE.COM
      </a>
    </Container>
  </>
};

export default Footer;