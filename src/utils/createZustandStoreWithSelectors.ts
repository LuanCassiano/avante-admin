import { type StateCreator, createStore, type StoreApi } from 'zustand/vanilla'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

export function createZustandStoreWithSelectors<T>(
  initializer: StateCreator<T>
): {
  useStore: <Selected>(selector: (state: T) => Selected) => Selected
  rawStore: StoreApi<T>
} {
  const rawStore = createStore(initializer)

  function useStore<Selected>(selector: (state: T) => Selected): Selected {
    return useStoreWithEqualityFn(rawStore, selector, shallow)
  }

  return { useStore, rawStore }
}
