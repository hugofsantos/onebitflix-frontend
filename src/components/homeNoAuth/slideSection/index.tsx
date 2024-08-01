import { CourseType } from '@/src/services/courseService';
import {Container, Button} from 'reactstrap';
import styles from './styles.module.scss';
import SlideComponent from '../../common/slideComponent';
import Link from 'next/link';

interface props {
  newestCourses: Array<CourseType>
}

const SlideSection = ({newestCourses} : props) => {
  return <>
    <Container className="d-flex flex-column align-items-center py-5">
      <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
      <SlideComponent courses={newestCourses}></SlideComponent>
      <Link href="/register">
        <Button outline color="light" className={styles.slideSectionBtn}>Se cadastre para acessar!</Button>
      </Link>
    </Container>
  </>;
}

export default SlideSection;