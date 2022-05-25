import { useEffect, useState, useContext } from 'react';
import { ScreenContext } from '../../App';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
import prism from './style/prism';
// import '../../style/prismjs.css';

const Wrapper = styled(PageWrapper)``;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.2rem 0 3.6rem 0;

  h1 {
    font-size: ${({ screen }) => (screen === 'narrow' ? '3.6rem' : '4.2rem')};
    text-align: left;
    padding: 1.2rem 0 1.8rem 0;
  }

  span {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.inactive};
  }
`;

const Tags = styled.div`
  font-family: 'Roboto Mono';
  font-size: 1.2rem;
  display: flex;
  gap: 0.3rem;

  a {
    text-decoration: none;
    border-radius: 0.4rem;
    padding: 0.5rem;
    color: ${({ theme }) => theme.colors.body};
    background: ${({ theme }) => theme.colors.inactive};
    will-change: background;
    transition: background 200ms;

    &:hover {
      color: ${({ theme }) => theme.colors.body};
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Body = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 1.2em 0 0.6em 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
  /* ...change this to .pre-header or similar for final product... */
  .blog-post-body-code-snippet-header {
    background-color: ${({ theme }) => theme.colors.preHeaderBg};
    border-radius: 0.4rem 0.4rem 0 0;
    font-size: 1.3rem;
    padding: 1rem;
    cursor: default;

    * {
      color: ${({ theme }) => theme.colors.preHeader};
    }
  }

  blockquote {
    padding: 32px;
    margin-top: 0px;
    color: rgba(0, 0, 0, 0.8);
    border: none;
    background: ${({ theme }) => theme.colors.primaryTintHeavy};
    border-radius: 0.4rem;
    line-height: 1;

    * {
      font-size: 2rem;
      font-style: italic;
      padding: 0;
    }
  }

  ${prism}
`;

export default function Post() {
  const [post, setPost] = useState(null);

  const { screen } = useContext(ScreenContext);

  const navigate = useNavigate();

  const { post: slug } = useParams();

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(`/posts/${slug}`);

        const post = {
          ...data.post,
          date_time: DateTime.fromISO(data.post.date_time).toLocaleString(
            DateTime.DATETIME_MED
          ),
        };

        setPost(post);
      } catch (error) {
        if (404 !== error.response.status) {
          navigate('/error');
        } else {
          navigate('/404');
        }
      }
    }

    getPost();
  }, [slug, navigate]);

  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

  return (
    <>
      {post && (
        <Wrapper>
          <Heading screen={screen}>
            <span>{post.date_time}</span>
            <h1>{post.title}</h1>
            <Tags>
              {post.tags.map((tag) => (
                <Link to="#" key={tag}>
                  {tag}
                </Link>
              ))}
            </Tags>
          </Heading>
          <Body dangerouslySetInnerHTML={{ __html: post.markdown }} />
        </Wrapper>
      )}
    </>
  );
}
