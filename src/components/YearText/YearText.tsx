import styled from "styled-components";
import React, {useEffect, useState, useRef, useCallback} from "react";
import gsap from "gsap";
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Lines from "../Lines/Lines";
import {AppTitle} from "../AppTitle/AppTitle";
import {AppBody} from "../AppBody/AppBody";
import {AppWrapper} from "../AppWrapper/AppWrapper";


const Circle = styled.div`
  position: absolute;
  width: min(46vh, 46vw);
  height: min(46vh, 46vw);
  border-radius: 50%;
  border: 1px solid #c7cdd9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none; /* Для Safari */
  -moz-user-select: none; /* Для Firefox */
  -ms-user-select: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

const YearContainer = styled.h1`
  font-family: PT Sans, sans-serif;
  font-weight: 700;
  font-size: clamp(56px, 10vw, 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DotLabel = styled.div`
  position: absolute;
  left: 40px;
  max-width: 20vw;
  opacity: 0;
  font-family: PT Sans, sans-serif;
  color: gray;
  font-weight: 700;
  font-size: 20px;
  transition: opacity 0.3s ease;
  pointer-events: none;
  tab-index: -1;
  width: max-content;


  .selected & {
    opacity: 1;
    transition: opacity 0.3s ease 0.2s;
  }
`;

const DotsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
`;

const Dot = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: gray;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: gray;

  &:hover,
  &.selected {
    width: 56px;
    height: 56px;
    background-color: #f4f5f9;
    color: gray;
    border: 1px solid gray;
    font-size: 20px;
    transition: width 0.3s ease, height 0.3s ease, background-color 0.2s ease 0.2s, border 0.3s ease 0.3s,
    font-size 0.3s ease 0.3s;
  }

  span {
    transition: transform 0.5s ease;
  }

  &.selected span {
    transform: rotate(360deg);
    font-size: 20px;
  }
`;

const DotContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 24.5%;
  left: 13.5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  user-select: none;
  -webkit-user-select: none; /* Для Safari */
  -moz-user-select: none; /* Для Firefox */
  -ms-user-select: none;
`;

const PageNumber = styled.div`
  font-family: PT Sans, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #42567a;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #c7cdd9;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f4f5f9;
  }
`;


const DotNumber = styled.span`
  opacity: 0;
  font-size: 20px;
  color: gray;
  transition: opacity 0.3s ease, transform 0.5s ease;

  .selected & {
    opacity: 1;
  }

  ${Dot}:hover & {
    opacity: 1;
  }
`;

const EventsContainer = styled.div`
  width: 80vw;
  background: transparent;
  padding-left: 3.5%;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  left: 10%;
  bottom: 7.5%;
  user-select: none;
  -webkit-user-select: none; /* Для Safari */
  -moz-user-select: none; /* Для Firefox */
  -ms-user-select: none;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  display: flex;

  @media (max-width: 768px) {
    .swiper-slide {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .swiper-slide-next {
      opacity: 0.6;
      transform: scale(0.95);
    }
  }

  .swiper-button-next, .swiper-button-prev {
    border-radius: 50%;
    border: 1px solid #c7cdd9;
    color: #3877EE;
    z-index: 10;
  }

  .swiper-pagination-bullet-active {
    background: #3877EE;
  }
`;

const EventSlide = styled(SwiperSlide)`
  background: transparent;
  text-align: left;
  display: flex;
  flex-direction: column;
  width: max-content;
`;

const EventText = styled.p`
  font-family: PT Sans, sans-serif;
  font-weight: 400;
  font-size: clamp(14px, 1.8vw, 18px);
  line-height: clamp(20px, 2.2vw, 28px);
  letter-spacing: 0;
  color: #42567A;
  margin: 0;
`;


const EventHeader = styled.h1`
  font-family: Bebas Neue, sans-serif;
  font-weight: 400;
  font-size: clamp(18px, 3vw, 25px);
  line-height: clamp(22px, 3.5vw, 34px);
  letter-spacing: 0;
  color: #3877EE;
`;

interface eventData {
    year: number;
    text: string;
}

interface DotData {
    label: string;
    yearLeft: string;
    yearRight: string;
    events: eventData[];
}


interface YearComponentProps {
    dotsData: DotData[];
}


const YearComponent = ({dotsData}: YearComponentProps) => {
    const circleRef = useRef<HTMLDivElement>(null);
    const dotsWrapperRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const [radius, setRadius] = useState(0);
    const [selectedDot, setSelectedDot] = useState<number>(0);
    const [dotNumberAngle, setDotNumberAngle] = useState(0);
    const [currentAngle, setCurrentAngle] = useState(0);
    const [labelPosition, setLabelPosition] = useState({x: 0, y: 0});
    const [isLabelVisible, setIsLabelVisible] = useState(true);
    const yearRef = useRef<HTMLHeadingElement | null>(null);
    const [animatedYearLeft, setAnimatedYearLeft] = useState<number>(parseInt(dotsData[0].yearLeft));
    const [animatedYearRight, setAnimatedYearRight] = useState<number>(parseInt(dotsData[0].yearRight));
    const animatedYearLeftRef = useRef({value: animatedYearLeft});
    const animatedYearRightRef = useRef({value: animatedYearRight});


    const numDots = dotsData.length;
    const updateRadius = useCallback(() => {
        if (circleRef.current) {
            setRadius(circleRef.current.clientWidth / 2);
        }
    }, []);

    const angleStep = 360 / numDots;

    useEffect(() => {
        updateRadius();
        window.addEventListener("resize", updateRadius);
        return () => window.removeEventListener("resize", updateRadius);
    }, [updateRadius]);

    useEffect(() => {
        if (radius > 0) {
            const angle = (-Math.PI / 3);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            setLabelPosition({x, y});
        }
    }, [radius, numDots]);

    const handleClick = (index: number, angle: number, event?: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }


        const targetYearLeft = parseInt(dotsData[index].yearLeft);
        const targetYearRight = parseInt(dotsData[index].yearRight);
        gsap.to(animatedYearLeftRef.current, {
            value: targetYearLeft,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => setAnimatedYearLeft(Math.round(animatedYearLeftRef.current.value))
        });

        gsap.to(animatedYearRightRef.current, {
            value: targetYearRight,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => setAnimatedYearRight(Math.round(animatedYearRightRef.current.value))
        });


        setIsLabelVisible(false);

        const targetAngle = -(angle * 180) / Math.PI - 60;
        let deltaAngle = targetAngle - currentAngle;
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;

        const newAngle = currentAngle + deltaAngle;
        setDotNumberAngle(-newAngle);
        setCurrentAngle(newAngle);
        setSelectedDot(index);

        const labelAngle = angle + Math.PI / 2;
        const labelX = Math.cos(labelAngle) * (radius + 20);
        const labelY = Math.sin(labelAngle) * (radius + 20);
        setLabelPosition({x: labelX, y: labelY});
        gsap.killTweensOf([dotsWrapperRef.current, labelRef.current]);

        gsap.to(dotsWrapperRef.current, {
            rotation: newAngle,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                setIsLabelVisible(true);
                if (labelRef.current) {
                    gsap.fromTo(
                        labelRef.current,
                        {opacity: 0, scale: 0.99},
                        {opacity: 1, scale: 1, duration: 0.1, ease: "power2.in"}
                    );
                }
            },
        });


    };

    const handlePrev = () => {
        let newIndex = selectedDot - 1;
        if (newIndex < 0) newIndex = numDots - 1;
        const angle = (-Math.PI / 3) + (newIndex * angleStep * Math.PI) / 180;
        handleClick(newIndex, angle);
    };

    const handleNext = () => {
        let newIndex = (selectedDot + 1) % numDots;
        const angle = (-Math.PI / 3) + (newIndex * angleStep * Math.PI) / 180;
        handleClick(newIndex, angle);
    };

    return (
        <AppWrapper>
            <AppBody>
                <div style={{overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
                    <AppTitle>Исторические <br/> даты</AppTitle>
                    <Lines></Lines>
                    <Circle ref={circleRef}>
                        <YearContainer ref={yearRef}>
                    <span style={{color: "#3877EE", marginRight: "10%", opacity: '80%'}}>
                        {animatedYearLeft}
                    </span>
                            <span style={{color: "#EF5DA8", marginLeft: "0", opacity: '80%'}}>
                        {animatedYearRight}
                    </span>
                        </YearContainer>
                        <DotsWrapper ref={dotsWrapperRef}>
                            {dotsData.map((dot, i) => {
                                const angle = (-Math.PI / 3) + (i * angleStep * Math.PI) / 180;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;

                                return (
                                    <Dot
                                        key={i}
                                        className={selectedDot === i ? "selected" : ""}
                                        style={{transform: `translate(${x}px, ${y}px)`}}
                                        onClick={(event) => handleClick(i, angle, event)}
                                    >
                                        <DotContent style={{transform: `rotate(${dotNumberAngle}deg)`}}>
                                            <DotNumber>{i + 1}</DotNumber>
                                            {
                                                ((selectedDot === i)) && (
                                                    <DotLabel ref={labelRef} style={{
                                                        opacity: isLabelVisible ? 1 : 0,
                                                        display: isLabelVisible ? 'flex' : 'none'
                                                    }}>
                                                        {dot.label}
                                                    </DotLabel>
                                                )
                                            }
                                        </DotContent>
                                    </Dot>
                                );
                            })}
                        </DotsWrapper>
                    </Circle>
                    <PaginationWrapper>
                        <PageNumber>{`${selectedDot + 1}/${numDots}`}</PageNumber>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                            <Button onClick={handlePrev}>{"<"}</Button>
                            <Button onClick={handleNext}>{">"}</Button>
                        </div>
                    </PaginationWrapper>
                    <EventsContainer>
                        <StyledSwiper
                            slidesPerView={"auto"}
                            spaceBetween={40}
                            breakpoints={{
                                768: {
                                    slidesPerView: 3, // После 768px показываем 2 слайда
                                },
                            }}
                        >
                            {dotsData[selectedDot].events.map((event, index) => (
                                <EventSlide key={index}>
                                    <EventHeader>{event.year}</EventHeader>
                                    <EventText>{event.text}</EventText>
                                </EventSlide>
                            ))}
                        </StyledSwiper>
                    </EventsContainer>
                </div>
            </AppBody>
        </AppWrapper>
    );
};

export default YearComponent;