import '../components/Button.css'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ScheduleImg from '../assets/Schedule.jpg'
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';



function Schedules() {
  const [currentStation, setCurrentStation] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [notificationPhoneNumber, setNotificationPhoneNumber] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Function to hide the message after a delay
  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        setNotificationMessage('');
        closeModal();
      }, 5000); // Adjust the time (in milliseconds) as needed
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  const handleSearch = () => {
    if (!currentStation || !destinationStation) {
      setValidationError('Both current and destination stations are required.');
      return;
    }

    setValidationError('');

    // Implement the search logic here and update the schedules state
    // For example:
    // const foundSchedules = ... // Fetch schedules from the backend
    // setSchedules(foundSchedules);
    setSchedules(dummySchedules);
  };

  const handleNotify = (scheduleId) => {
    openModal();
    // Additional logic to handle notifications here
  };

  const handleNotification = () => {
    if (!validatePhoneNumber(notificationPhoneNumber)) {
      setValidationError('Please enter a valid phone number.');
      return;
    }

    setValidationError('');

    // Implement the logic to send notifications using notificationPhoneNumber
    setNotificationMessage('You will receive an SMS shortly on departure.');
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^[0-9]{10}$/; // Modify the pattern according to your requirements
    return phonePattern.test(phoneNumber);
  };

  const dummySchedules = [
    {
      id: 1,
      trainNumber: 'ABC123',
      departureTime: '09:00 AM',
      arrivalTime: '11:30 AM',
    },
    {
      id: 2,
      trainNumber: 'XYZ456',
      departureTime: '12:30 PM',
      arrivalTime: '03:00 PM',
    },
    // Add more dummy schedule objects here
  ];

  const stationOptions = [
    { value: 'station1', label: 'Station 1' },
    { value: 'station2', label: 'Station 2' },
    { value: 'station3', label: 'Station 3' },
    // Add more station options here
  ];


 

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
                options={stationOptions}
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
                options={stationOptions}
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
        {validationError && (
          <div className="alert alert-danger mt-3">{validationError}</div>
        )}
      </div>

      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Train Number</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.trainNumber}</td>
                <td>{schedule.departureTime}</td>
                <td>{schedule.arrivalTime}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleNotify(schedule.id)}
                  >
                    Notify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Phone Number for Notification:</label>
            <input
              type="text"
              className="form-control"
              value={notificationPhoneNumber}
              onChange={(e) => setNotificationPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          {notificationMessage && (
            <div className="alert alert-success mt-3">{notificationMessage}</div>
          )}
          {validationError && (
            <div className="alert alert-danger mt-3">{validationError}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNotification}>
            Notify
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
}

export default Schedules;
