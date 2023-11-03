import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import BookingImg from '../assets/Booking.jpg';
import '../components/Button.css';
import supabase from '../config/supabaseClient';
import { useAuth } from '../components/AuthContext';

export default function Booking() {
  const { userData } = useAuth();

  const initialFormData = {
    senderName: userData ? userData.userName : '',
    senderPhone: '',
    senderNIC: userData ? userData.NIC : '',
    senderRailwayStation: '',
    recipientName: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientNIC: '',
    recipientRailwayStation: '',
    parcelDescription: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [railwayStations, setRailwayStations] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchRailwayStations = async () => {
      const { data, error } = await supabase.from('railwayStation').select('*');
      if (error) {
        console.error('Error fetching railway stations:', error);
      } else {
        setRailwayStations(data);
      }
    };

    fetchRailwayStations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insert data into the 'parcelBooking' table in Supabase
      const { data, error } = await supabase
        .from('parcelBooking')
        .insert([
          {
            parcelContent: formData.parcelDescription,
            senderContactNo: formData.senderPhone,
            senderName: formData.senderName,
            recipientContactNo: formData.recipientPhone,
            recipientName: formData.recipientName,
            recipientNIC: formData.recipientNIC,
            senderNIC: formData.senderNIC,
            stationId: formData.senderRailwayStation,
            destinationStationId: formData.recipientRailwayStation,
          },
        ]);

        if (error) {
          console.error('Error inserting data:', error);
          // Handle error (e.g., display an error message)
        } else {
          // Data inserted successfully
          // Handle success (e.g., show a success message)
          setShowSuccessAlert(true);
          setFormData(initialFormData);
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 60000);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
  };

  return (
    <div>
      <NavBar />
      <Hero
        cName="hero-other"
        heroImg={BookingImg}
        title="Book Your Parcel Here"
        text=""
      />

      <div className="container mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <h2>Sender Details</h2>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              name="senderName"
              placeholder="Sender's Name"
              value={formData.senderName}
              onChange={handleInputChange}
             
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="tel"
              className="form-control"
              name="senderPhone"
              placeholder="Sender's Phone"
              value={formData.senderPhone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              name="senderNIC"
              placeholder="Sender's NIC"
              value={formData.senderNIC}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-2">
            <select
              className="form-control"
              name="senderRailwayStation"
              required
              value={formData.senderRailwayStation}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select Sender's Railway Station</option>
              {railwayStations.map(station => (
                <option key={station.stationId} value={station.stationId}>
                  {station.city}
                </option>
              ))}
            </select>
          </div>

          <h2 className='mt-5'>Recipient Details</h2>
          <div className="form-group mt-2">
            <select
              className="form-control"
              name="recipientRailwayStation"
              required
              value={formData.recipientRailwayStation}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select Recipient's Railway Station</option>
              {railwayStations.map(station => (
                <option key={station.stationId} value={station.stationId}>
                  {station.city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              name="recipientAddress"
              required
              placeholder="Recipient's Address"
              value={formData.recipientAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="tel"
              className="form-control"
              name="recipientPhone"
              placeholder="Recipient's Phone"
              required
              value={formData.recipientPhone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              name="recipientNIC"
              placeholder="Recipient's NIC"
              required
              value={formData.recipientNIC}
              onChange={handleInputChange}
            />
          </div>

          
          <div className="form-group">
            <label className='mt-5'>Parcel Description</label>
            <textarea
              className="form-control mt-2"
              name="parcelDescription"
              placeholder="Enter Parcel Description"
              required
              value={formData.parcelDescription}
              onChange={handleInputChange}
            />
          </div>
         

          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
