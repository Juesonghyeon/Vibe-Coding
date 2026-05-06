import { Navigate, Outlet, useLocation } from "react-router";
import useAuthStore from "../../store/authStore";

/* 로그인이 필요한 라우트를 감싸는 보호 컴포넌트
 * - 로그인 상태: 자식 라우트(Outlet) 렌더링
 * - 미로그인 상태: /login 으로 리다이렉트 (현재 경로 state로 전달)
 */
const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
