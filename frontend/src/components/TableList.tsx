import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { UsersDict, useUsers, useUser } from "../services/auth";
import { ImgsDict, useImgs } from "../services/img";
import { useOrdersDetail, useOrders } from "../services/order";
import { parseTimestamp } from "../services/infra";

function BookRow(props: {
  id: string;
  image: string;
}) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.image}</td>
    </tr>
  );
}

function ImgsHeader() {
  return (
    <tr>
      <th className="border-0">id</th>
      <th className="border-0">name</th>
      <th className="border-0">type</th>
      <th className="border-0">author</th>
      <th className="border-0">price</th>
      <th className="border-0">inventory</th>
      <th className="border-0">isbn</th>
      <th className="border-0">image</th>
      <th className="border-0">description</th>
    </tr>
  );
}

function UserRow(props: {
  id: string,
  userName: string,
  password: string,
  userType: string,
}) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.userName}</td>
      <td>{props.password}</td>
      <td>{props.userType}</td>
    </tr>
  )
}

function UsersHeader() {
  return (
    <tr>
      <th className="border-0">user id</th>
      <th className="border-0">user name</th>
      <th className="border-0">password</th>
      <th className="border-0">user type</th>
    </tr>
  );
}

type bStatusT = {
  bookSum: string,
  bookTypes: string,
  bookMaxPrice: string,
  bookMinPrice: string,
}

type uStatusT = {
  userSum: string,
  adminSum: string
}

function BStatusRow(props: bStatusT) {
  return (
    <tr>
      <td>{props.bookSum}</td>
      <td>{props.bookTypes}</td>
      <td>{props.bookMaxPrice}</td>
      <td>{props.bookMinPrice}</td>
    </tr>
  )
}

function BStatusHeader() {
  return (
    <tr>
      <th className="border-0">Sum number of books</th>
      <th className="border-0">Number of types of books</th>
      <th className="border-0">Highest Price</th>
      <th className="border-0">Lowest Price</th>
    </tr>
  )
}

function UStatusRow(props: uStatusT) {
  return (
    <tr>
      <td>{props.userSum}</td>
      <td>{props.adminSum}</td>
    </tr>
  )
}

function UsersStatusHeader() {
  return (
    <tr>
      <th className="border-0">Sum of users</th>
      <th className="border-0">Sum of admins</th>
    </tr>
  )
}

function getBStatus(books: ImgsDict | undefined): bStatusT {
  if (books === undefined) {
    return {
      bookSum: '',
      bookTypes: '',
      bookMaxPrice: '',
      bookMinPrice: ''
    }
  }
  let sum = Object.values(books).length;
  let maxPrice = 0;
  let minPrice = Infinity;
  let typeDict: Record<string, number> = {};

  let types = Object.values(typeDict).length;
  return {
    bookSum: sum.toString(),
    bookTypes: types.toString(),
    bookMaxPrice: (maxPrice / 10).toFixed(2).toString(),
    bookMinPrice: (minPrice / 10).toFixed(2).toString()
  }
}

function getUStatus(users: UsersDict | undefined): uStatusT {
  if (users === undefined) {
    return {
      userSum: '',
      adminSum: '',
    }
  }
  let sum = Object.values(users).length;
  let asum = 0;
  for (let i of Object.values(users)) {
    if (i.userType === 1)
      asum += 1;
  }
  return {
    userSum: sum.toString(),
    adminSum: asum.toString()
  }
}

function OrdersHeader() {
  return (
    <tr>
      <th className="border-0">Order Id</th>
      <th className="border-0">User Id</th>
      <th className="border-0">Date Time</th>
      <th className="border-0">Order Price</th>
    </tr>
  );
}

function OrderRow(props: {
  orderId: number,
  timestamp: string,
  orderPrice: number,
  userId: number,
}) {
  return (
    <tr>
      <td>{props.orderId}</td>
      <td>{props.userId}</td>
      <td>{props.timestamp}</td>
      <td>{props.orderPrice + " RMB"}</td>
    </tr>
  );
}

function OrdersDetailHeader() {
  return (
    <tr>
      <th className="border-0">Order Id</th>
      <th className="border-0">User Id</th>
      <th className="border-0">Book Id</th>
      <th className="border-0">Book Name</th>
      <th className="border-0">Type</th>
      <th className="border-0">Author</th>
      <th className="border-0">Inventory</th>
      <th className="border-0">isbn</th>
      <th className="border-0">Image</th>
      <th className="border-0">Description</th>
      <th className="border-0">Price</th>
      <th className="border-0">Buying number</th>
    </tr>
  );
}

function OrdersDetailRow(props: {
  id: number,
  orderId: number,
  timestamp: string,
  userId: number,
  orderPrice: number,
  bookNum: number,
  bookId: number,
  isbn: string,
  name: string,
  type: string,
  author: string,
  price: string,
  description: string,
  inventory: number,
  image: string,
}) {
  return (
    <tr>
      <td>{props.orderId}</td>
      <td>{props.userId}</td>
      <td>{props.bookId}</td>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{props.author}</td>
      <td>{props.inventory}</td>
      <td>{props.isbn}</td>
      <td>{props.image}</td>
      <td>{props.description}</td>
      <td>{props.price + "RMB"}</td>
      <td>{props.bookNum}</td>
    </tr>
  );
}

function TableList(props: {
  name: string,
  keyword: string,
}) {
  const { imgs } = useImgs(props.keyword);
  const { users } = useUsers();
  const { user } = useUser();
  const { ordersDetail } = useOrdersDetail(user?.userId);
  const { orders } = useOrders(user?.userId);
  const bStatus = getBStatus(imgs)
  const uStatus = getUStatus(users)
  //console.log(books);
  console.log(users);
  var TableHeader: JSX.Element;
  switch (props.name) {
    case "Books":
      TableHeader = <ImgsHeader />;
      break;
    case "Users":
      TableHeader = <UsersHeader />;
      break;
    case "Books Status":
      TableHeader = <BStatusHeader />;
      break;
    case "Users Status":
      TableHeader = <UsersStatusHeader />
      break;
    case "Orders Detail":
      TableHeader = <OrdersDetailHeader />
      break;
    case "Orders":
      TableHeader = <OrdersHeader />
      break;
    default:
      TableHeader = <tr />
  }
  var bookRows, userRows, booksStatusRows, usersStatusRows, ordersDetailRows, orderRows;
  if (props.keyword !== undefined) {
    bookRows = props.name !== "Books" || imgs === undefined ? () => <div />
      : Object.values(imgs).filter((i) => Object.values(i).join().includes(props.keyword)).map((i) => (
        <BookRow id={i.id.toString()}
          image={i.image}
        />
      ));
    userRows = props.name !== "Users" || users === undefined ? () => <div />
      : Object.values(users).filter((i) => Object.values(i).join().includes(props.keyword)).map((i) => (
        <UserRow id={i.userId.toString()}
          userName={i.userName}
          password={i.password}
          userType={i.userType === 1 ? "Admin" : "normal User"}
        />
      ));
    ordersDetailRows = props.name !== "Orders Detail" || ordersDetail === undefined ? () => <div />
      : Object.values(ordersDetail).filter((i) => Object.values(i).join().includes(props.keyword)).map((i) => (
        <OrdersDetailRow
          id={i.id}
          orderId={i.orderId}
          orderPrice={i.orderPrice}
          timestamp={parseTimestamp(i.timestamp)}
          userId={i.userId}
          bookId={i.bookId}
          bookNum={i.bookNum}
          name={i.name}
          type={i.type}
          author={i.author}
          inventory={i.inventory}
          isbn={i.isbn}
          description={i.description}
          price={i.price.toString()}
          image={i.image}
        />
      ));
  } else {
    bookRows = props.name !== "Books" || imgs === undefined ? () => <div />
      : Object.values(imgs).map((i) => (
        <BookRow id={i.id.toString()}
          image={i.image}
        />
      ));
    userRows = props.name !== "Users" || users === undefined ? () => <div />
      : Object.values(users).map((i) => (
        <UserRow id={i.userId.toString()}
          userName={i.userName}
          password={i.password}
          userType={i.userType === 1 ? "Admin" : "normal User"}
        />
      ));
    ordersDetailRows = props.name !== "Orders Detail" || ordersDetail === undefined ? () => <div />
      : Object.values(ordersDetail).map((i) => (<OrdersDetailRow
        id={i.id}
        orderId={i.orderId}
        orderPrice={i.orderPrice}
        timestamp={parseTimestamp(i.timestamp)}
        userId={i.userId}
        bookId={i.bookId}
        bookNum={i.bookNum}
        name={i.name}
        type={i.type}
        author={i.author}
        inventory={i.inventory}
        isbn={i.isbn}
        description={i.description}
        price={i.price.toString()}
        image={i.image}
      />
      ));
  }
  booksStatusRows = props.name !== "Books Status" || imgs === undefined ? () => <div />
    : <BStatusRow
      bookSum={bStatus.bookSum}
      bookTypes={bStatus.bookTypes}
      bookMaxPrice={bStatus.bookMaxPrice + "RMB"}
      bookMinPrice={bStatus.bookMinPrice + "RMB"}
    />
  usersStatusRows = props.name !== "Users Status" || users === undefined ? () => <div />
    : <UStatusRow
      userSum={uStatus.userSum}
      adminSum={uStatus.adminSum}
    />
  orderRows = props.name !== "Orders" || orders === undefined ? () => <div />
    : Object.values(orders).map((i) => (<OrderRow
        orderId={i.orderId}
        timestamp={parseTimestamp(i.timestamp)}
        orderPrice={i.orderPrice}
        userId={i.userId}
    />));
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{props.name}</Card.Title>
                <p className="card-category">
                  Hello, {user?.userName}! You can control all {props.name} here!
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    {TableHeader}
                  </thead>
                  <tbody>
                    {bookRows}
                    {userRows}
                    {booksStatusRows}
                    {usersStatusRows}
                    {orderRows}
                    {ordersDetailRows}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
