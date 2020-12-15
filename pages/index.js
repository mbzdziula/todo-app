import { Container } from '@material-ui/core';
import React from 'react';
import App from '../src/components/App';

export default function Home() {
  return (
    <Container style={{ marginTop: 10 }}>
      <App />
    </Container>
  );
}
