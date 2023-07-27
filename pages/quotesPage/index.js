import axios from "axios";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

export default function QuotesPage() {
  const initialDisplayQuote = "";

  const categories = [
    "inspirational",
    "fitness",
    "forgiveness",
    "funny",
    "future",
    "happiness",
    "knowledge",
    "success",
  ];

  const [category, setCategory] = useState("inspirational");
  const [quote, setQuote] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [isQuoteReady, setIsQuoteReady] = useState(false);
  const [displayQuote, setDisplayQuote] = useState(initialDisplayQuote);
  const [showQuote, setShowQuote] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (quote.quote) {
      setIsQuoteReady(true);
    }
  }, [quote]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFetched(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const fetchQuote = async () => {
    try {
      const apiURL = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
      const response = await axios.get(apiURL, {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_QUOTE_API_KEY,
        },
      });
      setQuote(response.data[0]);
    } catch (error) {
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
      } else {
        console.error("Error Message:", error.message);
      }
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    fetchQuote();
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    let typingInterval;
    if (isQuoteReady && quote.quote) {
      let currentIndex = 1;
      setDisplayQuote(initialDisplayQuote);
      const typingStartDelay = setTimeout(() => {
        setDisplayQuote(quote.quote[0]);

        typingInterval = setInterval(() => {
          setDisplayQuote((prevText) => {
            if (currentIndex >= quote.quote.length) {
              clearInterval(typingInterval);
              setShowQuote(true);
              return prevText;
            }
            currentIndex++;
            return prevText + quote.quote[currentIndex - 1];
          });
        }, 100);
      }, 500);

      return () => {
        clearTimeout(typingStartDelay);
        clearInterval(typingInterval);
      };
    }
  }, [isQuoteReady, quote]);

  return (
    <>
      <div className="quotation-background"></div>
      <div className="quotation-background-image">
        <Image
          src={
            "https://images.hdqwalls.com/wallpapers/sunrise-dark-morning-lake-dn.jpg"
          }
          priority={true}
          width={viewportWidth}
          height={viewportHeight}
          alt="Background Image"
        />
      </div>
      <div className={`quotationContainer ${isReady ? "delay" : ""}`}>
        <h1 className={`quotationHeader ${isReady ? "show" : ""}`}>
          Get Ready To Feel {category.toUpperCase()}
        </h1>
        <form onSubmit={handleSubmission} className="quotationForm">
          <label className="quotationLabel">
            <select
              className="quotationSelect"
              value={category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option className="quotationOption" key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <button className="quotationButton" type="submit">
            <BsSearch />
          </button>
        </form>
        <h2 className={`quotation ${isQuoteReady && showQuote ? "show" : ""}`}>
          {displayQuote}
        </h2>
        <br />
        <h2
          className={`author-quote ${isQuoteReady && showQuote ? "show" : ""}`}
        >
          - {quote.author}
        </h2>
        <div
          className={`next-button-pages-container ${
            isQuoteReady && showQuote && fetched ? "show" : "hide"
          }`}
        >
          <Link href="endingPage">
            <button className="next-button-pages">Next Page</button>
          </Link>
        </div>
      </div>
    </>
  );
}
