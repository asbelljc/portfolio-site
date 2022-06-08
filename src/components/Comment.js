import axios from 'axios';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { SessionContext } from '../App';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0.5rem 0;
  background: ${({ theme }) => theme.colors.inactiveTint};

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0 0 0.3rem 0;
    font-size: 1.8rem;
  }

  span {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.inactive};
  }

  p {
    padding: 0.5rem 0 0 0;
  }

  textarea {
    display: block;
    background: none;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    border-radius: 0.4rem;
    width: 100%;
    margin: 0.5rem 0 0 0;
    padding: 0.3rem;
    font-size: 1.6rem;
    resize: none;

    &:focus {
      outline: 0.1rem solid ${({ theme }) => theme.colors.primaryGlow};
    }
  }

  .loading {
    padding: 0.5rem 0 0 0;
    display: block;
    color: ${({ theme }) => theme.colors.inactive};
    font-style: italic;
  }

  .error {
    padding: 0.5rem 0 0 0;
    display: block;
    color: ${({ theme }) => theme.colors.error};
    font-style: italic;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.inactive};
  padding-top: 0.8rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    font-size: 1.1rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.inactive};
    transition: none;

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default function Comment({ id, post, username, dateTime, body }) {
  const [commentBody, setCommentBody] = useState(body);

  const [editing, setEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(false);

  const { session } = useContext(SessionContext);

  const canEdit =
    !!session && (username === session.username || session.status === 'admin');

  const startEditing = () => {
    setEditError(false);
    setEditing(true);
  };

  const cancelEditing = () => {
    setCommentBody(body);
    setEditing(false);
  };

  const submitEdit = async () => {
    setEditing(false);
    setEditLoading(true);

    try {
      await axios.put(
        `/posts/${post}/comments/${id}`,
        {
          body: commentBody,
          user: username,
          post,
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      setEditLoading(false);
      setEditError(false);
    } catch {
      setEditLoading(false);
      setEditError(true);
      setCommentBody(body);
    }
  };

  const deleteComment = async () => {
    // TODO
  };

  return (
    <Container>
      <h4>{username}</h4>
      <span>{dateTime}</span>
      {editing ? (
        <textarea
          autoFocus
          rows="8"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
      ) : !editLoading && !editError ? (
        <p>{commentBody}</p>
      ) : !editError ? (
        <span className="loading">Loading...</span>
      ) : (
        <span className="error">Something went wrong.</span>
      )}
      {canEdit && (
        <Controls>
          {editing ? (
            <>
              <button onClick={cancelEditing}>Cancel</button>
              {' | '}
              <button onClick={submitEdit}>Submit</button>
            </>
          ) : (
            <>
              <button onClick={startEditing}>Edit</button>
              {' | '}
              <button>Delete</button>
            </>
          )}
        </Controls>
      )}
    </Container>
  );
}