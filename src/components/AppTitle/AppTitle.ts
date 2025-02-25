import styled from "styled-components";

export const AppTitle = styled.h1`
  color: #42567A;
  height: max-content;
  transform: translateY(10vw);
  top: 20%;
  font-family: PT Sans, sans-serif;
  font-weight: 700;
  font-size: clamp(16px, 43px, 3vw);
  line-height: 1.2em;
  letter-spacing: 0;
  border-left: 5px solid;
  border-image: linear-gradient(180deg, #3877EE -5%, #EF5DA8 85%) 1;
  padding-left: 3.5%;
  user-select: none;
  -webkit-user-select: none; /* Для Safari */
  -moz-user-select: none;    /* Для Firefox */
  -ms-user-select: none;
  @media (max-width: 768px) {
    border: none;
    padding: 0;
    position: absolute;
    top: 5%;
    left: 10%;
  }
`;
