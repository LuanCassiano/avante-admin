import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

type TModalStoreProps = {
  showModal: boolean;
  field: string | null;
  onSelectItem: (value: string) => void;
  options: { label: string; value: string }[];
  openModal: (
    field: string,
    onSelectItem: (value: string) => void,
    options: { label: string; value: string }[]
  ) => void;
  closeModal: () => void;
  onSelect: (id: string, name: string) => void;
  data: {
    id: string;
    name: string;
  }
}

export const {
  useStore: useModalStore,
  rawStore: modalRawStore,
} = createZustandStoreWithSelectors<TModalStoreProps>((set, _) => ({
  showModal: false,
  data: { id: '', name: ''},
  field: null,
  onSelectItem: () => set({ showModal: false }),
  options: [],
  openModal: (field, onSelectItem, options) => set({ showModal: true,  field, onSelectItem, options }),
  closeModal: () => set({ showModal: false, data: { id: '', name: '' } }),
  onSelect: (id, name) => {
    set((state) => ({ ...state, data: { id, name }, showModal: false }));
  }
}));
