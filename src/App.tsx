import "./styles/App.css";
import Header from "./components/Header/Header";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "create", element: <Create /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
