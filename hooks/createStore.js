import { useContext, createContext } from 'react'
import useStateApi from './useStateApi'

const createStore = (apiFactory, initialState) => {
  const StoreContext = createContext();

  const StoreProvider = props => {
    let store = useStateApi(apiFactory, initialState);
    return (
      <StoreContext.Provider value={store}>
        {props.children}
      </StoreContext.Provider>
    );
  };

  let useStore = () => {
    return useContext(StoreContext);
  };

  return [StoreProvider, useStore];
};

export default createStore