import styled from "styled-components";

// Form 관련 공통 컴포넌트
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #404040;
  border-radius: 0.375rem;
  background-color: #333333;
  color: #ffffff;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #404040;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.75rem 1rem;
  border: 1px solid #404040;
  border-radius: 0.375rem;
  background-color: #333333;
  color: #ffffff;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #404040;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #404040;
  border-radius: 0.375rem;
  background-color: #333333;
  color: #ffffff;
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

// 버튼 관련 공통 컴포넌트
export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger";
}>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: #3b82f6;
          color: white;
          &:hover:not(:disabled) {
            background-color: #2563eb;
          }
        `;
      case "secondary":
        return `
          background-color: #4b5563;
          color: #e5e7eb;
          &:hover:not(:disabled) {
            background-color: #6b7280;
          }
        `;
      case "danger":
        return `
          background-color: #dc2626;
          color: white;
          &:hover:not(:disabled) {
            background-color: #b91c1c;
          }
        `;
      default:
        return `
          background-color: #3b82f6;
          color: white;
          &:hover:not(:disabled) {
            background-color: #2563eb;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 에러 메시지 관련 공통 컴포넌트
export const ErrorMessage = styled.p`
  color: #f87171;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const ErrorAlert = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  background-color: #471818;
  border: 1px solid #dc2626;
  border-radius: 0.375rem;
  color: #fecaca;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.813rem;
  }
`;

// 타이틀 관련 공통 컴포넌트
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

export const SuccessAlert = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  background-color: #064e3b;
  border: 1px solid #059669;
  border-radius: 0.375rem;
  color: #a7f3d0;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.813rem;
  }
`;
