import React from 'react';

const CarCard = ({ name, dealer, image }) => {
  return (
    <div className="car-card">
      <img className="car-image" src={image} alt={name} />
      <div className="car-details">
        <h3 className="car-name" style={{

        }}>{name}</h3>
        <p className="car-price">
            <b>Posted By </b>
            {dealer}</p>
      </div>
    </div>
  );
};

export default CarCard;
