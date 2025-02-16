import styled from "styled-components";

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;

  button {
    padding: 0.35rem 0.75rem;
    font-size: 0.875rem;
    min-width: 60px;
  }

  @media (max-width: 640px) {
    button {
      padding: 0.25rem 0.5rem;
      min-width: 50px;
    }
  }
`;
