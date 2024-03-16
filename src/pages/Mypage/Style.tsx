import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;

  label {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
  }
  input {
    display: none;
  }
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  border-radius: 5px;

  border: 1px solid #fff;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    border: none;
    background-color: #000;
    color: #fff;
    border-bottom: 1px solid #fff;
    text-align: center;
    width: 6rem;
  }
`;

const Error = styled.p`
  color: #ff5d5d;
  font-size: 0.7rem;
  margin-top: 5px;
  border-radius: 5px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #fff;
    cursor: pointer;
    width: 100px;
  }
`;

const S = {
  Container,
  ImageSection,
  Buttons,
  Form,
  Error,
  ImageBox,
};

export default S;
