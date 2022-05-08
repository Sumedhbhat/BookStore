import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";
import BookCard from "./BookCard";

import { motion } from "framer-motion";

export default ({ books }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 4, spacing: 5 },
      },
      "(min-width: 950px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 1600px)": {
        slides: { perView: 5, spacing: 15 },
      },
    },
  });

  return (
    <>
      <div className='navigation-wrapper'>
        <motion.div ref={sliderRef} className='keen-slider'>
          {books.map((item, index) => (
            <div className='keen-slider__slide py-3' key={index}>
              <BookCard book={item} delay={0.15 * index} />
            </div>
          ))}
        </motion.div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </>
  );
};

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      {props.left && (
        <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
      )}
      {!props.left && (
        <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
      )}
    </svg>
  );
}
