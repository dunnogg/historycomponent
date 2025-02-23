import styled from "styled-components";

export const AppBody = styled.div`
  width: 80vw;
  height: 100%;
  border-left: 1px solid #C7CDD9;
  border-right: 1px solid #C7CDD9;
  display: flex;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  @media (max-width: 768px) {
    border: none;
  }
`;