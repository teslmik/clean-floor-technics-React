import { createContext, useContext } from "react";

export type GlobalContent = {
  isOpenCart: boolean,
  setIsOpenCart: (state: boolean) => void,
  isOpenCallback: boolean,
  setIsOpenCallback: (state: boolean) => void,
  handleTooggle: (value: string) => void,
  windowWidth: number,
  isOpenMap: boolean,
  setIsOpenMap: (state: boolean) => void,
  requestDone: {
    isOpen: boolean,
    title: string,
    text: string,
  },
  setRequestDone: (state: {
    isOpen: boolean;
    title: string;
    text: string;
  }) => void,
  isWebpImg: boolean,
};

export const MyGlobalContext = createContext<GlobalContent>({
  isOpenCart: false,
  setIsOpenCart: () => {},
  isOpenCallback: false,
  setIsOpenCallback: () => {},
  handleTooggle: () => {},
  windowWidth: 0,
  isOpenMap: false,
  setIsOpenMap: () => {},
  requestDone: {
    isOpen: false,
    title: '',
    text: '',
  },
  setRequestDone: () => {},
  isWebpImg: false,
});

export const useGlobalContext = () => useContext(MyGlobalContext);