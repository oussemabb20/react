import React from 'react';
import notfoundImage from '../../notfound.jfif';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <img src={notfoundImage} alt="404 Not Found" style={{ maxWidth: '600px', width: '100%' }} />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
