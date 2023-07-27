<h1 align="center">
   The Wake Up Website is Here!
</h1>

<p align="center">
<img src="https://github.com/Hetul3/wake-up/assets/97708864/eebab369-0450-4b2b-8665-9b47f36bbd2f" alt="first" />
</p>


When we wake up, our first actions are to look at our phones to get caught up for the day. But what if you wanted to limit that time while still gaining all important information?

Introduce this to your morning routine and take 2 minutes to get caught up on the weather, stocks, news, and have a quote to motivate you throughout the day.

<h2 align="center">
   Weather
</h2>

<p align="center">
<img src="https://github.com/Hetul3/wake-up/assets/97708864/5c275bd2-9ee0-4f01-a79f-f427e630a069" alt="first" />
</p>


<h2 align="center">
   News
</h2>

<p align="center">
<img src="https://github.com/Hetul3/wake-up/assets/97708864/73e046b1-5bc2-4596-acd5-f1f8f12c11f8" alt="first" />
</p>


<h2 align="center">
   Stocks
</h2>

<p align="center">
<img src="https://github.com/Hetul3/wake-up/assets/97708864/5931b754-3090-4bab-8808-5cd008eeea6f" alt="first" />
</p>


<h2 align="center">
   Motivation
</h2>

<p align="center">
<img src="https://github.com/Hetul3/wake-up/assets/97708864/772298b6-7fb3-4896-886a-bac466f5a2dc" alt="first" />
</p>



You can view the website here https://wake-up-ten.vercel.app.
Note: the newsapi's free tier doesn't allow for commercial use, so you can't access the news section of the website, just skip over it. If anyone has a free solution to this, let me know.

If you want to use the website freely unrestricted for daily use:
1. Download the code using git clone < https://github.com/Hetul3/wake-up >
2. Download these dependencies for Nextjs:
   
    "axios": "^1.4.0",
   
    "currentsapi": "^0.1.0",
   
    "dotenv": "^16.3.1",
   
    "express": "^4.18.2",

    "finnhub": "^1.2.17",

    "font-awesome": "^4.7.0",

    "newsapi": "^2.4.1",

    "next": "13.4.10",

    "react": "18.2.0",

    "react-dom": "18.2.0",

    "react-icons": "^4.10.1",
   
4. Create a .env file in your root directory. Here, populate it with these key value pairs and these api keys for free:

   NEXT_PUBLIC_WEATHER_API_KEY={your api key} from https://openweathermap.org

   NEXT_PUBLIC_UNSPLASH_API_KEY={your api key} from https://unsplash.com/developers

   NEXT_PUBLIC_QUOTE_API_KEY={your api key} from https://api-ninjas.com/api/quotes

   NEXT_PUBLIC_NEWS_API_KEY={your api key} from https://newsapi.org

   NEXT_PUBLIC_STOCK_API_KEY={your api key} from https://finnhub.io
