import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthorsPage from "../pages/authors";
import NewAuthorPage from "../pages/authors/new-author";
import ViewAuthorPage from "../pages/authors/view-author";
import EditAuthorPage from "../pages/authors/edit-author";

const AuthorsRoutes = ({ url }) => {
    return (
        <Switch>
            <Route path={`${url}/`} component={AuthorsPage} exact />
            <Route path={`${url}/new`} exact component={NewAuthorPage} />
            <Route
                path={`${url}/:id`}
                exact
                render={({ match }) => (
                    <ViewAuthorPage authorId={match.params.id} />
                )}
            />

            <Route
                path={`${url}/:id/edit`}
                exact
                render={({ match }) => (
                    <EditAuthorPage authorId={match.params.id} />
                )}
            />
        </Switch>
    );
};

export default AuthorsRoutes;
