import { NavLink, useNavigate } from "react-router";
import useAuthStore from "../../../store/authStore";

const navLinks = [
  { to: "/", label: "홈", end: true },
  { to: "/board", label: "게시판", end: false },
];

const MenuBar = () => {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <nav
      className="flex items-center justify-between px-16 h-[72px] w-full shrink-0 bg-white"
      style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.07)" }}
    >
      {/* 로고 영역 */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full"
          style={{ background: "linear-gradient(135deg, #4A90D9, #7c5cbf)" }}
        />
        <span
          className="font-bold text-[18px] font-[Inter]"
          style={{ color: "#0a1628", letterSpacing: "2px" }}
        >
          NOVATECH
        </span>
      </div>

      {/* 네비게이션 링크 */}
      <div className="flex items-center h-full">
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center h-full px-5 text-[14px] font-[Inter] border-b-2 transition-colors ${
                isActive
                  ? "font-semibold text-[#0a1628] border-[#4A90D9]"
                  : "font-medium text-[#6B7280] border-transparent hover:text-[#0a1628]"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* 우측 영역 — 로그인 상태에 따라 분기 */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-[14px] text-[#64748B] font-[Inter]">
              {user.name}님
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center h-10 px-5 rounded-lg text-[14px] font-medium text-[#6B7280] font-[Inter] border cursor-pointer hover:text-[#0a1628] hover:border-[#4A90D9] transition-colors"
              style={{ borderColor: "#E2E8F0" }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="flex items-center justify-center h-10 px-5 rounded-lg text-[14px] font-medium text-[#6B7280] font-[Inter] hover:text-[#0a1628] transition-colors"
            >
              로그인
            </NavLink>
            <button
              className="flex items-center justify-center h-10 px-6 rounded-lg text-[14px] font-semibold text-white font-[Inter] cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4A90D9, #7c5cbf)" }}
            >
              시작하기
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default MenuBar;
