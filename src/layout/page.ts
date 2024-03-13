import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  transition: ${({ theme }) => theme.transition.default};
  display: flex;
  flex-direction: column;
`;

export const PageContainer = styled.main`
  flex-grow: 1;
  padding-inline: ${({ theme }) => theme.size.pageInlinePadding};
`;

export const PageMainText = styled.div`
  margin-top: 5rem;
  font-size: 32px;
  text-align: center;
`;
