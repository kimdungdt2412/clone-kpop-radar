import { useEffect, useRef } from "react";
import { useLocation } from "react-router";


export const usePrevLocation = (location) => {

  const prevLocRef = useRef(location)

  useEffect(() => {

    prevLocRef.current = location

  }, [location])

  return prevLocRef.current

}

export const ScrollToTop = (props) => {
  const location = useLocation();
  const prevLocation = usePrevLocation(location)
  useEffect(() => {
    if ((location.pathname.includes("brief") && location.pathname.split("/")?.length >= 3) || (location.pathname === "/brief" && prevLocation.pathname.split("/")?.length >= 3)) return
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};