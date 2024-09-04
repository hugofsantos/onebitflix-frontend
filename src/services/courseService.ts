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
  },

  async getFeaturedCourses() {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return await api.get("/courses/featured", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch(error: any) {
      return error.response;
    }
  },

  async addToFav(courseId: number | string) {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return await api.post("/favorites", {courseId}, {
        headers: {'Authorization': `Bearer ${token}`}
      });
    } catch (error: any) {
      return error.response;
    }
  },

  async removeFav(courseId: number | string) {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return await api.delete("/favorites", {
        headers: { 'Authorization': `Bearer ${token}` },
        data: {courseId}
      });
    } catch (error: any) {
      return error.response;
    }
  },

  async getFavCourses() {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return await api.get('/favorites', {headers: {'Authorization': `Bearer ${token}`}});
    } catch (error: any) {
      return error.response;
    }    
  },

  async searchCourses(name: string) {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return await api.get(`/courses/search?name=${name}`, { headers: { 'Authorization': `Bearer ${token}` } });
    } catch (error: any) {
      return error.response;
    }       
  }
};

export default courseService;