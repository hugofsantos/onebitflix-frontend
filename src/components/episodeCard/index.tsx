import { EpisodeType } from '@/src/services/courseService';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

interface props {
  episode: EpisodeType,
  courseId: number | string
}

const EpisodeCard = ({episode, courseId}: props) => {
  const router = useRouter();

  const secondsToMinutes = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const parseToString = (num: number) => num.toString().padStart(2, "0"); // Se for 2, fica 02 (por exemplo)

    return `${parseToString(minutes)}:${parseToString(seconds)}`;
  }

  const handleClick = () => {
    router.push(`/course/${courseId}/episode/${episode.order - 1}`);
  }

  return <>
    <div className={styles.episodeCard} role='button' onClick={handleClick}>
      <div className={styles.episodeOrderTime}>
        <p className={styles.episodeOrder}>Episódio Nº{episode.order}</p>
        <p className={styles.episodeTime}>{secondsToMinutes(episode.secondsLong)}</p>
      </div>

      <div className={styles.episodeTitleDescription}>
        <p className={styles.episodeTitle}>{episode.name}</p>
        <p className={styles.episodeDescription}>{episode.synopsis}</p>
      </div>
    </div>
  </>;
}

export default EpisodeCard;
