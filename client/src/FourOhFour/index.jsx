import React from 'react';
import { Link } from 'react-router-dom';

const FourOhFour = () => (
  <div>
    <p>
      That page does not exist. <Link to="/">Go Home</Link>
    </p>
  </div>
);

export default FourOhFour;
