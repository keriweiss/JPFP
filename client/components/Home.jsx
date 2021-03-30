import React from 'react';

const Home = () => {
  return (
    <div id='homeContainer'>
      <div id='schoolHome'>
        <div className='homeImg'>
          <div className='homeOverlay'>
            <h2>ACADEMIC EXCELLENCE</h2>
            <p className='homeExanded'>Seems legit.</p>
          </div>
          <img src='assets/funStudents.jpg' width='800px' />
        </div>
        <div className='homeImg'>
          <div className='homeOverlay'>
            <h2>CAMPUS LOOKS EXACTLY LIKE VERSAILLES</h2>
            <p className='homeExanded'>Seriously!</p>
          </div>
          <img src='assets/versailles.jpg' width='800px' />
        </div>
        <div className='homeImg'>
          <div className='homeOverlay'>
            <h2>ARTISTIC INNOVATION</h2>
            <p className='homeExanded'>Painting paintings.</p>
          </div>
          <img src='assets/gallery.jpg' width='600px' />
        </div>
      </div>
    </div>
  );
};

export default Home;
