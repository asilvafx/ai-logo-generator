import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

export const FormWrapper = styled.div`
  display: grid;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Select = styled.select`
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical;
`;

export const Button = styled.button`
  background: #000;
  color: #fff;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 1000;
  padding: 2rem;
`;

export const OverlayImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  margin-bottom: 2rem;
  border-radius: 10px;
`;

export const OverlayButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Label = styled.label`
  font-weight: 500;
`;
