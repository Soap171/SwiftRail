import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';

const Userdetails = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);

    const handleLogout = () => {
        logout(); // Call the logout function from the context
        navigate('/'); // Redirect to the home page after logout
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            // Check if the user is logged in
            if (!userData) return;

            // Fetch user details from the Supabase database based on their NIC
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
                        </div>
                    </div>
                    <div className="col-md-9 mt-4 mb-4">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="general">
                                <form className="row g-3 p-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control" value={userData.userName} readOnly />
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
                                    <button className='btn btn-primary' onClick={handleLogout}>Log out</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userdetails;
