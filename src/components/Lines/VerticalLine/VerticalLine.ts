import styled from "styled-components";

export const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background: #C7CDD9;
  @media (max-width: 768px) {
    display: none;
  }
`;