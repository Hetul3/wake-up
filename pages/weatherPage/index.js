import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import WeatherUI from "../../components/WeatherUI";
import Loading from "../../components/Loading";
import Link from "next/link";

export default function Home() {
  const [cityName, setCityName] = useState("dubai");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [image, setImage] = useState({
    results: [
      {
        id: "KWTkd7mHqKE",
      },
    ],
  });
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
  const unsplashURL = `https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`;

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchImage = () => {
    setLoading(true);
    setError(false);
    return axios
      .get(unsplashURL)
      .then((response) => {
        const randomNumber = Math.floor(Math.random() * 10);
        setImage(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          setError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchWeather = () => {
    setLoading(true);
    setError(false);

    return axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          setError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    Promise.all([fetchWeather(), fetchImage()])
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="weather-background"> </div>
        <div className="background-image">
          <Image
            src={`https://source.unsplash.com/${image.results[0].id}`}
            priority={true}
            width={viewportWidth}
            height={viewportHeight}
            alt="Background Image"
          />
        </div>
        <div className="centred-container">
          <div className="search-container">
            <form onSubmit={handleSubmission} className="weather-form">
              <input
                id="search"
                type="search"
                placeholder="Search City"
                onChange={(e) => setCityName(e.target.value.toLowerCase())}
              />
              <button className="search-btn" type="submit">
                <BsSearch />
              </button>
            </form>
          </div>
        </div>
        {/* Components */}
        {!error ? (
          <>
            <div>{weather.main && <WeatherUI weatherData={weather} />}</div>
            <div className="next-button-pages-container">
              <Link href="newsPage">
                <button className="next-button-pages">Next Page -&gt;</button>
              </Link>
            </div>
          </>
        ) : (
          <div className="quotationContainer">
            <h1 style={{ color: "white" }} className="quotationHeader">
              Try again, looks like you didn't spell it quite right
            </h1>
          </div>
        )}
      </>
    );
  }
}
