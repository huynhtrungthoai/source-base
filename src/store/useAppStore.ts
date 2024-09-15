import {createJSONStorage, persist} from 'zustand/middleware';
import {createWithEqualityFn} from 'zustand/traditional';
import {IBlog} from '../types';
import {createStorage} from '../utils/storage';

type IAppStore = {
  favoriteList: IBlog[];
  updateFavoriteList: (newList: IBlog[]) => void;
  setField: (field: keyof IAppStore, value: IAppStore[keyof IAppStore]) => void;
  reset: () => void;
};

const persistConfig = {
  name: 'app-store-persist',
  storage: createJSONStorage(() => createStorage),
};

const initialState = {
  favoriteList: [],
};

export const useAppStore = createWithEqualityFn<IAppStore>()(
  persist(
    set => ({
      ...initialState,
      updateFavoriteList: (newList: IBlog[]) => {
        set(() => {
          return {favoriteList: newList};
        });
      },
      setField: (field, value) => {
        set(state => ({...state, [field]: value}));
      },
      reset: () => {
        set(() => initialState);
      },
    }),
    persistConfig,
  ),
  Object.is,
);
