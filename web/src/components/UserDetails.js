import React from 'react';

const Userdetails = () => {
    return (
        <div className="container light-style flex-grow-1 container-p-y">
            <h4 className="font-weight-bold py-3 mb-4">
                Hello, User
            </h4>
            <div className="card overflow-hidden">
                <div className="row no-gutters row-bordered row-border-light">
                    <div className="col-md-3 pt-0">
                        <div className="list-group list-group-flush account-settings-links">
                            <a className="list-group-item list-group-item-action show active" data-bs-toggle="list" href="#general">General</a>
                            <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#change-password">Change password</a>
                            <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#parcel-details">Parcel Details</a>
                            <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#subscription">Subscription</a>
                        </div>
                    </div>
                    <div className="col-md-9 mt-4 mb-4">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="general">
                                <form className="row g-3 p-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control" value="JohnDoe" readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Contact Number</label>
                                        <input type="text" className="form-control" value="123-456-7890" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" value="123 Main St, City" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">NIC</label>
                                        <input type="text" className="form-control" value="123456789" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" value="johndoe@example.com" />
                                    </div>
                                    <button className='btn  btn-primary'>Update</button>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="change-password">
                                <form className="row g-3 p-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Old Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">New Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Confirm New Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <button className='btn  btn-primary'>Update</button>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="parcel-details">
                                <div className="row g-3 p-3">
                                    <div className="col-12">
                                        <label className="form-label">Parcel Tracking Number</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Parcel Status</label>
                                        <input type="text" className="form-control" readOnly value="In Transit" />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="subscription">
                                <div className="row g-3 p-3">
                                    <div className="col-12">
                                        <label className="form-label">Subscription Plan</label>
                                        <input type="text" className="form-control" value="Premium Plan" readOnly />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Available Amount</label>
                                        <input type="text" className="form-control" value="$50.00" readOnly />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Duration</label>
                                        <input type="text" className="form-control" value="1 Year" readOnly />
                                    </div>
                                    <button className='btn  btn-primary'>Renew Subscription</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userdetails;
