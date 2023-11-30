import React from 'react';
import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("");

  const getdata = async () => {
    try {
      const dataArray = await contract.display(address || account);
      if (dataArray && dataArray.length > 0) {
        const images = dataArray.map((item, i) => (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            />
          </a>
        ));
        setData(images);
      } else {
        alert("No image to display");
      }
    } catch (e) {
      console.error(e); // Log the error for debugging
      alert("You don't have access or an error occurred");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;
