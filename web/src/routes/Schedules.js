import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import Select from 'react-select';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ScheduleImg from '../assets/Schedule.jpg';

function Schedules({ isAuthenticated }) {
  const [currentStation, setCurrentStation] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [currentStationOptions, setCurrentStationOptions] = useState([]);
  const [destinationStationOptions, setDestinationStationOptions] = useState([]);

  useEffect(() => {
    async function fetchStations() {
      try {
        const { data: stationData, error: stationError } = await supabase
          .from('railwayStation')
          .select('stationId, city');

        if (stationError) {
          console.error('Error fetching railway stations:', stationError);
        } else {
          const stationOptions = stationData.map(station => ({
            value: station.stationId,
            label: station.city,
          }));
          setCurrentStationOptions(stationOptions);
          setDestinationStationOptions(stationOptions);
        }
      } catch (error) {
        console.error('Error in fetching railway stations:', error);
      }
    }

    fetchStations();
  }, []);

  const handleSearch = async () => {
    if (!currentStation || !destinationStation) {
      setValidationError('Please select both Current and Destination Stations.');
      return;
    }
  
    setValidationError('');
  
    try {
      const { data: scheduleData, error: scheduleError } = await supabase
        .from('schedule')
        .select('*')
        .eq('stationId', currentStation.value)
        .ilike('finalDestination', destinationStation.label); // Using ilike for case-insensitive search
  
      if (scheduleError) {
        console.error('Error fetching schedules:', scheduleError);
      } else {
        setSchedules(scheduleData);
      }
    } catch (error) {
      console.error('Error in fetching schedules:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Hero cName="hero-other" heroImg={ScheduleImg} title="Easy Find Train Schedules" />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Current Station:</label>
              <Select
                options={currentStationOptions}
                value={currentStation}
                onChange={(selectedOption) => setCurrentStation(selectedOption)}
                placeholder="Select current station"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Destination Station:</label>
              <Select
                options={destinationStationOptions}
                value={destinationStation}
                onChange={(selectedOption) => setDestinationStation(selectedOption)}
                placeholder="Select destination station"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center mt-4">
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search Schedules
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h2>Fetched Schedules</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Train ID</th>
                <th>Departure</th>
                <th>Arrival</th>
                {/* Add more table headers based on your schedule data */}
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule.id}>
                  <td>{schedule.trainId}</td>
                  <td>{schedule.departureTime}</td>
                  <td>{schedule.arrivalTime}</td>
                  {/* Add more table cells based on your schedule data */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Schedules;
