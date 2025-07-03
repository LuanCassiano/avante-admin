import { StateCreator, createStore, StoreApi } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { PersistOptions } from 'zustand/middleware';

export function createZustandStoreWithSelectors<T>(
  initializer: StateCreator<T>,
  persistConfig?: PersistOptions<T>
): {
  useStore: <Selected>(selector: (state: T) => Selected) => Selected;
  rawStore: StoreApi<T>;
} {
  function createSelectors(store: StoreApi<T>) {
    function useStore<Selected>(selector: (state: T) => Selected): Selected {
      return useStoreWithEqualityFn(store, selector, shallow);
    }
    return useStore;
  }

  const { persist } = require('zustand/middleware');

  const storeInitializer = persistConfig
    ? persist(initializer, persistConfig)
    : initializer;

  const rawStore = createStore<T>(storeInitializer);

  return {
    rawStore,
    useStore: createSelectors(rawStore),
  };
}
