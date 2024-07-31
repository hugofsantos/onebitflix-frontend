import { CourseType } from '@/src/services/courseService';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from '../slideCard';

interface props {
  courses: Array<CourseType>
};

const SlideComponent = ({courses}: props) => {
  return <>
    <div>
      <Splide options={{
        type: "loop",
        perPage: 4,
        perMove: 1,
        pagination: false
      }}>
        {
          courses?.map((course) => (
            <SplideSlide key={course.id}>
              <SlideCard course={course}></SlideCard>
            </SplideSlide>
          ))
        }
      </Splide>
    </div>
  </>;
}

export default SlideComponent;