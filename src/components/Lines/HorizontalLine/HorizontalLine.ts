import styled from "styled-components";

export const HorizontalLine = styled.div`
  position: relative;
  top: 50%;
  transform: scaleX(2);
  left: -10%;
  width: 100vw;
  height: 1px;
  background: #C7CDD9;
  @media (max-width: 768px) {
    transform: scaleX(3);
  }
`;