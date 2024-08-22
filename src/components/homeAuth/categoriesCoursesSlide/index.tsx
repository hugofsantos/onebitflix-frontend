import styles from './styles.module.scss';
import categoriesService from "@/src/services/categoriesService";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";

interface props {
  categoryId: number;
  categoryName: string
}

const CategoriesCoursesSlides = ({categoryId, categoryName}: props) => {
  const { data, error } = useSWR(`/categoriesCourses/${categoryId}`, () => categoriesService.getCategoryWithCourseById(categoryId));

  if (error) return error;
  if (!data) return (<><p>Loading...</p></>)  

  return <>
    <p className={styles.title}>{categoryName}</p>
    <SlideComponent courses={data.data.courses}/>
  </>
};

export default CategoriesCoursesSlides;