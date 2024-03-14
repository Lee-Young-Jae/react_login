import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: 0 auto;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 1.2rem;
  }

  input {
    padding: 0.5rem;
    font-size: 1.2rem;
    border-radius: 5px;
  }

  button {
    padding: 0.5rem;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

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

const S = {
  Form,
  ImageBox,
  ImageSection,
};

export default S;
