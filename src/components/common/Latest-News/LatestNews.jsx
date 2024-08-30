import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { getTickers } from "../../../features/tickerSlice";

const LatestNews = () => {
  const dispatch = useDispatch();
  const { tickers, loading, error } = useSelector((state) => state.tickers);

  useEffect(() => {
    dispatch(getTickers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="latest-news-container">
        <div className="latest-news-container-head">
          <span>Latest News</span>
        </div>
        <Skeleton variant="text" className="mx-2" height={40} width="92%" />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="latest-news-container">
      <div className="latest-news-container-head">
        <span>Latest News</span>
      </div>
      <marquee className="latest-news-container-body">
        {tickers.map((ticker) => (
          <span key={ticker.category} style={{ marginRight: "20px" }}>
            {ticker.message}
          </span>
        ))}
      </marquee>
    </div>
  );
};

export default LatestNews;
