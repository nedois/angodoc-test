/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr';

import axios from 'src/utils/axios';

export default function useFetch<Data = any, Error = any>(
  _url: string,
): {
  data: Data;
  error: Error;
} {
  const { data, error } = useSWR<Data, Error>(_url, async url => {
    const response = await axios.get(url);

    return response.data;
  });

  return { data, error } as {
    data: Data;
    error: Error;
  };
}
