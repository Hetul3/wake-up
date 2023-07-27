import { useState } from "react";
import axios from "axios";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

import Amazon from "../../public/Amazon.png";
import Apple from "../../public/Apple.png";
import Meta from "../../public/Meta.png";
import Netflix from "../../public/Netflix.png";
import Microsoft from "../../public/Microsoft.png";
import Google from "../../public/Google.png";
import Tesla from "../../public/Tesla.png";
import Nvidia from "../../public/Nvidia.png";

const stockSymbols = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "NVDA",
  "TSLA",
  "META",
  "NFLX",
];

const stockNames = [
  "Apple",
  "Microsoft",
  "Google",
  "Amazon",
  "Nvidia",
  "Tesla",
  "Meta",
  "Netflix",
];

const stockImages = {
  Apple,
  Microsoft,
  Google,
  Amazon,
  Nvidia,
  Tesla,
  Meta,
  Netflix,
};

export default function Home() {
  const [stockData, setStockData] = useState([]);
  const [fetched, setFetched] = useState(false);

  const handleButtonClick = async () => {
    try {
      const data = await fetchStockData(stockSymbols);
      setStockData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStockData = async (symbols) => {
    try {
      const baseUrl = "https://finnhub.io/api/v1";
      const requests = symbols.map((symbol) =>
        axios.get(`${baseUrl}/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_STOCK_API_KEY}`)
      );

      const responses = await Promise.all(requests);
      const data = responses.map((response) => response.data);
      setFetched(true);
      return data;
    } catch (error) {
      throw new Error("Error fetching data:", error);
    }
  };

  const percentChange = (current, starting) => {
    if (current === starting) {
      return (
        <>
          <h3 className="no-change-stock">
            <BsFillArrowUpCircleFill /> 0%
          </h3>
        </>
      );
    } else if (current > starting) {
      let percent = ((current - starting) / starting) * 100;
      return (
        <>
          <h3 className="increase-change-stock">
            <BsFillArrowUpCircleFill /> {percent.toFixed(2)}%
          </h3>
        </>
      );
    } else {
      let percent = ((current - starting) / starting) * 100;
      return (
        <>
          <h3 className="decrease-change-stock">
            <BsFillArrowDownCircleFill /> {percent.toFixed(2)}%
          </h3>
        </>
      );
    }
  };

  return (
    <>
      <button
        className={`stock-button ${fetched ? "show" : ""}`}
        onClick={handleButtonClick}
        disabled={fetched}
      >
        {`${!fetched ? "How Are The Big 8 Performing?" : ""}`}
      </button>
      {stockData.length > 0 && (
        <div className="stock-parent-container">
          <ul className="stock-list-container">
            {stockData.map((stock, index) => (
              <li key={index}>
                <Link
                  href={`https://www.google.com/finance/quote/${stockSymbols[index]}:NASDAQ`}
                  alt="link to the google finance page"
                  target="_blank"
                >
                  <div className="stock-container">
                    <div className="stock-pic-symbol">
                      <Image
                        src={stockImages[stockNames[index]]}
                        width="100"
                        height="100"
                        alt="stock symbols"
                      />
                      <p className="stock-name">{stockSymbols[index]}</p>
                    </div>
                    <div className="divider"></div>
                    <div className="stock-name-price">
                      <div className="stock-name-container">
                        <h1>{stockNames[index]}</h1>
                      </div>
                      <div className="stock-price-change-container">
                        <h3 className="stock-price">${stock.c.toFixed(2)}</h3>
                        <div className="stock-change">
                          {percentChange(stock.c, stock.pc)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="news-center-button-container">
        <Link href="quotesPage">
          <button
            className={`next-news-button ${fetched ? "show" : ""}`}
            disabled={!fetched}
          >
            Next Page -&gt;
          </button>
        </Link>
      </div>
    </>
  );
}
