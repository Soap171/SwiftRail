import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';

const Userdetails = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [editableFields, setEditableFields] = useState({
        contactNo: false,
        address: false,
        email: false,
    });

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
                                                        className="btn btn-secondary"
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
                                                        className="btn btn-secondary"
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
                                                        className="btn btn-secondary"
                                                        onClick={() => setEditableFields({ ...editableFields, email: true })}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <button className="btn btn-primary" onClick={handleLogout}>
                                        Log out
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userdetails;
