import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";

export default function AboutSection() {
  const [flip, set] = useState(false);
  const { number } = useSpring({
    reset: true,
    reverse: flip,
    from: { number: 0 },
    number: 5,
    delay: 100,
    config: config.molasses,
    onRest: () => set(!flip),
  });

  return (
    <>
      <section className="introSection">
        <animated.div>{number.to((n) => n.toFixed(2))}</animated.div>
      </section>
    </>
  );
}
