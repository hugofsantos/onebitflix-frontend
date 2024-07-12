import styles from './styles.module.scss';
import {Container, Row, Col, Button} from 'reactstrap';
import Link from 'next/link';

const PresentationSection = () => {
  return <>
    <Container>
      <Row>
        <Col md>
          <p className={styles.subtitle}>ACESSO ILIMITADO</p>
          <p className={styles.title}>Tenha acesso aos melhores <br/> tutoriais de programação.</p>
          <p className={styles.description}>Estudo de onde estiver, a qualquer momento, e continue <br/> 
          evoluindo como programador.</p>
          
          <Link href="/register">
            <Button className={styles.btnCta}>
              ACESSE AGORA
              <img src="/buttonPlay.svg" alt="Acessar conteúdo" className={styles.btnImg} />
            </Button>          
          </Link>
        </Col>
        <Col md>
          <img src="/homeNoAuth/imgPresentation.png" alt="Apresentação de conteúdos disponíveis" className={styles.imgPresentation}/>

        </Col>
      </Row>
    </Container>
  </>
}

export default PresentationSection;