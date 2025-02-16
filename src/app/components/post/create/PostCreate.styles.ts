import styled from "styled-components";

export const PostCreateContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto; // 상하 여백 2rem으로 수정
  padding: 1.5rem;
  background-color: #2d2d2d;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 1.5rem 1rem; // 모바일에서도 상하 여백 유지
    padding: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;

  button {
    width: auto;
    min-width: 120px;
  }
`;
