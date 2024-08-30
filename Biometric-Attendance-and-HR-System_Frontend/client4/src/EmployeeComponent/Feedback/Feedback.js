import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Feedback.css';

const Feedback = ({ email }) => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (feedback.trim() === '') {
            alert('Please enter your feedback before submitting.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/feedback/', { message: feedback, giver: email });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('There was an error submitting your feedback. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="feedback-popup">
            <div className="feedback-popup-content">
                <h1>Employee Feedback</h1>
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="feedback-form">
                        <label htmlFor="feedback">Your Feedback:</label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            value={feedback}
                            onChange={handleChange}
                            rows="10"
                            placeholder="Enter your feedback here..."
                            className="feedback-text"
                        ></textarea>
                        <div className="feedback-form-buttons">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="feedback-confirmation">
                        <p>Thank you for your feedback!</p>
                        <button onClick={() => navigate('/')} className="cancel-button">Go Back</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feedback;
