import {useLocation} from 'react-router';
import React from 'react';

function NotFound() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default NotFound