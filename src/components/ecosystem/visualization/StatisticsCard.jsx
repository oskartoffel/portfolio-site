// src/components/ecosystem/visualization/StatisticsCard.jsx
import React from 'react';

const StatisticsCard = ({ title, stats, color, iconEmoji }) => {
  return (
    <div style={{ 
      backgroundColor: '#f0f0f0', 
      border: `1px solid ${color}`,
      borderRadius: '2px',
      padding: '8px',
      fontSize: '12px',
      width: '100%',
      marginBottom: '10px'
    }}>
      <div style={{ 
        fontWeight: 'bold', 
        backgroundColor: color, 
        color: 'white',
        padding: '4px', 
        marginBottom: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }}>
        <span>{iconEmoji}</span>
        <span>{title}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
        {Object.entries(stats).map(([key, value]) => (
          <React.Fragment key={key}>
            <div style={{ textAlign: 'left', fontSize: '11px' }}>{key}:</div>
            <div style={{ textAlign: 'right', fontWeight: key === 'total' ? 'bold' : 'normal', fontSize: '11px' }}>
              {typeof value === 'number' ? 
                (Number.isInteger(value) ? value : value.toFixed(1)) : 
                value}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCard;