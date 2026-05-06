import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchBoardList } from "../../../service/apis/boardApi";
import useAuthStore from "../../../store/authStore";
import useBoardStore from "../../../store/boardStore";

const PAGE_SIZE = 10;

const BoardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const navigate = useNavigate();

  const items = useBoardStore((state) => state.items);
  const initialized = useBoardStore((state) => state.initialized);
  const setItems = useBoardStore((state) => state.setItems);
  const removeItems = useBoardStore((state) => state.removeItems);

  /* 최초 1회만 JSON에서 데이터 로드 */
  useEffect(() => {
    if (initialized) return;
    setLoading(true);
    fetchBoardList()
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [initialized, setItems]);

  /* 페이지 변경 시 체크 초기화 */
  useEffect(() => {
    setCheckedIds(new Set());
  }, [currentPage]);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const pagedItems = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  /* 현재 페이지 전체 선택 여부 */
  const isAllChecked =
    pagedItems.length > 0 &&
    pagedItems.every((item) => checkedIds.has(item.id));

  const handleAllCheck = () => {
    if (isAllChecked) {
      /* 전체 해제 */
      setCheckedIds((prev) => {
        const next = new Set(prev);
        pagedItems.forEach((item) => next.delete(item.id));
        return next;
      });
    } else {
      /* 전체 선택 */
      setCheckedIds((prev) => {
        const next = new Set(prev);
        pagedItems.forEach((item) => next.add(item.id));
        return next;
      });
    }
  };

  const handleCheck = (id: number) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용하실 수 있습니다.");
      navigate("/login");
      return;
    }
    navigate("/board/write");
  };

  const handleDeleteClick = () => {
    /* 로그인 체크 */
    if (!isLoggedIn) {
      alert("로그인 후 이용하실 수 있습니다.");
      navigate("/login");
      return;
    }

    /* 선택 항목 체크 */
    if (checkedIds.size === 0) {
      alert("삭제할 글을 선택하세요.");
      return;
    }

    /* 삭제 확인 */
    const confirmed = window.confirm(
      `정말 선택한 ${checkedIds.size}개의 글을 삭제하시겠습니까?`
    );
    if (!confirmed) return;

    removeItems([...checkedIds]);
    setCheckedIds(new Set());

    /* 삭제 후 현재 페이지가 범위를 벗어나면 마지막 페이지로 이동 */
    const newTotal = items.length - checkedIds.size;
    const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <div className="min-h-full bg-[#F8F9FA] px-20 py-10 flex flex-col gap-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold font-[Inter]"
          style={{ color: "#0a1628" }}
        >
          게시판
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDeleteClick}
            className="flex items-center justify-center h-11 px-6 rounded-lg text-[14px] font-semibold font-[Inter] cursor-pointer transition-colors border"
            style={{
              color: "#EF4444",
              borderColor: "#FECACA",
              backgroundColor: "#FFF5F5",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FEE2E2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFF5F5";
            }}
          >
            삭제
          </button>
          <button
            onClick={handleWriteClick}
            className="flex items-center justify-center h-11 px-6 rounded-lg text-[14px] font-semibold text-white font-[Inter] cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #4A90D9, #7c5cbf)" }}
          >
            글쓰기
          </button>
        </div>
      </div>

      {/* 테이블 카드 */}
      <div
        className="w-full rounded-xl bg-white overflow-hidden"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
      >
        {/* 테이블 헤더 */}
        <div
          className="flex items-center h-12 border-b"
          style={{ backgroundColor: "#F1F5F9", borderColor: "#E2E8F0" }}
        >
          {/* 전체 선택 체크박스 */}
          <div className="w-12 flex items-center justify-center shrink-0">
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllCheck}
              className="w-4 h-4 cursor-pointer accent-[#4A90D9]"
            />
          </div>
          <div className="w-16 flex items-center justify-center shrink-0">
            <span className="text-[13px] font-semibold text-[#64748B] font-[Inter]">
              번호
            </span>
          </div>
          <div className="flex-1 flex items-center px-4">
            <span className="text-[13px] font-semibold text-[#64748B] font-[Inter]">
              제목
            </span>
          </div>
          <div className="w-[120px] flex items-center justify-center shrink-0">
            <span className="text-[13px] font-semibold text-[#64748B] font-[Inter]">
              작성자
            </span>
          </div>
          <div className="w-[120px] flex items-center justify-center shrink-0">
            <span className="text-[13px] font-semibold text-[#64748B] font-[Inter]">
              작성일
            </span>
          </div>
          <div className="w-20 flex items-center justify-center shrink-0">
            <span className="text-[13px] font-semibold text-[#64748B] font-[Inter]">
              조회
            </span>
          </div>
        </div>

        {/* 로딩 / 에러 / 데이터 */}
        {loading && (
          <div className="flex items-center justify-center h-40">
            <p className="text-[#64748B] font-[Inter]">불러오는 중...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-40">
            <p className="text-red-500 font-[Inter]">오류: {error}</p>
          </div>
        )}
        {!loading && !error && pagedItems.length === 0 && (
          <div className="flex items-center justify-center h-40">
            <p className="text-[#94A3B8] font-[Inter]">게시물이 없습니다.</p>
          </div>
        )}
        {!loading &&
          !error &&
          pagedItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center h-[52px] border-b transition-colors ${
                checkedIds.has(item.id) ? "bg-[#F0F7FF]" : "hover:bg-[#F8FAFF]"
              }`}
              style={{
                borderColor: "#F1F5F9",
                borderBottomWidth:
                  index === pagedItems.length - 1 ? "0" : "1px",
              }}
            >
              {/* 행 체크박스 */}
              <div className="w-12 flex items-center justify-center shrink-0">
                <input
                  type="checkbox"
                  checked={checkedIds.has(item.id)}
                  onChange={() => handleCheck(item.id)}
                  className="w-4 h-4 cursor-pointer accent-[#4A90D9]"
                />
              </div>
              <div className="w-16 flex items-center justify-center shrink-0">
                <span className="text-[13px] text-[#94A3B8] font-[Inter]">
                  {item.id}
                </span>
              </div>
              <div className="flex-1 flex items-center px-4 overflow-hidden cursor-pointer">
                <span className="text-[14px] font-medium text-[#0F172A] font-[Inter] truncate">
                  {item.title}
                </span>
              </div>
              <div className="w-[120px] flex items-center justify-center shrink-0">
                <span className="text-[13px] text-[#64748B] font-[Inter]">
                  {item.author}
                </span>
              </div>
              <div className="w-[120px] flex items-center justify-center shrink-0">
                <span className="text-[13px] text-[#64748B] font-[Inter]">
                  {item.date}
                </span>
              </div>
              <div className="w-20 flex items-center justify-center shrink-0">
                <span className="text-[13px] text-[#64748B] font-[Inter]">
                  {item.views.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* 페이지네이션 */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 rounded-lg border text-[#94A3B8] bg-white transition-colors hover:border-[#4A90D9] hover:text-[#4A90D9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ borderColor: "#E2E8F0" }}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex items-center justify-center w-9 h-9 rounded-lg text-[14px] font-[Inter] cursor-pointer transition-all ${
                currentPage === page
                  ? "text-white font-semibold"
                  : "bg-white text-[#64748B] border hover:border-[#4A90D9] hover:text-[#4A90D9]"
              }`}
              style={
                currentPage === page
                  ? { background: "linear-gradient(135deg, #4A90D9, #7c5cbf)" }
                  : { borderColor: "#E2E8F0" }
              }
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-9 h-9 rounded-lg border text-[#94A3B8] bg-white transition-colors hover:border-[#4A90D9] hover:text-[#4A90D9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ borderColor: "#E2E8F0" }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
