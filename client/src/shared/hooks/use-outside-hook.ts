import { useEffect } from "react";

export default function useOutsideClick(
  selector: string,
  callback: () => void
) {
  return useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest(selector)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
}
