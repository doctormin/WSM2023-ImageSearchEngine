import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function ImgCard(props: {
    id: string; 
    acc: string;
    image: string; 
  }) {
  // console.log("ImgCard props -> ", props);
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Link as={Link} to={`/imgs/${props.id}`}>
          <Card.Img variant="top" src={process.env.PUBLIC_URL + props.image}/>
        </Card.Link>
        <Card.Footer className="bg-transparent border-dark">
          <div className="card-title">{props.id}</div>
          <div className="card-text text-danger fw-bold">{props.acc}</div>
        </Card.Footer>
      </Card.Body>
      
    </Card>
  );
}
