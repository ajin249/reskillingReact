import AdminLayout from "layouts/Admin.js";
import SiteLayout from "layouts/Site.js";
import { Route, Switch, Redirect } from "react-router-dom";
function App() {
    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    if (localStorageData) {
        return (
            <>
                <Switch>
                    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                    <Redirect to="/admin/dashboard" />
                </Switch>
            </>
        );
    } else {
        return (
            <>
                <Switch>
                    <Route path="/user" render={(props) => <SiteLayout {...props} />} />
                    <Redirect to="/user/login" />
                </Switch>
            </>
        );
    }
}

export default App;
