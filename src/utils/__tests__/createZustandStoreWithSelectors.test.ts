import { renderHook, act } from '@testing-library/react-hooks'
import { createZustandStoreWithSelectors } from '../createZustandStoreWithSelectors'

describe('createZustandStoreWithSelectors', () => {
  it('should create a store and allow selecting state', () => {
    const initializer = (set: any) => ({
      count: 0,
      increment: () => set((state: any) => ({ count: state.count + 1 })),
    })

    const { useStore, rawStore } = createZustandStoreWithSelectors(initializer)

    expect(rawStore.getState().count).toBe(0)

    act(() => {
      rawStore.getState().increment()
    })
    expect(rawStore.getState().count).toBe(1)

    const { result } = renderHook(() => useStore(state => state.count))
    expect(result.current).toBe(1)
  })

  it('should use shallow equality for state comparison', () => {
    const initializer = (set: any) => ({
      nested: { value: 0 },
      updateNested: () => set({ nested: { value: 1 } }),
    })

    const { useStore, rawStore } = createZustandStoreWithSelectors(initializer)

    const { result: initial } = renderHook(() => useStore(state => state.nested))
    expect(initial.current).toEqual({ value: 0 })

    act(() => {
      rawStore.getState().updateNested()
    })

    const { result: updated } = renderHook(() => useStore(state => state.nested))
    expect(updated.current).toEqual({ value: 1 })
  })
});
