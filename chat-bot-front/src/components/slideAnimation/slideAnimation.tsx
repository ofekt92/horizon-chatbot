import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./slidingAnimation.css";

export type SlideProps = {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
    direction?: "left" | "right" | "up" | "down";
    easing?: "ease-in" | "ease-out" | "ease-in-out";
};

export function SlidingAnimation({
    children,
    delay = 0,
    duration = 300,
    easing = "ease-in-out",
    direction = "down",
}: SlideProps) {

    const [animate, setAnimate] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        setAnimate(true);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            console.log("observing")
            if (entry.isIntersecting) {
                console.log("intersecting")
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.2 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    let slidingDirection;
    switch (direction) {
        case "down":
        case "up": slidingDirection = 'Y'; break;
        case "left":
        case "right": slidingDirection = 'X'; break;
        default: break;
    }

    const shouldAnimate = animate && isVisible;

    const classes = classNames("slider", {
        animate: shouldAnimate ? 'animate' : '',
        up: direction === "up",
        down: direction === "down",
        left: direction === "left",
        right: direction === "right",
    });

    const translate = `translate${slidingDirection}`;
    const transitionTxt = `${duration}ms ${easing} ${delay ? `${delay}ms` : ""}`;

    return (
        <div
            className={classes}
            ref={ref}
            style={{
                opacity: shouldAnimate ? 1 : 0,
                transform: shouldAnimate ? `${translate}(0)` : `${translate}(-1.5rem)`,
                transition: `opacity ${transitionTxt}, transform ${transitionTxt}`
            }}>
            {children}
        </div>
    )
}