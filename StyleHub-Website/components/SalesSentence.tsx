"use client";

import { useEffect, useState } from "react";

const sentences = [
  "New Markdowns – Save Up to 70% Off",
  "Free Express Shipping → Delivery in 2-4 Days",
  "New This Week – 50+ Pieces Added",
];

export default function SalesSentenceRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
      <span className="text-sm text-gray-500">{sentences[index]}</span>
    </div>
  );
}
