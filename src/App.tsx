import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BooksRoutes from "./routes/books";
import AuthorsRoutes from "./routes/authors";

import Navbar from "./components/navbar";

import Index from "./pages";

import "./scss/index.scss";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>

                    <Route
                        path="/books"
                        render={({ match: { url } }) => (
                            <BooksRoutes url={url} />
                        )}
                    />

                    <Route
                        path="/authors"
                        render={({ match: { url } }) => (
                            <AuthorsRoutes url={url} />
                        )}
                    />

                    <Route
                        component={() => (
                            <div className="page">
                                <h1>Page not found</h1>
                            </div>
                        )}
                    />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
