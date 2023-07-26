import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NewsPage() {
  const [news, setNews] = useState({});
  const [fetched, setFetched] = useState(false);

  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

  const fetchNews = async () => {
    return axios
      .get(url)
      .then((response) => {
        setNews(response.data);
        setFetched(true);
        console.log(news);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const numToMonth = (number) => {
    //some months are too long to displayed
    const months = [
      "01",
      "02",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "09",
      "October",
      "11",
      "12",
    ];

    const parsedNumber = parseInt(number, 10);
    if (parsedNumber >= 1 && parsedNumber <= 12) {
      return months[parsedNumber - 1];
    } else {
      return "Invalid Month";
    }
  };

  const findDate = (date) => {
    let str = date.split("-");
    return (
      <div>
        <p>{str[0]}</p>
        <p>{numToMonth(str[1])}</p>
        <p>{str[2].slice(0, 2)}</p>
      </div>
    );
  };

  const splitHeader = (header) => {
    let str = header.split("-");
    return <p>{str[0]}</p>;
  };

  const splitAuthor = (author) => {
    if (author === null) return;
    if (author.indexOf("http") != -1) return null;
    else {
      let authorList = author.split(",");
      return authorList[0];
    }
  };

  return (
    <>
      <button
        className={`news-button ${fetched ? "show" : ""}`}
        onClick={fetchNews}
        disabled={fetched}
      >
        {`${!fetched ? "What is Happening in the World" : ""}`}
      </button>
      <div className="news-container-parent">
        {news.articles &&
          Array.isArray(news.articles) &&
          news.articles.map((article, index) => (
            <div key={index} className="news-container">
              <div className="news-image-container">
                <Image
                  className="news-image"
                  src={`/api/proxy-image?imageUrl=${encodeURIComponent(
                    article.urlToImage
                  )}`}
                  alt="News Image"
                  width="100"
                  height="100"
                />
              </div>
              <div className="news-bottom-container">
                <div className="news-date-container">
                  <div className="news-date">
                    {findDate(`${article.publishedAt}`)}
                  </div>
                </div>
                <div className="divider"></div>
                <div className="news-component-container">
                  <Link
                    href={article.url}
                    className="news-header"
                    target="_blank"
                  >
                    {splitHeader(`${article.title}`)}
                  </Link>
                  <div className="news-institution-container">
                    <p className="news-institution">{article.source.name}</p>
                    <p className="news-author">{splitAuthor(article.author)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="news-center-button-container">
        <Link href="stocksPage">
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
