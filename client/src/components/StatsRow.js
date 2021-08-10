import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated, config } from "react-spring";

export default function StatsRow({ meVisible }) {
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // console.count("meVisible");
  function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState(false);

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    useEffect(() => {
      observer.observe(ref.current);
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer.disconnect();
      };
    }, []);

    return isIntersecting;
  }

  /*
    change number, number2, number3 for altering stats article values
  */

  const { number } = useSpring({
    reset: true,
    from: { number: 0 },
    number: 400,
    duration: 7000,
    delay: 500,
    config: config.molasses,
    // onRest: () => {n=400},
  });
  const { number2 } = useSpring({
    reset: true,
    from: { number2: 0 },
    number2: 20000,
    duration: 12000,
    delay: 500,
    config: config.molasses,
    // onRest: () => {n=20000},
  });
  const { number3 } = useSpring({
    reset: true,
    from: { number3: 0 },
    number3: 9000,
    duration: 19000,
    delay: 500,
    config: config.molasses,
    // onRest: () => {n=9000},
  });

  return (
    <>
      <div ref={ref} className="mainDivider">
        <div className="statBlock">
          <h3>#Datasets: </h3>
          <animated.div className="anim-number">
            {number.to((n) => n.toFixed(0))}
          </animated.div>
        </div>
        <div className="statBlock">
          <h3>#Patients: </h3>
          <animated.div className="anim-number">
            {number2.to((n) => n.toFixed(0))}
          </animated.div>
        </div>
        <div className="statBlock">
          <h3>#Scans: </h3>
          <animated.div className="anim-number">
            {number3.to((n) => n.toFixed(0))}
          </animated.div>
        </div>
      </div>
    </>
  );
}
