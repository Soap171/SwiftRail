import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';

const Userdetails = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [parcelBookings, setParcelBookings] = useState([]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userData) return;

            const { data, error } = await supabase
                .from('customer')
                .select('NIC, userName, contactNo, address, email')
                .eq('NIC', userData.NIC)
                .single();

            if (error) {
                console.error('Error fetching user details:', error);
            } else if (data) {
                setUserDetails(data);
            }
        };

        fetchUserDetails();
    }, [userData]);

    useEffect(() => {
        const fetchParcelBookings = async () => {
            if (!userData || !userData.NIC) {
                console.error('User data or NIC is missing or undefined.');
                return;
            }
    
            const { data: bookings, error } = await supabase
                .from('parcelBooking')
                .select('parcelId, status')
                .eq('senderNIC', userData.NIC);
    
            if (error) {
                console.error('Error fetching parcel bookings:', error);
            } else if (bookings) {
                setParcelBookings(bookings);
            }
        };
    
        fetchParcelBookings();
    }, [userData]);
    

    return (
        <div className="container light-style flex-grow-1 container-p-y">
            <h4 className="font-weight-bold py-3 mb-4">
                Hello, {userData.userName}
            </h4>
            <div className="card overflow-hidden">
                <div className="row no-gutters row-bordered row-border-light">
                    <div className="col-md-3 pt-0">
                        <div className="list-group list-group-flush account-settings-links">
                            <a className="list-group-item list-group-item-action show active" data-bs-toggle="list" href="#general">General</a>
                            <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#parcel-details">Parcel Details</a>
                        </div>
                    </div>
                    <div className="col-md-9 mt-4 mb-4">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="general">
                                <form className="row g-3 p-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control" value={userDetails?.userName || ''} readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Contact Number</label>
                                        <input type="text" className="form-control" value={userDetails?.contactNo || ''} readOnly />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" value={userDetails?.address || ''} readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">NIC</label>
                                        <input type="text" className="form-control" value={userDetails?.NIC || ''} readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" value={userDetails?.email || ''} readOnly />
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="parcel-details">
                                <div className="row g-3 p-3">
                                    {parcelBookings.map((booking, index) => (
                                        <div key={index} className="col-md-6">
                                            <label className="form-label">Parcel ID</label>
                                            <input type="text" className="form-control" value={booking.parcelId} readOnly />
                                            <label className="form-label">Parcel Status</label>
                                            <input type="text" className="form-control" value={booking.status} readOnly />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userdetails;
