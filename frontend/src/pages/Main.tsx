import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { ImgCard } from "../components/ImgCard";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { RouteComponentProps } from "react-router-dom";
import { useImgs } from "../services/img";

export function Main(props: RouteComponentProps<{keyword: string;}>) {
  const keyword = props.match.params.keyword;
  return (
    <>
      <Header />
      <Body keyword = {keyword} />
      <Footer />
    </>
  );
}

function Body(props: {keyword: string;}) {
  const { imgs } = useImgs(props.keyword);
  var cards;
  console.log("Main page searching... imgs -> ", imgs)
  console.log("Main page searching... keyword -> ", props.keyword);
  cards =
    imgs === undefined
      ? () => <div />
      : Object.values(imgs).map((i) => (
          <ImgCard id={i.id.toString()} acc={i.acc} image={i.image} />
        ));
  return (
    <main>
      <div className="section-content section-content-evaluate-symptoms">
        <span className="covid-19-app-copy">
          <a
            className="icon icon-after icon-chevronright"
            href="https://covid19.who.int"
            target="_self"
            data-analytics-title="Evaluate covid19 symptoms"
          >
          </a>
        </span>
      </div>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage: `url("./asset/top-banner.png")`,
          backgroundSize: "cover",
        }}
      >
        <Container fluid className="text-center">
          <Row className="py-lg-5">
            <Col lg={6} md={8} className="mx-auto">
              <h1 className="text-white">Search the Image You Like</h1>
              <p className="lead text-muted">
                Image search engine based on keywords
              </p>
              <ButtonGroup className="gap-2">
                <Button variant="primary" className="my-2">
                  Add Image
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="album py-5">
        <Container>
          <Row
            className="row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3"
            id="card_ground"
          >
            {cards}
          </Row>
        </Container>
      </div>
    </main>
  );
}
