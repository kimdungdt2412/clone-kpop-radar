import { useEffect, useRef, useState } from 'react'

export const useIsFirstRender = () => {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

export const useAutoFocus = () => {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return divRef;
};


export default useIsFirstRender