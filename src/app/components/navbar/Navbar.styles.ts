import styled from "styled-components";

export const NavContainer = styled.nav`
  background-color: #1a1a1a;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e5e7eb;

  span {
    font-size: 0.875rem;
  }
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc2626;
  color: white;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b91c1c;
  }
`;

export const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4b5563;
  color: white;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #374151;
  }
`;
