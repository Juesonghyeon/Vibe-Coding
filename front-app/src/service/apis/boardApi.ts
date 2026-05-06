import axios from "axios";

/* ------------------------------------------------------------------ *
 * 엔드포인트 설정
 * - 로컬 개발: public/assets/data/board.json 정적 파일
 * - 서버 전환: VITE_API_BASE_URL 환경변수에 서버 주소를 설정하면
 *   자동으로 서버 API를 호출합니다.
 *   예) .env → VITE_API_BASE_URL=https://api.example.com
 * ------------------------------------------------------------------ */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const BOARD_ENDPOINT = API_BASE_URL
  ? `${API_BASE_URL}/api/board`
  : "/assets/data/board.json";

export interface BoardItem {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
}

/* 목록 조회 */
const fetchBoardList = async (): Promise<BoardItem[]> => {
  const response = await axios.get<BoardItem[]>(BOARD_ENDPOINT);
  return response.data;
};

export { fetchBoardList };
