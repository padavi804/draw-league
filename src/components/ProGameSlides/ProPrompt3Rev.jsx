import React, { useState } from 'react';
import '../RefDash/RefDash.css';
import './ProPrompts.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import Timer from '../RefDash/ProTimer';
import logo from '../RefDash/drawleague.png';
import { useSelector } from 'react-redux';

function ProPrompt3Rev({socket}){

  const history = useHistory();
  const currentGame = useSelector((store) => store.currentGame)
    useEffect(() => {
      if (socket) {
        const handleNavigation = (direction) => {
          console.log(`Navigating to: ${direction}`);
          if(direction === 'next') {
            history.push('/prowinners_1'); 
          }
          else if(direction === 'back') {
            history.push('/proprompt3blk');
          }
        };
  
        socket.on('navigate', handleNavigation);
        console.log('socket.id', socket.id);
        return () => {
          socket.off('navigate', handleNavigation);
        };
      }
    }, [socket, history]);

return (
    
    <div className="dashboard-container">
      <div className="top-portion">
        <div className="timer-container">
          <Timer socket={socket}/>
        </div>
        <div className="theme-container-reveal">
          <span className="theme-label">THEME</span>
          <div className="theme-display-reveal">{currentGame.theme}</div>
        </div>
      </div>
     
      <div className="body-content">
        <div className='dash-logo-container'>
          <img src={logo} alt="DRAW LEAGUE LOGO" className="logo-image" />
        </div>

        <div className="right-content">
          <div className="prompt-container">
          <h2 className="prompt-header">PROMPT #3</h2>
           <div className="prompts-rev">{currentGame.prompt_three}</div>
          </div>
          <div className="square-containers">
            <div className="square-box">Leaderboard</div>
            <div className="square-box">Future ADs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProPrompt3Rev;
