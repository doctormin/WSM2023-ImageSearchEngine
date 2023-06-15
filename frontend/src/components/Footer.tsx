import { Container } from 'react-bootstrap'
export function Footer() {
  return (
    <footer className="text-muted py-5 bg-dark">
      <Container>
        <p className="float-end mb-1"><a href="#">Back to top</a></p>
        <p className="mb-1 text-white">WSM Search Engine &copy; Yimin Zhao</p>
      </Container>
    </footer>
  );
}