import useFetch from "../../hooks/useFetch";
import "./featured.css";

import React from 'react'

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Mombasa,Nairobi,Nakuru"
  );
  
  return (
    <div className="featured">
      {loading ? (
        "Loading Please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1560564029-6eb181a872c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mombasa</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Nairobi</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1623745492825-4f6bc5f845dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Nakuru</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Featured