import Elder from "../pages/Elder";
import Freshmen from "../pages/Freshmen";
import Home from "../pages/Home";

import { Navigate } from "react-router-dom";

const routes = (authenticate, elder, freshmen) => [
  {
    path: "/",
    children: [
      {
        path: "elder",
        element: authenticate && elder ? <Elder /> : <Navigate to="/" />,
      },
      {
        path: "freshmen",
        element: authenticate && freshmen ? <Freshmen /> : <Navigate to="/" />,
      },
      { path: "/", element: <Home /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];

export default routes;
