import {
    BrowserRouter as Router,
    Switch,
    Route,
    RouteProps,
    Redirect,
} from "react-router-dom";

import { Main } from './pages/Main';
import { UsersControl } from "./pages/Admin/UsersControl";
import { BooksControl } from "./pages/Admin/BooksControl";
import { Status } from "./pages/Admin/Status";

export function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/imgs" />
                </Route>
                <AdminRoute exact path="/imgs_control" component={BooksControl} />
                <AdminRoute exact path="/status" component={Status} />
                <AuthRoute exact path="/imgs" component={Main} />
                <AuthRoute exact path="/search/" component={Main} />
                <AuthRoute exact path="/imgs/search/:keyword" component={Main} />
                <AuthRoute exact path="/users_control/search/" component={UsersControl} />
                <AuthRoute exact path="/users_control/search/:keyword" component={UsersControl} />
                <AuthRoute exact path="/imgs_control/search/" component={BooksControl} />
                <AuthRoute exact path="/imgs_control/search/:keyword" component={BooksControl} />
                <AuthRoute exact path="/status/search/" component={Status} />
                <AuthRoute exact path="/status/search/:keyword" component={Status} />
            </Switch>
        </Router>
    );
}

function AuthRoute(props: RouteProps){
    // debugging without backend:
    // return <Route {...props}></Route>
    // const { error } = useUser()
    // if(error){
    //     console.log("AuthRouter: Auth failed!", error)
    //     return <Redirect to="/login"/>
    // } else{
    //     console.log("AuthRouter: Auth passed!")
    //     return <Route {...props}></Route>
    // }
    // console.log("AuthRouter: Auth passed!")
    return <Route {...props}></Route>
}

function AdminRoute(props: RouteProps){
    // if(user?.userType === 1){
    // console.log("AdminRouter: Admin!")
    return <Route {...props}></Route>
    // } else{
    //     console.log("AuthRouter: Auth passed!")
    //     return <AuthRoute exact path="/books" component={Main} />
    // }
}