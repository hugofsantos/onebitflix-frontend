import Footer from '@/src/components/common/footer';
import HeaderAuth from '@/src/components/common/headerAuth';
import SpinnerPage from '@/src/components/common/spinner';
import EpisodeCard from '@/src/components/episodeCard';
import courseService, { CourseType, EpisodeType } from '@/src/services/courseService';
import styles from '@/styles/course.module.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {Container, Button} from 'reactstrap';

const CoursePage = () => {
  const router = useRouter();
  const {id} = router.query;
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const getCourse = async () => {
    if(typeof id !== 'string') return;

    const res = await courseService.getEpisodesByCourseId(id);

    if(res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  const handleLikeCourse = async () => {
    if (typeof id !== 'string') return;

    if(liked) {
      await courseService.removeLikeFromCourse(id);
      setLiked(false);
    } else {
      await courseService.likeCourse(id);
      setLiked(true);
    }
  }

  const handleFavoriteCourse = async () => {
    if (typeof id !== 'string') return;

    if (favorited) {
      await courseService.removeFav(id);
      setFavorited(false);
    } else {
      await courseService.addToFav(id);
      setFavorited(true);
    }
  }

  if(!course) return <SpinnerPage/>
  return <>
    <Head>
      <title>OneBitFlix - {course?.name || "curso"}</title>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <header style={{
      backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "550px"
    }}>
      <HeaderAuth/>
    </header>
    <main>
      <Container className={styles.courseInfo}>
        <p className={styles.courseTitle}>{course?.name}</p>
        <p className={styles.courseDescription}>{course?.synopsis}</p>
        <Button outline className={styles.courseBtn} disabled={!course?.episodes?.length}>
          Assistir Agora
          <img src="/buttonPlay.svg" alt={`Assistir ${course?.name || ""} agora`} className={styles.buttonImg} />
        </Button>
        <div className={styles.interactions}>
          <img 
            src={`/course/${liked ? "iconLiked" : "iconLike"}.svg`}
            alt="Curtir"
            className={styles.interactionsImg}
            onClick={handleLikeCourse}
          />
          <img 
            src={`/course/${favorited ? "iconFavorited" : "iconAddFav"}.svg`}
            alt="Favoritar"
            className={styles.interactionsImg}
            onClick={handleFavoriteCourse}
          />
        </div>
      </Container>
      <Container className={styles.episodeInfo}>
        <p className={styles.episodeDivision}>EPISÓDIOS</p>
        <p className={styles.episodesLength}>{course.episodes?.length} episódios</p>
        {!course?.episodes?.length 
          ? (<p className={styles.noEpisodesText}> Não há episódios neste curso ainda &#128533;. Por favor, volte outra hora!</p>)
          : course.episodes?.map((episode: EpisodeType) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))
        }
      </Container>
    </main>
    <footer className={styles.footer}>
      <Footer/>
    </footer>
  </>;
};

export default CoursePage;
