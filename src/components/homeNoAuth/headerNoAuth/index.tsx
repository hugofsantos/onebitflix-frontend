import styles from "./styles.module.scss";
import { Container, Button } from "reactstrap";

const HeaderNoAuth = () => {
  return <>
    <div className={styles.ctaSection}>
      <img src="/homeNoAuth/logoCta.png" alt="logo Cta" className={styles.imgCta} />
      <p>Se cadastre para ter acesso aos cursos</p>
      <img src="/homeNoAuth/logoCta.png" alt="logo Cta" className={styles.imgCta} />
    </div>
    <Container>
      <img src="/logoOnebitflix.svg" alt="Logo OneBitFlix" />
      <div>
        <Button outline color="primary">Entrar</Button>
      </div>
    </Container>
  </>;
}

export default HeaderNoAuth;