import styles from './styles.module.scss';
import courseService from "@/src/services/courseService";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";

const NewestCategory = () => {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return error;
  if (!data) return (<><p>Loading...</p></>)

  return <>
    <p className={styles.title}>LANÇAMENTOS</p>
    <SlideComponent courses={data.data}></SlideComponent>
  </>;
}

export default NewestCategory;