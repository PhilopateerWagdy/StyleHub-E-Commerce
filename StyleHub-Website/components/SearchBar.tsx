"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import classNames from "classnames";

export default function SearchBar() {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);
  const isRTL = isClient && document?.dir === "rtl";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (expanded) {
      inputRef.current?.focus();
    }
  }, [expanded]);

  return (
    <div
      className={classNames(
        "flex items-center border border-gray-300 rounded-full transition-all duration-300",
        expanded
          ? "w-[220px] px-5"
          : classNames("w-[35px]", isRTL ? "pr-2" : "pl-2", "justify-center")
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center w-8 h-8 focus:outline-none"
        aria-label="Search"
        title="Search"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className={classNames(
          "ml-2 bg-transparent outline-none w-full transition-opacity duration-300",
          expanded ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />
    </div>
  );
}
