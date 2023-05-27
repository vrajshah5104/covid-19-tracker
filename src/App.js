import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent }   from '@mui/material';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));

          setCountries(countries);
        })
    };

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  }

  return (
    <div className="App">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          {/* This is present in the Material UI */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {/* Looping thorugh all the countries and showing a dropdown menu for the options */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div class="app__stats">
          <InfoBox title="CoronaVirus Cases" />
          <InfoBox title="Recovered" />
          <InfoBox title="Deaths" />
        </div>

        <Map />
      </div>
      <Card className='app__right'></Card>
    </div>
  );
}

export default App;