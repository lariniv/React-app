import { HistorySidebar } from "@/widgets";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import {
  fetchGetActivitiesByOwnerId,
  fetchGetAllTodoListsByOwnerId,
} from "@/entities";
import { CreateListForm } from "@/features";
import TaskBoard from "./components/TaskBoard";

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
        upperCaseAlphabet[Math.floor(Math.random() * upperCaseAlphabet.length)];
    } else {
      token += numbers[Math.floor(Math.random() * numbers.length)];
    }
  }
  return token;
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", generateToken());
    } else {
      const ownerId = localStorage.getItem("token") as string;
      dispatch(fetchGetAllTodoListsByOwnerId({ ownerId }));
      dispatch(fetchGetActivitiesByOwnerId({ ownerId }));
    }
  }, [dispatch]);
  return (
    <div className="relative max-w-7xl flex flex-col gap-8">
      <div className="flex flex-col md:flex-row w-full gap-4">
        <h1 className="text-4xl text-center md:text-3xl md:text-start w-full font-bold block">
          My task board
        </h1>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:flex gap-2 w-full">
          <HistorySidebar />
          <CreateListForm />
        </div>
      </div>

      <TaskBoard />
    </div>
  );
}
