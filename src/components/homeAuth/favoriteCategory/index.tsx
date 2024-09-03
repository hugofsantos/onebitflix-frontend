import useSWR from 'swr';
import styles from './styles.module.scss';
import courseService from '@/src/services/courseService';
import SlideComponent from '../../common/slideComponent';
import SpinnerPage from '../../common/spinner';

const FavoriteCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFavCourses);

  if (error) return error;
  if (!data) return (<SpinnerPage/>)

  return <>
    <p className={styles.title}>MEUS FAVORITOS</p>
    {data.data?.courses?.length >=1 
      ? (<SlideComponent courses={data.data.courses}/>) 
      : (<p className={styles.noFavoritesMessage}><strong>Você não tem nenhum curso na lista</strong></p>)
    }
  </>;
};

export default FavoriteCategory