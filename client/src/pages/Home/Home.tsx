import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetActivitiesByOwnerId, fetchGetAllBoards } from "@/entities";
import { AppDispatch, BoardProvider, RootState } from "@/processes";
import { generateToken } from "./helpers";
import { TaskBoard } from "@/widgets";
import CreateBoardForm from "@/features/CreateBoardForm/CreateBoardForm";
import { ArrowDown, Plus } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", generateToken());
    } else {
      const ownerId = localStorage.getItem("token") as string;
      dispatch(fetchGetAllBoards({ ownerId }));
      dispatch(fetchGetActivitiesByOwnerId({ ownerId }));
    }
  }, [dispatch]);

  const boards = useSelector((state: RootState) => state.board.taskBoards);

  return (
    <div className="relative max-w-7xl flex flex-col gap-24">
      {boards.length &&
        boards.map((board) => (
          <BoardProvider key={board.id} value={board}>
            <TaskBoard />
          </BoardProvider>
        ))}
      {!boards.length && (
        <div className="flex flex-col gap-4 items-center justify-center mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Don't have any task boards? Create yours now!
          </h1>
          <ArrowDown size={48} />
        </div>
      )}
      <CreateBoardForm>
        <div className="fixed w-fit cursor-pointer left-1/2 -translate-x-1/2 bottom-12 opacity-40 bg-secondary p-2 rounded-full hover:opacity-100 transition-opacity duration-300">
          <Plus size={48} />
        </div>
      </CreateBoardForm>
    </div>
  );
}
