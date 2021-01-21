import { NextPage } from 'next';
import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type MyNextPage<P = {}> = NextPage<P> &
  P & {
    layout?: FC;
  };
