import React from 'react';
import styled from 'styled-components';

export default class Footer extends React.Component {
  render() {
    return (
      <FooterWrapper>
        <FooterContent>
          <a href={'mailto:kftlfd@ex.ua'}>kftlfd@ex.ua</a>
          &bull;
          <a href={'https://github.com/kftlfd/'}>GitHub</a>
        </FooterContent>
      </FooterWrapper>
    );
  }
}

const FooterWrapper = styled.footer`
  padding-inline: ${({ theme }) => theme.size.pageInlinePadding};
`;

const FooterContent = styled.div`
  padding-block: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: ${({ theme }) => theme.color.text};
  border-top: ${({ theme }) => `1px solid ${theme.color.bgHover}`};
  transition: ${({ theme }) => theme.transition.default};

  & a {
    color: inherit;
    text-decoration: none;
  }
  & a:hover {
    text-decoration: underline;
  }
`;
