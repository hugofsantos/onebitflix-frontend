import Footer from '@/src/components/common/footer';
import HeaderAuth from '@/src/components/common/headerAuth';
import SpinnerPage from '@/src/components/common/spinner';
import SearchCard from '@/src/components/search/searchCard';
import courseService, { CourseType } from '@/src/services/courseService';
import styles from '@/styles/search.module.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {Container} from 'reactstrap';

const Search = () => {
  const router = useRouter();
  const searchName = router.query.name;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);

  const searchCourses = async () => {
    if(typeof searchName === 'string') {
      const res = await courseService.searchCourses(searchName);

      setSearchResult(res.data.courses);
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) router.push("/login");
    else setLoading(false);
  }, []);

  useEffect(() => { searchCourses() }, [searchName]);


  if (loading) return <SpinnerPage />

  return <>
    <Head>
      <title>OneBitFlix - {searchName}</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <header className={styles.header}>
      <HeaderAuth/>
    </header>
    <main>
      {searchResult?.length > 0 
        ? <Container className='d-flex flex-wrap justify-content-center gap-5 py-4'>
          {searchResult?.map((course: CourseType) => (<SearchCard key={course.id} course={course}/>))}
        </Container>
        : <p className={styles.noSearchResult}>Nenhum resultado foi encontrado</p>  
      }
    </main>
    <footer className={styles.footer}>
      <Footer/>
    </footer>
  </>
};

export default Search;