import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
import QuotesPage from "./quotesPage";

const inter = Inter({ subsets: ["latin"] });

const text = `The "Wake-Up-Website" is your ultimate morning destination for a
            quick and efficient dose of news, stocks, weather, and inspirational
            quotes. Stay updated and motivated in just two minutes with our
            carefully curated content. Start your day right with us and embrace
            empowerment and enlightenment every morning. Rise and shine with the
            "Wake-Up-Website"!`;

export default function Home() {
  const [textVisible, setTextVisible] = useState("");
  const textRef = useRef("");
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const typingDelay = 50; // Delay in milliseconds between typing each character
    const typingEffect = () => {
      const currentChar = text[currentIndexRef.current];
      if (currentChar === undefined) return;

      setTextVisible((prev) => prev + currentChar);
      currentIndexRef.current++;
      textRef.current = setTimeout(typingEffect, typingDelay);
    };

    textRef.current = setTimeout(typingEffect, typingDelay);

    return () => clearTimeout(textRef.current);
  }, []);

  return (
    <>
      <div className="index-parent-div">
        <div className="index-child-div-1">
          <h1 className="index-header">The Wake Up Website</h1>
        </div>
        <div className="index-child-div-2">
          <h2 className={`index-about ${textVisible ? "text-visible" : ""}`}>
            {textVisible}
          </h2>
        </div>
        <div className={"next-button-pages-container"}>
          <button className="next-button-pages">
            <Link href="weatherPage">Start Your Day</Link>
          </button>
        </div>
      </div>
    </>
  );
}
