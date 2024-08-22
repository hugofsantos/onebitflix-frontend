import useSWR from 'swr';
import styles from './styles.module.scss';
import courseService from '@/src/services/courseService';
import SlideComponent from '../../common/slideComponent';

const FeaturedCategory = () => {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return error;
  if (!data) return (<><p>Loading...</p></>)

  return <>
    <p className={styles.title}>EM DESTAQUE</p>
    <SlideComponent courses={data.data}/>
  </>;
};

export default FeaturedCategory;