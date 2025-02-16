import styled from "styled-components";

export const PostContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #2d2d2d;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 1.5rem 1rem;
    padding: 1.5rem;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #404040;
`;

export const PostTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #ffffff;
  flex: 1;
  margin-right: 1rem;
`;

export const PostContent = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  white-space: pre-wrap;
  color: #e5e7eb;
  line-height: 1.8;
  background-color: #333333;
  border-radius: 0.5rem;
  min-height: 200px;
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #9ca3af;
  border-top: 1px solid #404040;
  padding-top: 1rem;
  margin-top: 1rem;
`;

export const MetaItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  span:first-child {
    color: #6b7280;
    min-width: 70px;
  }

  span:last-child {
    color: #e5e7eb;
  }
`;
