import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import Select from 'react-select';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ScheduleImg from '../assets/Schedule.jpg';
import { useAuth } from '../components/AuthContext';

function Schedules() {

  const { isAuthenticated } = useAuth(); // Fetching isAuthenticated status 
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

  const fetchTrainName = async (trainId) => {
    try {
      const { data: trainData, error: trainError } = await supabase
        .from('train')
        .select('name')
        .eq('trainId', trainId);
  
      if (trainError) {
        console.error('Error fetching train name:', trainError);
        return 'Unknown';
      } else {
        return trainData[0]?.name || 'Unknown';
      }
    } catch (error) {
      console.error('Error in fetching train name:', error);
      return 'Unknown';
    }
  };

  // Inside the handleSearch function
const handleSearch = async () => {
  if (!currentStation || !destinationStation) {
    setValidationError('Please select both Current and Destination Stations.');
    return;
  }

  setValidationError('');

  try {
    const { data: scheduleDataFinalDest, error: finalDestError } = await supabase
      .from('schedule')
      .select('*')
      .eq('stationId', currentStation.value)
      .ilike('finalDestination', destinationStation.label);

    const { data: allScheduleData, error: allSchedulesError } = await supabase
      .from('schedule')
      .select('*')
      .eq('stationId', currentStation.value);

    if (finalDestError || allSchedulesError) {
      console.error('Error fetching schedules:', finalDestError || allSchedulesError);
    } else {
      const filteredSchedules = allScheduleData.filter((schedule) =>
        schedule.stopStations &&
        schedule.stopStations.some((station) =>
          station.toLowerCase().includes(destinationStation.label.toLowerCase())
        )
      );

      const allSchedules = [...scheduleDataFinalDest, ...filteredSchedules];
      const schedulesWithTrainNames = await Promise.all(allSchedules.map(async (schedule) => {
        const trainName = await fetchTrainName(schedule.trainId);
        return { ...schedule, trainName };
      }));

      setSchedules(schedulesWithTrainNames);
    }
  } catch (error) {
    console.error('Error in fetching schedules:', error);
  }
};

const handleNotify = (scheduleItem) => {
  // Logic to handle notification (to be implemented)
  console.log('Notify button clicked for schedule:', scheduleItem);
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
                <th>Train Name</th>
                <th>Departure</th>
                <th>Arrival</th>
                {/* Add more table headers based on your schedule data */}
              </tr>
            </thead>
            <tbody>
              {schedules.map((scheduleItem, index) => (
                <tr key={index}>
                  <td>{scheduleItem.trainName}</td>
                  <td>{scheduleItem.departureTime}</td>
                  <td>{scheduleItem.arrivalTime}</td>
                  <td>
                    {isAuthenticated && ( // Show button only for authenticated users
                      <button className="btn btn-danger"onClick={() => handleNotify(scheduleItem)}>Notify</button>
                    )}
                  </td>
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
