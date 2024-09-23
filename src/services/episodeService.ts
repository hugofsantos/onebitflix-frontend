import api from "./api";

interface watchTimeParams {
  episodeId: number,
  seconds: number
}

const episodeService = {
  async getWatchTime(episodeId: number) {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return await api.get(`/episodes/${episodeId}/watchTime`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
    } catch (error: any) {
      return error.response;
    }
  },
  
  async setWatchTime({episodeId, seconds}:watchTimeParams) {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return await api.post(`/episodes/${episodeId}/watchTime`, {seconds}, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    } catch (error: any) {
      return error.response;
    }    
  }
};

export default episodeService;