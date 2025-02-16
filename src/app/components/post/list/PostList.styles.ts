import styled from "styled-components";

export const PostListContainer = styled.ul`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PostItem = styled.li`
  padding: 1rem 1.5rem;
  background-color: #2d2d2d;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #404040;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  &:hover {
    background-color: #333333;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const PostTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  flex: 1;
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #9ca3af;
  font-size: 0.875rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
  }
`;

export const MetaItem = styled.span`
  color: #6b7280;
`;

export const MetaValue = styled.span`
  color: #9ca3af;
  margin-left: 0.25rem;
`;
