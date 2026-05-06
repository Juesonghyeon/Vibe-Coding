import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BoardItem } from "../service/apis/boardApi";

interface BoardState {
  items: BoardItem[];
  initialized: boolean;
  /* JSON 초기 데이터 세팅 (최초 1회) */
  setItems: (items: BoardItem[]) => void;
  /* 새 게시글 추가 */
  addItem: (newItem: Omit<BoardItem, "id" | "views">) => void;
  /* 선택된 id 목록 삭제 */
  removeItems: (ids: number[]) => void;
}

const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      items: [],
      initialized: false,

      setItems: (items) => set({ items, initialized: true }),

      addItem: (newItem) => {
        const items = get().items;
        const nextId =
          items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

        const item: BoardItem = {
          id: nextId,
          views: 0,
          ...newItem,
        };

        /* 새 글이 목록 맨 앞에 오도록 추가 */
        set({ items: [item, ...items] });
      },

      removeItems: (ids) => {
        const idSet = new Set(ids);
        set((state) => ({
          items: state.items.filter((item) => !idSet.has(item.id)),
        }));
      },
    }),
    { name: "board-storage" }
  )
);

export default useBoardStore;
