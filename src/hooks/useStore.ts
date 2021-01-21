/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from 'redux';
import { useMemo } from 'react';

import { initializeStore } from 'src/store/store';

export function useStore(initialState: any): Store {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  return store;
}
