import { married } from '@/apis/instance/instance';
import authorization from '@/apis/token/token';
import { PostGuestSnapShotReq } from '@/types/snapshot/remote';
import axios from 'axios';

export const postGuestSnapShot = async ({ cardId, urls }: PostGuestSnapShotReq) => {
  const { data } = await married.post('/guestSnapshots/create', { cardId, urls });

  return data;
};

export const getPresigned = async (fileName: string) => {
  const { data } = await married.get('/files/presigned', {
    params: { fileName },
    ...authorization(),
  });

  return data;
};

export const putPresigned = async (file: File, url: string) => {
  const response = await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return response;
};

export const getDownloadUrl = async (uploadedUrl: string) => {
  const withoutQuery = uploadedUrl.split('?')[0];
  const fileKey = withoutQuery.replace(/^https:\/\/[^/]+\//, '');
  const decodedFileKey = decodeURIComponent(fileKey);

  const { data } = await married.get('/files/download', {
    params: { fileDomain: decodedFileKey },
    ...authorization(),
  });

  return data as string;
};
