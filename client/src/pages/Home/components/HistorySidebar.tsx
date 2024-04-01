import { RootState } from "@/app/store/store";
import { Button } from "@/shared/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

import { History, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActivityItem from "./ActivityItem";

export default function HistorySidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (!e.target.closest(".history-sidebar")) {
          setIsOpen(false);
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const activityLog = useSelector(
    (state: RootState) => state.activity.activityLog
  );

  return (
    <AnimatePresence>
      <div
        key={"history-button"}
        className="flex justify-end gap-2 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Button variant={"outline"}>
          <History size={18} />
          <div>History</div>
        </Button>
      </div>
      {isOpen && (
        <>
          <motion.div
            key={"history-sidebar"}
            initial={{ translateX: 400 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: 400 }}
            transition={{
              duration: 0.1,
              type: "spring",
              damping: 30,
              stiffness: 200,
            }}
            className="max-w-[400px] w-full fixed h-screen bg-accent z-[1000] right-0 top-0 history-sidebar "
          >
            <div>
              <div className="w-full flex justify-between bg-black/20 p-4 items-center">
                <div className="text-3xl font-semibold">History</div>
                <X
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="cursor-pointer"
                />
              </div>

              <ul className="flex flex-col gap-6 pt-12 px-4 overflow-y-auto max-h-[93vh]">
                {activityLog.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            key={"history-bg"}
            className="bg-black/30 z-20 fixed w-screen h-screen left-0 top-0"
          />
        </>
      )}
    </AnimatePresence>
  );
}
