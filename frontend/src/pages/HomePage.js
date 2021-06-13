import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Dashboard from "./Dashboard";
import Book from "./Book";
import BookAdd from "./BookAdd";
import BookEdit from "./BookEdit";
import Borrower from "./Borrower";
import BorrowerAdd from "./BorrowerAdd";
import BorrowerEdit from "./BorrowerEdit";
import History from "./History";
import HistoryAdd from "./HistoryAdd";
import HistoryEdit from "./HistoryEdit";
// import Upgrade from "./Upgrade";
// import DashboardOverview from "./dashboard/DashboardOverview";
// import Transactions from "./Transactions";
// import Settings from "./Settings";
// import BootstrapTables from "./tables/BootstrapTables";
// import Signin from "./examples/Signin";
// import Signup from "./examples/Signup";
// import ForgotPassword from "./examples/ForgotPassword";
// import ResetPassword from "./examples/ResetPassword";
// import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
//
// // documentation pages
// import DocsOverview from "./documentation/DocsOverview";
// import DocsDownload from "./documentation/DocsDownload";
// import DocsQuickStart from "./documentation/DocsQuickStart";
// import DocsLicense from "./documentation/DocsLicense";
// import DocsFolderStructure from "./documentation/DocsFolderStructure";
// import DocsBuild from "./documentation/DocsBuild";
// import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

// import Accordion from "./components/Accordion";
// import Alerts from "./components/Alerts";
// import Badges from "./components/Badges";
// import Breadcrumbs from "./components/Breadcrumbs";
// import Buttons from "./components/Buttons";
// import Forms from "./components/Forms";
// import Modals from "./components/Modals";
// import Navs from "./components/Navs";
// import Navbars from "./components/Navbars";
// import Pagination from "./components/Pagination";
// import Popovers from "./components/Popovers";
// import Progress from "./components/Progress";
// import Tables from "./components/Tables";
// import Tabs from "./components/Tabs";
// import Tooltips from "./components/Tooltips";
// import Toasts from "./components/Toasts";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  // const toggleSettings = () => {
  //   setShowSettings(!showSettings);
  //   localStorage.setItem('settingsVisible', !showSettings);
  // }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />
    <RouteWithSidebar exact path={Routes.Book.path} component={Book} />
    <RouteWithSidebar exact path={Routes.BookAdd.path} component={BookAdd} />
    <RouteWithSidebar exact path={Routes.BookEdit.path} component={BookEdit} />
    <RouteWithSidebar exact path={Routes.Borrower.path} component={Borrower} />
    <RouteWithSidebar exact path={Routes.BorrowerAdd.path} component={BorrowerAdd} />
    <RouteWithSidebar exact path={Routes.BorrowerEdit.path} component={BorrowerEdit} />
    <RouteWithSidebar exact path={Routes.History.path} component={History} />
    <RouteWithSidebar exact path={Routes.HistoryAdd.path} component={HistoryAdd} />
    <RouteWithSidebar exact path={Routes.HistoryEdit.path} component={HistoryEdit} />

    <Redirect to={Routes.Dashboard.path} />
  </Switch>
);
