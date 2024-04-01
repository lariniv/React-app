import CreateListForm from "./CreateListForm";
import { TaskBoard } from "@/widgets";
import HistorySidebar from "./HistorySidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGetAllTodoListsByOwnerId } from "@/app/store/todo-slice/thunks";
import { AppDispatch } from "@/app/store/store";

export default function Home() {
  function generateToken() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseAlphabet = alphabet.toUpperCase();
    const numbers = "0123456789";
    let token = "";
    for (let i = 0; i < 10; i++) {
      const random = Math.random();
      if (random < 0.33) {
        token += alphabet[Math.floor(Math.random() * alphabet.length)];
      } else if (random < 0.66) {
        token +=
          upperCaseAlphabet[
            Math.floor(Math.random() * upperCaseAlphabet.length)
          ];
      } else {
        token += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }
    return token;
  }
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", generateToken());
    } else {
      const ownerId = localStorage.getItem("token") as string;
      dispatch(fetchGetAllTodoListsByOwnerId({ ownerId }));
    }
  }, []);
  return (
    <div className="relative max-w-7xl flex flex-col gap-8">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl text-start w-full font-bold">My task board</h1>
        <div className="flex gap-2">
          <HistorySidebar />
          <CreateListForm />
        </div>
      </div>

      <TaskBoard />
    </div>
  );
}
