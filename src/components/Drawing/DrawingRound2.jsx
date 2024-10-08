import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Drawing.css';
import NavPlayer from '../NavPlayer/NavPlayer'; 

function DrawingRound2() {
  const location = useLocation();
  const { teamName, gameCode, eventId, teamId } = location.state;
  
  const [theme, setTheme] = useState('');
  const [prompt, setPrompt] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = React.createRef();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        const eventData = response.data[0];
        setTheme(eventData.theme);
        setPrompt(eventData.prompt_two);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSnapClick = () => {
    fileInputRef.current.click();
  };

  const handleRetakeClick = () => {
    window.location.reload();
  };

  const submitPhoto = () => {
    if (photo) {
      const formData = new FormData();
      formData.append('file', photo);
      formData.append('upload_preset', import.meta.env.VITE_PRESET_NAME);

      axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData)
        .then(response => {
          const drawing_url = response.data.secure_url;
          return axios.post('/api/drawings', {
            team_id: teamId,
            drawing_url: drawing_url,
            round: 2
          });
        })
        .then(() => {
          setIsSubmitted(true);
        })
        .catch(err => {
          console.error('Error:', err.message);
          alert('Error occurred during photo submission.');
        });
    } else {
      alert('Please take a photo before submitting.');
    }
  };

  const closePopupAndRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="drawing-container">
      <header className="header">
        <NavPlayer className="hamburger-right" />
      </header>
      <div className="main-content">
        <div className="left-panel">
          <div className="table-box">
            <div className="table-header">TEAM</div>
            <div className="table-content">{teamName || "N/A"}</div>
          </div>

          <div className="table-box">
            <div className="table-header">GAME</div>
            <div className="table-content">{gameCode || "N/A"}</div>
          </div>

          <div className="table-box">
            <div className="table-header">THEME</div>
            <div className="table-content">{theme || "N/A"}</div>
          </div>

          <div className="table-box">
            <div className="table-header">PROMPT 2</div>
            <div className="table-content">{prompt || "N/A"}</div>
          </div>
        </div>

        <div className="center-panel" onClick={handleSnapClick} style={{ cursor: 'pointer' }}>
          {!photo ? (
            <div className="center-panel-text">
              Tap here to take a photo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <img
              src={URL.createObjectURL(photo)}
              alt="Captured"
              className="captured-image"
              style={{ width: '300px', height: 'auto' }}
            />
          )}
        </div>

        <div className="right-panel">
          <button className="action-button" onClick={handleRetakeClick}>RETAKE</button>
          <button className="action-button" onClick={submitPhoto}>SUBMIT</button>
        </div>

        {isSubmitted && (
          <div className="popup">
            <div className="popup-content">
              <h2>Submitted!</h2>
              <p>Your photo is submitted successfully.</p>
              <button className="close-button" onClick={closePopupAndRefresh}>Okay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DrawingRound2;
