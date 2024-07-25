import React, { useState } from 'react';
import axios from 'axios';
import './AddLocation.css';

const AddLocation = () => {
    const [formData, setFormData] = useState({
        name: '',
        locationType: '',
        station: '',
        image: null,
        description: '',
        additionalDetails: '',
        rating: 0,
    });

    const stations = [
        'Churchgate', 'Mumbai CST', 'Dadar', 'Lokmanya Tilak', 'Andheri', 'Borivali', 
        'Kalyan', 'Thane', 'Mumbai LTT', 'Mumbai Dadar', 'Mumbai Bandra', 'Mumbai Kurla', 
        'Mumbai Vile Parle', 'Boisar', 'Palghar', 'Kelve Road', 'Virar', 'Vasai Road',
    ];

    const locationTypes = ['Park', 'Beach', 'Forest', 'Temple', 'Mountain', 'Other'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleRating = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('locationType', formData.locationType);
        data.append('station', formData.station);
        data.append('image', formData.image);
        data.append('description', formData.description);
        data.append('additionalDetails', formData.additionalDetails);
        data.append('rating', formData.rating);

        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8080/api/addlocation',
                data: data,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Location added successfully:', response.data);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="inner_container">
                <div className="form_right">
                    <form onSubmit={handleSubmit} className="picnic_form_inner">
                        <h1>Add Location</h1>

                        <div>
                            <label className="Lable">Location Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input_field"
                                required
                            />
                        </div>

                        <div>
                            <label className="Lable">Location Type:</label>
                            <select
                                name="locationType"
                                value={formData.locationType}
                                onChange={handleChange}
                                className="dropdown"
                                required
                            >
                                <option value="" disabled>Type of Location</option>
                                {locationTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="Lable">Nearby Station:</label>
                            <select
                                name="station"
                                value={formData.station}
                                onChange={handleChange}
                                className="dropdown"
                                required
                            >
                                <option value="" disabled>Select station</option>
                                {stations.map((station, index) => (
                                    <option key={index} value={station}>{station}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="Lable">Image:</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="input_field_img"
                                required
                            />
                        </div>

                        <div>
                            <label className="Lable">Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input_field"
                                required
                            />
                        </div>

                        <div>
                            <label className="Lable">Your Review:</label>
                            <input
                                type="text"
                                name="additionalDetails"
                                value={formData.additionalDetails}
                                onChange={handleChange}
                                className="input_field"
                            />
                        </div>

                        <div className="rating_container">
                            <label className="Lable">Rating:</label>
                            <div className="rating_stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${formData.rating >= star ? 'filled' : ''}`}
                                        onClick={() => handleRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="black_btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLocation;
