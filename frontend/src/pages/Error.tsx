import { Component } from 'react';

import { PageContainer, PageMainText } from '@/layout/page';

class ErrorPage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
    document.title = 'Error';
  }

  render() {
    return (
      <PageContainer>
        <PageMainText>Page not found</PageMainText>
      </PageContainer>
    );
  }
}

export default ErrorPage;
