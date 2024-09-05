import { EpisodeType } from '@/src/services/courseService';
import styles from './styles.module.scss';

interface props {
  episode: EpisodeType
}

const EpisodeCard = ({episode}: props) => {
  const secondsToMinutes = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const parseToString = (num: number) => num.toString().padStart(2, "0"); // Se for 2, fica 02 (por exemplo)

    return `${parseToString(minutes)}:${parseToString(seconds)}`;
  }

  return <>
    <div className={styles.episodeCard} role='button'>
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
