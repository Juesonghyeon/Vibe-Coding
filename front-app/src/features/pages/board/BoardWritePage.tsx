import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../../store/authStore";
import useBoardStore from "../../../store/boardStore";

/* 오늘 날짜를 YYYY-MM-DD 형식으로 반환 */
const getTodayDate = (): string => {
  return new Date().toISOString().slice(0, 10);
};

const BoardWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const user = useAuthStore((state) => state.user);
  const addItem = useBoardStore((state) => state.addItem);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }

    addItem({
      title: title.trim(),
      content: content.trim(),
      author: user?.name ?? "알 수 없음",
      date: getTodayDate(),
    });

    alert("게시글이 등록되었습니다.");
    navigate("/board");
  };

  const handleCancel = () => {
    navigate("/board");
  };

  return (
    <div className="min-h-full bg-[#F8F9FA] px-20 py-10 flex flex-col gap-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold font-[Inter]"
          style={{ color: "#0a1628" }}
        >
          글쓰기
        </h1>
      </div>

      {/* 폼 카드 */}
      <div
        className="w-full rounded-xl bg-white overflow-hidden flex flex-col"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
      >
        {/* 작성자 (읽기 전용) */}
        <div
          className="flex items-center gap-4 border-b px-6"
          style={{ borderColor: "#F1F5F9" }}
        >
          <span className="text-[13px] font-semibold text-[#64748B] font-[Inter] shrink-0 w-16">
            작성자
          </span>
          <span className="h-14 flex items-center text-[14px] text-[#0F172A] font-[Inter]">
            {user?.name}
          </span>
        </div>

        {/* 제목 */}
        <div
          className="flex items-center gap-4 border-b px-6"
          style={{ borderColor: "#F1F5F9" }}
        >
          <span className="text-[13px] font-semibold text-[#64748B] font-[Inter] shrink-0 w-16">
            제목
          </span>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 h-14 text-[15px] font-medium text-[#0F172A] font-[Inter] placeholder-[#94A3B8] outline-none bg-transparent"
          />
        </div>

        {/* 내용 */}
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[400px] p-6 text-[15px] text-[#0F172A] font-[Inter] placeholder-[#94A3B8] outline-none bg-transparent resize-none"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancel}
          className="flex items-center justify-center h-11 px-6 rounded-lg text-[14px] font-medium text-[#64748B] font-[Inter] bg-white border cursor-pointer hover:border-[#4A90D9] hover:text-[#4A90D9] transition-colors"
          style={{ borderColor: "#E2E8F0" }}
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center h-11 px-6 rounded-lg text-[14px] font-semibold text-white font-[Inter] cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg, #4A90D9, #7c5cbf)" }}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default BoardWritePage;
