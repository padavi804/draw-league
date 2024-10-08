import React from 'react';
import './ProBest.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProBest({socket}) {

const dispatch = useDispatch();
    const currentGame = useSelector((store) => store.currentGame)
    const ref = useSelector((store) => store.projectionReducer);
    const history = useHistory();
  
  console.log({currentGame});
  
    // useEffect(() => {
    //   if(currentGame){
    //   dispatch({ type: "FETCH_REFS", payload: {currentGame} });}
    // }, [currentGame, dispatch]);
  const winners = useSelector((store) => store.adminDashReducer);
  


  useEffect(() => {
    dispatch({ type: 'FETCH_WINNERS', payload: {currentGame} });
  }, [dispatch]);
  
    useEffect(() => {
      if (socket) {
        const handleNavigation = (direction) => {
          console.log(`Navigating to: ${direction}`);
          if(direction === 'next') {
            history.push('/ProContactUs'); 
          }
          else if(direction === 'back') {
            history.push('/prowinners_1');
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
    <div className="winners">
      <div className="winners-top">
        <button
          className="judge-view-title winners-title"
          onClick={() => window.location.reload()}
        >
          TOP DRAWING
        </button>
        {/* <button
          className="judge-view-title winners-title best-link"
          
        >
          REVEAL LEADERBOARD
        </button> */}
      </div>
      <div className="winners-list">
        <div
          className="winner"
          style={{
            
          }}
        >
          <div className="winner-drawing">
            {/* <img className="best-img" src={currentGame.drawing_url}alt="" /> */}
          </div>
          {/* <div className="winner-name">{currentGame.team_name}</div> */}
         
        </div>
      </div>
      {/* <button
          className="judge-view-title winners-title best-link best-exit"
          
        >
          EXIT
        </button> */}
    </div>
  );
}

export default ProBest;
