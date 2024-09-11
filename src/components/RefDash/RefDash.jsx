import React from 'react';
import './RefDash.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function RefDash() {
  return (
    <div className="container">
      <div>
        <p>This is the ref dashboard</p>
      </div>
    </div>
  );
}

export default RefDash;
