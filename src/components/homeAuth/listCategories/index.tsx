import categoriesService, { CategoryType } from "@/src/services/categoriesService";
import useSWR from "swr";
import CategoriesCoursesSlides from "../categoriesCoursesSlide";
import SpinnerPage from "../../common/spinner";

const ListCategories = () => {
  const {data, error} = useSWR("/categories", categoriesService.getCategories); 
  
  if (error) return error;
  if (!data) return (<SpinnerPage/>)  

  return <>
    {data.data?.categories?.map((category: CategoryType) => (
      <CategoriesCoursesSlides 
        key={category.id}
        categoryId={category.id}
        categoryName={category.name}
      />
    ))}
  </>;
}

export default ListCategories;