import { useState, useEffect } from 'react'

/**
 * @description This function is used to check the element is visible or not
 * @param {*} element 
 * @param {*} rootMargin 
 * @default 0px
 * @usage const isVisible = useIntersection(ref, '0px');
 * @returns boolean
 */

const useIntersection = (element, rootMargin) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      }, { rootMargin }
    );
    element?.current && observer.observe(element?.current);
    if (typeof element?.current === Object) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => observer.unobserve(element?.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isVisible;
};

export default useIntersection;