import styled from "styled-components";

export const SectionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 2rem 0 1.5rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 0.75rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #e5e7eb;
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #404040;
  border-radius: 0.375rem;
  background-color: #333333;
  color: #ffffff;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #404040;
  }

  option {
    background-color: #333333;
    color: #ffffff;
  }
`;
