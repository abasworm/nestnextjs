import { GlobalStore } from "./global-store";
import { createContext } from "react";

interface State {
  store: GlobalStore;
}

export const store = new GlobalStore();
export const Context = createContext<State>({
  store,
});
