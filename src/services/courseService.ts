import api from './api';

export type EpisodeType = {
  id: number,
  name: string,
  synopsis: string,
  order: number,
  videoUrl: string
  secondsLong: number
};

export type CourseType = {
  id: number,
  name: string,
  thumbnailUrl: string,
  synopsis: string,
  episodes?: Array<EpisodeType>
};

const courseService = {
  async getNewestCourses() {
    try {
      const res = await api.get('/courses/newest');
      
      return res;
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  }
};

export default courseService;