import styled from "styled-components";

export const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  padding: 1rem;
`;

export const RegisterBox = styled.div`
  max-width: 28rem;
  width: 90%;
  padding: 2rem;
  background: #2d2d2d;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: 640px) {
    width: 95%;
    padding: 1.5rem;
  }
`;
