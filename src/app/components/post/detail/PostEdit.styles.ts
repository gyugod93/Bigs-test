import styled from "styled-components";

export const EditForm = styled.form`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #2d2d2d;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    margin: 1.5rem 1rem;
    padding: 1.5rem;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e5e7eb;
  margin-bottom: 0.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    flex: none;
    min-width: 100px;
  }
`;
