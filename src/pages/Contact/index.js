import { useContext, useRef, useState } from 'react';
import { ScreenContext } from '../../App';
import styled, { css } from 'styled-components';
import validator from 'validator';
import emailjs from '@emailjs/browser';
import useResizeObserver from '../../hooks/useResizeObserver';
import PageWrapper from '../../components/PageWrapper';
import Social from './Social';
import Button from '../../components/Button';
import ErrorMessages from './ErrorMessages';

const Wrapper = styled(PageWrapper)``;

const Container = styled.div`
  display: flex;
  flex-direction: ${({ screen }) => (screen === 'wide' ? 'row' : 'column')};
  align-items: ${({ screen }) => (screen === 'medium' ? 'center' : 'auto')};
`;

const Description = styled.div`
  position: ${({ screen }) => (screen === 'wide' ? 'fixed' : 'static')};
  align-self: ${({ screen }) => (screen === 'wide' ? 'flex-start' : 'auto')};
  display: flex;
  flex-direction: column;
  max-width: ${({ screen, maxWidth }) =>
    screen === 'wide'
      ? `${maxWidth}px`
      : screen === 'medium'
      ? '48rem'
      : 'none'};
  padding-right: ${({ screen }) => (screen === 'wide' ? '2.4rem' : 0)};
`;

const Heading = styled.h1`
  font-size: ${({ screen }) => (screen === 'narrow' ? '3.6rem' : '4.2rem')};
  align-self: ${({ screen }) => (screen === 'wide' ? 'flex-start' : 'center')};
  padding: 0.75em 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Nunito Sans';
  font-size: 1.6rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: none;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryGlow};
    }
  }
`;

const Form = styled.form`
  margin-left: ${({ screen }) => (screen === 'wide' ? 'auto' : 'none')};
  align-self: ${({ screen }) => (screen === 'wide' ? 'flex-end' : 'center')};
  width: ${({ screen }) => (screen === 'wide' ? '55%' : '100%')};
  max-width: ${({ screen }) => (screen === 'medium' ? '48rem' : 'none')};
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: ${({ screen, paddingTop }) =>
    screen === 'wide' ? paddingTop : 16}px;
  font-size: 1.6rem;
`;

const NameInput = styled.input`
  min-height: 3.6rem;
  flex-grow: 1;
  min-width: 0; /* this lets it flex-shrink properly */
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) =>
    theme.dark ? 'rgba(0, 0, 0, 0.16)' : 'rgba(0, 0, 0, 0.08)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 1.4rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }

  ${({ error }) =>
    error &&
    css`
      outline: 1px solid ${({ theme }) => theme.colors.error};
    `};
`;

const EmailInput = styled(NameInput)``;

const Message = styled.textarea`
  resize: none;
  flex-grow: 1;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) =>
    theme.dark ? 'rgba(0, 0, 0, 0.16)' : 'rgba(0, 0, 0, 0.08)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 1.4rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }

  ${({ error }) =>
    error &&
    css`
      outline: 1px solid ${({ theme }) => theme.colors.error};
    `};
`;

const SuccessMessage = styled.div`
  font-size: 1.4rem;
  font-style: italic;
  text-align: center;
  align-self: center;
  color: ${({ theme }) => theme.colors.inactive};
`;

export default function Contact() {
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const { screen } = useContext(ScreenContext);

  const form = useRef(null);

  const headingRef = useRef(null);
  const { height: headingHeight } = useResizeObserver(headingRef);

  const containerRef = useRef(null);
  const { width: containerWidth } = useResizeObserver(containerRef);

  const validateName = async () => {
    // if there was a request error before, user no longer needs to see it
    setSubmissionError(false);

    if (!name.trim()) {
      console.log('nameError');
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const validateEmail = async () => {
    setSubmissionError(false);

    if (!validator.isEmail(email)) {
      console.log('emailError');

      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validateMessage = async () => {
    setSubmissionError(false);

    if (!message.trim()) {
      console.log('messageError');

      setMessageError(true);
    } else {
      setMessageError(false);
    }
  };

  const validateThen = (e, callback) => {
    e.preventDefault();

    setSubmissionError(false);

    validateName();
    validateEmail();
    validateMessage();

    if (!nameError && !emailError && !messageError) {
      callback();
    }
  };

  const submit = () => {
    setSubmissionError(false);
    try {
      emailjs.sendForm(
        process.env.REACT_APP_EMAIL_SVC_ID,
        process.env.REACT_APP_EMAIL_TEMP_ID,
        form.current,
        process.env.REACT_APP_EMAIL_PUBLIC_KEY
      );
      setSuccess(true);
    } catch (error) {
      setSubmissionError(true);
    }
  };

  return (
    <Wrapper>
      <Container screen={screen} ref={containerRef}>
        <Description screen={screen} maxWidth={containerWidth * 0.45}>
          <Heading screen={screen} ref={headingRef}>
            <span>{'{ '}</span>
            Contact
            <span>{' }'}</span>
          </Heading>
          <Text>
            <p>
              I'm seeking new opportunities! If you'd like to work with me, have
              a question, or just want to say hello, the door is always open.
            </p>
          </Text>
          {screen === 'wide' && <Social />}
        </Description>
        <Form ref={form} screen={screen} paddingTop={headingHeight}>
          {success ? (
            <SuccessMessage>
              Thanks for reaching out - <br />I will message you back as soon as
              I can!
            </SuccessMessage>
          ) : (
            <>
              <NameInput
                name="from_name"
                error={nameError}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateName}
              />
              <EmailInput
                name="reply_to"
                error={emailError}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              <Message
                name="message"
                error={messageError}
                placeholder="Message"
                rows="14"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={validateMessage}
              />
              <Button
                solid
                type="button"
                onClick={(e) => validateThen(e, submit)}
              >
                Submit
              </Button>
              <ErrorMessages
                nameError={nameError}
                emailError={emailError}
                messageError={messageError}
                submissionError={submissionError}
              />
            </>
          )}
        </Form>
        {screen !== 'wide' && <Social />}
      </Container>
    </Wrapper>
  );
}
