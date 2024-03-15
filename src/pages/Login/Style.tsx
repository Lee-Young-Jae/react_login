import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  width: 300px;
  margin: 0 auto;

  label {
  }

  input {
    color: #fff;
    background-color: #000;
    border: none;
    border-bottom: 2px solid #fff;
    padding: 0.5rem;

    &:focus {
      outline: none;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #000 inset;
      -webkit-text-fill-color: #fff;
    }
  }

  button {
    padding: 0.5rem;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;

  button {
    width: 100%;
  }
`;

const Link = styled(RouterLink)`
  padding: 0.5rem;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #000;
  width: 100%;
`;

const S = { Form, InputField, Buttons, Link };

export default S;
