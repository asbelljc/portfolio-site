import PageWrapper from '../components/PageWrapper';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import { ScreenContext } from '../App';
import src from '../assets/about/headshot.jpg';
import { Helmet } from 'react-helmet-async';

const Wrapper = styled(PageWrapper)`
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: ${({ screen }) =>
    screen === 'wide' ? 'row-reverse' : 'column'};
  align-items: ${({ screen }) => (screen === 'wide' ? 'flex-start' : 'center')};
  gap: 2.4rem;
`;

const Heading = styled.h1`
  font-size: ${({ screen }) => (screen === 'narrow' ? '3.6rem' : '4.2rem')};
  align-self: ${({ screen }) => (screen === 'wide' ? 'flex-start' : 'center')};
  padding: 0.75em 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.6rem;

  a {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: none;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryGlow};
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 25rem));
    grid-template-rows: auto;
    row-gap: 0.3rem;
    list-style: none;
  }

  li {
    position: relative;
    padding-left: 2.2rem;
    font-family: 'Roboto Mono', 'Courier New', Courier, monospace;
    font-size: 1.3rem;

    ::before {
      content: '▹';
      position: absolute;
      left: 0;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Headshot = styled.div`
  position: relative;
  max-width: 43.2rem;
  border-radius: 100rem;

  img {
    display: block;
    object-fit: cover;
    object-position: top;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 100rem;
    filter: saturate(0) contrast(1.1);
    transition: filter 250ms;
  }

  &::after {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 100rem;
    border: 5px solid ${({ theme }) => theme.colors.primary};
    transform: scale(1);
    transition: transform 250ms;
  }

  &:hover {
    img {
      filter: none;
    }

    &::after {
      transform: scale(1.1);
    }
  }

  &:empty {
    display: none;
  }
`;

function About() {
  const { screen } = useContext(ScreenContext);

  return (
    <>
      <Helmet>
        <title>About | Jonathan Asbell</title>
        <meta
          name="description"
          content="Learn more about Jonathan Asbell, full stack web developer. Technologies of interest include JavaScript, React, Express, and MongoDB."
        />
        <link rel="canonical" href="/about" />
      </Helmet>
      <Wrapper>
        <Heading screen={screen}>
          <span>{'{ '}</span>
          About
          <span>{' }'}</span>
        </Heading>
        <Content screen={screen}>
          <Headshot screen={screen}>
            <img
              src={src}
              alt="The author's portrait. A young man smiling at the camera."
            />
          </Headshot>
          <Body>
            <p>
              Hi! My name is Jonathan and I'm a software engineer who likes to
              build things for the web. I discovered a passion for programming
              in 2020 when I learned some Python as part of a 3D modeling
              course. I had long been seeking a field that was both creatively
              and analytically fulfilling, and as I learned to code I knew that
              my search was reaching an exciting conclusion. I soon dedicated
              myself to learning software development full-time.
            </p>
            <p>
              Fast-forward to today, and I am proud to have cultivated a deep
              and fast-growing knowledge of modern web development. I've had the
              privilege of designing and developing websites for a digital
              marketing agency, and I'm eager to see where my career takes me
              next!
            </p>
            <p>Here are some technologies I've been working with recently:</p>
            <ul>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Express</li>
              <li>MongoDB</li>
              <li>Styled Components</li>
              <li>React Router</li>
              <li>React Transition Group</li>
              <li>Framer</li>
              <li>GSAP</li>
              <li>Passport</li>
              <li>Python</li>
              <li>WordPress</li>
            </ul>
            <p>
              You'll see all but a few of these in action as you explore my
              site. As an example, you'll notice the drop-down menu gives you an
              opportunity to sign up and log in. This helps me keep track of
              comments on my <Link to="/blog">blog</Link> and limit access to my
              content management system, but it serves as a proof-of-concept
              more than anything else. No sensitive data is stored and emails
              will never be shared with anyone, so have fun with it! And if
              you'd like a demo of the CMS and API, please don't hesitate to{' '}
              <Link to="/contact">reach out</Link>.
            </p>
            <p>
              Learn more about this project and others in my{' '}
              <Link to="/portfolio">portfolio</Link>!
            </p>
          </Body>
        </Content>
      </Wrapper>
    </>
  );
}

export default About;
