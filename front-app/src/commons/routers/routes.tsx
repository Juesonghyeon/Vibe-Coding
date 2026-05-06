import LoginPage from "../../features/pages/login/LoginPage";
import MainPage from "../../features/pages/main/MainPage";
import BoardPage from "../../features/pages/board/BoardPage";
import BoardWritePage from "../../features/pages/board/BoardWritePage";
import MainLayout from "../../features/components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "board",
        element: <BoardPage />,
      },
      /* 로그인이 필요한 페이지 */
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "board/write",
            element: <BoardWritePage />,
          },
        ],
      },
    ],
  },
];

export default routes;
