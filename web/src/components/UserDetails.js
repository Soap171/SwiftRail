import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import QRCode from 'qrcode';

const Userdetails = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [parcelBookings, setParcelBookings] = useState([]);
    const [editableFields, setEditableFields] = useState({
        contactNo: false,
        address: false,
        email: false,
    });
    const [qrCodeImage, setQRCodeImage] = useState('');
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const updateField = async (field) => {
        const updates = {
            [field]: userDetails[field],
        };
        const { data, error } = await supabase
            .from('customer')
            .update(updates)
            .eq('NIC', userData.NIC);

        if (error) {
            console.error('Error updating the field:', error);
        } else if (data) {
            console.log('Field updated successfully');
            setEditableFields({ ...editableFields, [field]: false });
        }
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

    useEffect(() => {
        const fetchSubscriptionDetails = async () => {
          if (!userData || !userData.NIC) return;
      
          const { data, error } = await supabase
            .from('customerSubscription')
            .select('subscriptionId, balance')
            .eq('customerNIC', userData.NIC)
            .single();
      
          if (error) {
            console.error('Error fetching subscription details:', error);
          } else if (data) {
            setSubscriptionDetails(data);
            generateQRCode();
          }
        };
      
        fetchSubscriptionDetails();
      }, [userData, userDetails]);

      const generateQRCode = async () => {
        if (subscriptionDetails && userData) {
          const qrData = JSON.stringify({
            transactionID: subscriptionDetails.subscriptionId,
            customerNIC: userData.NIC,
            balance: subscriptionDetails.balance || 0, // Include 'balance' in the QR code
          });
      
          // Use the data object directly without stringifying
          QRCode.toDataURL(qrData, (err, url) => {
            if (err) {
              console.error('Error generating QR code:', err);
            } else {
              setQRCodeImage(url); // Save the generated QR code image URL
            }
          });
        }
      };
      

    return (
        <div className="container light-style flex-grow-1 container-p-y">
            <h4 className="font-weight-bold py-3 mb-4">
                Hello, {userData.userName}
            </h4>
            <div className="card overflow-hidden mb-5 bg-light.bg-gradient">
                <div className="row no-gutters row-bordered row-border-light">
                    <div className="col-md-3 pt-0">
                        <div className="list-group list-group-flush account-settings-links">
                            <a className="list-group-item list-group-item-action show active" data-bs-toggle="list" href="#general">General</a>
                            <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#parcel-details">Parcel Details</a>
                            <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#subscription">Subscription Details</a>
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
                                        {editableFields.contactNo ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={userDetails?.contactNo || ''}
                                                    onChange={(e) =>
                                                        setUserDetails({ ...userDetails, contactNo: e.target.value })
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => updateField('contactNo')}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <input type="text" className="form-control" value={userDetails?.contactNo || ''} readOnly />
                                                {editableFields.contactNo === false && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary mt-2"
                                                        onClick={() => setEditableFields({ ...editableFields, contactNo: true })}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Address</label>
                                        {editableFields.address ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={userDetails?.address || ''}
                                                    onChange={(e) =>
                                                        setUserDetails({ ...userDetails, address: e.target.value })
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => updateField('address')}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <input type="text" className="form-control" value={userDetails?.address || ''} readOnly />
                                                {editableFields.address === false && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary mt-2"
                                                        onClick={() => setEditableFields({ ...editableFields, address: true })}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">NIC</label>
                                        <input type="text" className="form-control" value={userDetails?.NIC || ''} readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        {editableFields.email ? (
                                            <>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={userDetails?.email || ''}
                                                    onChange={(e) =>
                                                        setUserDetails({ ...userDetails, email: e.target.value })
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => updateField('email')}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <input type="email" className="form-control" value={userDetails?.email || ''} readOnly />
                                                {editableFields.email === false && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary mt-2"
                                                        onClick={() => setEditableFields({ ...editableFields, email: true })}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </form>
                                <button className="btn btn-danger mt-3" onClick={handleLogout}>
                                    Log Out
                                </button>
                            </div>
                            <div className="tab-pane fade" id="parcel-details">
                                {parcelBookings.length === 0 ? (
                                    <div className="row g-3 p-3">
                                        <div className="col-md-12">
                                            <p>You don't have any parcel details yet.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row g-3 p-3">
                                        {parcelBookings.map((booking, index) => (
                                            <div key={index} className="col-md-6">
                                                <label className="form-label">Parcel ID</label>
                                                <input type="text" className="form-control" value={booking.parcelId} readOnly />
                                                <label className="form-label mt-2">Parcel Status</label>
                                                <input type="text" className="form-control mb-5" value={booking.status} readOnly />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="tab-pane fade" id="subscription">
                                {!subscriptionDetails ? (
                                    <div className="row g-3 p-3">
                                        <div className="col-md-12">
                                            <p>You don't have any subscription plans subscribed.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row g-3 p-3">
                                        <div>
                                            <label className="form-label">Subscription ID</label>
                                            <input type="text" className="form-control" value={subscriptionDetails?.subscriptionId || ''} readOnly />
                                            <label className="form-label">Balance</label>
                                            <input type="text" className="form-control" value={subscriptionDetails?.balance || ''} readOnly />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                          <img src={qrCodeImage} alt="Updated QR Code" style={{ width: '200px', height: '200px', display: 'block' }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                           </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userdetails;
