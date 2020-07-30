import React from "react";
import { Route, Switch } from "react-router-dom";
import BooksPage from "../pages/books";
import NewBookPage from "../pages/books/new-book";
import ViewBookPage from "../pages/books/view-book";
import EditBookPage from "../pages/books/edit-book";

const BooksRoutes = ({ url }) => {
    return (
        <Switch>
            <Route path={`${url}/`} component={BooksPage} exact />
            <Route path={`${url}/new`} exact component={NewBookPage} />
            <Route
                path={`${url}/:id`}
                exact
                render={({ match }) => (
                    <ViewBookPage bookId={match.params.id} />
                )}
            />

            <Route
                path={`${url}/:id/edit`}
                exact
                render={({ match }) => (
                    <EditBookPage bookId={match.params.id} />
                )}
            />
        </Switch>
    );
};

export default BooksRoutes;
