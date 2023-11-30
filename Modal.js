import React, { useState, useEffect } from 'react';
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);

  const sharing = async () => {
    if (address) {
      await contract.allow(address);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    const accessList = async () => {
      const addresses = await contract.shareAccess();
      setAddressList(addresses);
    };

    if (contract) {
      accessList();
    }

    // Cleanup function if necessary
    return () => {
      // Cleanup code here
    };
  }, [contract]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share with</div>
        <div className="body">
          <input
            type="text"
            className="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <form id="myForm" onSubmit={(e) => e.preventDefault()}>
          <select id="selectNumber">
            <option>People With Access</option>
            {addressList.map((addr) => (
              <option key={addr} value={addr}>{addr}</option>
            ))}
          </select>
        </form>
        <div className="footer">
          <button onClick={() => setModalOpen(false)} id="cancelBtn">
            Cancel
          </button>
          <button onClick={sharing}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
