import React, { useState, useEffect } from 'react';
const axios = require('axios');

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://rickandmortyapi.com/api/character'
        );
        setData(response.data.results);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // ***** ********* ********* ********* ********* ********* ********* *********
  const filterValues = data.map((origin) => origin.origin.name);
  const nonRepeatedValues = [...new Set(filterValues)];
  // ***** ********* ********* ********* ********* ********* ********* *********

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // ***** ********* ********* ********* ********* ********* ********* *********
  function SortSelection() {
    return (
      <select onChange={handleSort}>
        {nonRepeatedValues.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    );
  }
  // ***** ********* ********* ********* ********* ********* ********* *********

  const handleSort = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  //   const origin = data.filter((origin) => {
  //     console.log(origin.origin.name);
  //     return origin.origin.name.toLowerCase().includes(value.toLowerCase());
  //   });

  const Characters = ({ value }) => (
    <div>
      {data.map((d) =>
        d.origin.name.includes(value) ? (
          <div
            key={d.id}
            style={{
              padding: '10px',
              margin: ('1rem', '1rem'),
              backgroundColor: '#f5f5f5',
              color: '#333',
            }}
          >
            <img src={d.image} alt={d.name} />
            <p>Name: {d.name}</p>
            <p>Status: {d.status}</p>
            <p>Type: {d.species}</p>
            <p>Origin: {d.origin.name}</p>
          </div>
        ) : null
      )}
    </div>
  );

  return (
    <>
      <SortSelection />
      <div>
        <div>
          <Characters value={value} />
        </div>
      </div>
    </>
  );
}

export default Main;
