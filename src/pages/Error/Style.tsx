import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;
  color: #fff;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
`;

const ErrorCodeSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ErrorCode = styled.h1`
  font-size: 4rem;
  display: inline-block;
`;

const ErrorMessage = styled.h2`
  font-size: 1.4rem;
`;

const shake = keyframes`
0% {
  opacity: 0;
  transform: rotateZ(0);
}

75% {
  opacity: 1;
  top: -3rem;
  transform: rotateZ(-40deg);
} 
100% {
  opacity: 1;
  top: 0rem;
  transform: rotateZ(-10deg);
} 
`;

const Emoji = styled.div`
  position: relative;
  &:before {
    content: "😨";
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 0;
    width: 4rem;
    left: calc(50% - 3.25rem);
    font-size: 3.2em;
    background: linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%);
    text-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    transition: 1s;
    animation: 2s forwards ${shake};
  }
`;

const HomeButton = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border: 1px solid #fff;
  border-radius: 0.5rem;
  background: transparent;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
`;

const S = {
  Container,
  ErrorCode,
  ErrorMessage,
  Emoji,
  HomeButton,
  Content,
  ErrorCodeSection,
};

export default S;
