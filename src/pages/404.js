import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Wrapper = styled(PageWrapper)`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 0;
`;

const Heading = styled.h1`
  font-size: 9.6rem;
  padding: 0 0 0.5em 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.6rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-size: 1.4rem;
    transition: none;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryGlow};
    }
  }
`;

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Not Found | Jonathan Asbell</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Wrapper>
        <Heading>
          <span>{'{ '}</span>
          {'?'}
          <span>{' }'}</span>
        </Heading>
        <Text>
          <span>We can't seem to find that page. Sorry...</span>
          <Link to="/">Back to home</Link>
        </Text>
      </Wrapper>
    </>
  );
}
