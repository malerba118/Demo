import { useState, useMemo } from 'react'

const useStateApi = (apiFactory, initialState) => {
  let [state, setState] = useState(initialState);
  return useMemo(() => apiFactory({ state, setState }), [
    state,
    setState,
    apiFactory
  ]);
};

export default useStateApi