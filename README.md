## The Nextjs Wake Up Website is Here!

When we wake up, our first actions are to look at our phones to get caught up for the day. But what if you wanted to limit that time while still gaining all important information?

Introduce this to your morning routine and take 2 minutes to get caught up on the weather, stocks, news, and have a quote to motivate you throughout the day.


You can view the website here https://wake-up-ten.vercel.app.
Note: the newsapi's free tier doesn't allow for commercial use, so you can't access the news section of the website, just skip over it. If anyone has a free solution to this, let me know.

If you want to use the website freely unrestricted for daily use:
1. Download the code using git clone <repository_url>
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
