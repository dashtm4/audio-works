import serverPaths from '@constants/serverPaths';

import axiosInstance from './axiosConfig';

const AudioAPI = {
  fetchAudioList: async () => {
    const res = await axiosInstance.get(serverPaths.AUDIO.LIST);
    return res.data;
  },
  downstream: async (id: string) => {
    const res = await axiosInstance.get(serverPaths.AUDIO.DOWNSTREAM(id));
    return res.data;
  },
  upstream: async (formData: any) => {
    const res = await axiosInstance.post(serverPaths.AUDIO.UPSTREAM, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res;
  },
};

export default AudioAPI;
