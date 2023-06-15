import { RouteComponentProps } from 'react-router-dom';
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import TableList from '../../components/TableList';

export function BooksControl(props: RouteComponentProps<{keyword: string;}>) {
    const keyword = props.match.params.keyword;
    return (
        <>
            <Header />
            <Main keyword = {keyword} />
            <Footer />
        </>
    );
}

function Main(props: {keyword: string}) {
    return (
        <TableList name="Books" keyword={props.keyword}/>
    );
}

