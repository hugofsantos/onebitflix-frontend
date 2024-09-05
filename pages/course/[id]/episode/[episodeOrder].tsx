import Footer from '@/src/components/common/footer';
import HeaderGeneric from '@/src/components/common/headerGeneric';
import SpinnerPage from '@/src/components/common/spinner';
import courseService, { CourseType } from '@/src/services/courseService';
import styles from '@/styles/episode.module.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import {Container, Button} from 'reactstrap';

const EpisodePage = () => {
  const router = useRouter();
  const id = router.query.id?.toString() || "";
  const episodeOrder = Number(router.query.episodeOrder?.toString() || "0");
  const [course, setCourse] = useState<CourseType>();

  const getCourse = async () => {
    if(typeof id !== 'string') return;

    const res = await courseService.getCourseWithEpisodes(id);

    if(res.status === 200) setCourse(res.data);

  };

  const handlePrevEpisode = () => router.push(`/course/${id}/episode/${episodeOrder - 1}`);
  const handleNextEpisode = () => router.push(`/course/${id}/episode/${episodeOrder + 1}`);


  useEffect(() => {getCourse()}, [id]);
  
  if(!course) return <SpinnerPage/>

  return <>
      <Head>
        <title>OneBitFlix - {course?.episodes?.[episodeOrder]?.name || "episódio inexistente"}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <header>
        <HeaderGeneric 
          logoUrl='/home' 
          btnContent={"Voltar para o curso"} 
          btnUrl={`/course/${id}`} 
        />
      </header>
      <main>
        <Container className='d-flex flex-column align-items-center gap-3 pt-5'>
          <p className={styles.episodeTitle}>{course.episodes?.[episodeOrder].name}</p>
          {typeof window === 'undefined'
            ? null
            : <ReactPlayer 
                className={styles.player} 
                url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${course.episodes?.[episodeOrder].videoUrl}&token=${sessionStorage.getItem('onebitflix-token')}`} 
                controls
              />
          }
          <div className={styles.episodePrevNext}>
            <Button className={styles.episodeNavBtn} disabled={episodeOrder <= 0}>
              <img 
                src="/episode/iconArrowLeft.svg"
                alt="Voltar episódio"
                title="Voltar episódio"
                className={styles.arrowImg}
                onClick={handlePrevEpisode}
              />
            </Button>

            <Button className={styles.episodeNavBtn} disabled={(episodeOrder + 1) >= Number(course.episodes?.length)}>
              <img
                src="/episode/iconArrowRight.svg"
                alt="Próximo episódio"
                title='Próximo episódio'
                className={styles.arrowImg}
                onClick={handleNextEpisode}
              />
            </Button>            
          </div>

          <p className={styles.episodeDescription}>{course.episodes?.[episodeOrder].synopsis || "Sem descrição"} </p>
        </Container>
      </main>
      <footer className={styles.footer}>
        <Footer/>
      </footer>
    </>;
};

export default EpisodePage;