import styles from "./styles.module.scss";
import { Container, Button } from "reactstrap";
import Link from "next/link";

const HeaderNoAuth = () => {
  return <>
    <div className={styles.ctaSection}>
      <img src="/homeNoAuth/logoCta.png" alt="logo Cta" className={styles.imgCta} />
      <p>Se cadastre para ter acesso aos cursos</p>
      <img src="/homeNoAuth/logoCta.png" alt="logo Cta" className={styles.imgCta} />
    </div>
    <Container className={styles.nav}>
      <img src="/logoOnebitflix.svg" alt="Logo OneBitFlix" className={styles.imgLogoNav} />
      <div>
        <Link href="/login">
          <Button className={styles.navBtn}>Entrar</Button>
        </Link> 

        <Link href="/register">
          <Button className={styles.navBtn}>Quero fazer parte</Button>
        </Link>
      </div>
    </Container>
  </>;
}

export default HeaderNoAuth;