import React, { useState } from 'react';

const Nav = ({ cityName, setCityName, handleSubmit }: any) => {
  const [storeInput, setStoreInput] = useState('');

  return (
    <div className="navbar">
      <h1>Weather App</h1>
      {/* <form action="submit">
          <input value={cityName} onChange={(e) => setStoreInput(e.target.value)} type="text" placeholder="Search..." />
          <button type="submit" onSubmit={() => setCityName(storeInput)}>
            Submit
          </button>
        </form> */}
      <form onSubmit={handleSubmit}>
        <input value={storeInput} onChange={(e) => setStoreInput(e.target.value)} type="text" placeholder="Search..." />
        {/* <button type="submit" onSubmit={() => setCityName(storeInput)}>
            Submit
          </button> */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Nav;
