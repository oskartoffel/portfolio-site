// src/components/ecosystem/visualization/CompactStatsCard.jsx
import React from 'react';

const CompactStatsCard = ({ 
  title, 
  stats, 
  color, 
  iconEmoji
}) => {
  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: color,
        color: 'white',
        fontWeight: 'bold',
        padding: '3px 6px',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '3px 3px 0 0',
        gap: '5px'
      }}>
        {iconEmoji && <span>{iconEmoji}</span>}
        <span>{title}</span>
      </div>
      
      {/* Content - Clean two-column grid */}
      <div style={{ 
        border: '1px solid #ddd',
        borderTop: 'none',
        borderRadius: '0 0 3px 3px',
        backgroundColor: 'white',
        padding: '5px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          rowGap: '3px',
          columnGap: '10px'
        }}>
          {Object.entries(stats).map(([key, value]) => (
            <React.Fragment key={key}>
              <div style={{ 
                textAlign: 'left', 
                fontSize: '10px',
                color: '#666'
              }}>
                {key}:
              </div>
              <div style={{ 
                textAlign: 'right', 
                fontWeight: key === 'total' ? 'bold' : 'normal', 
                fontSize: '10px',
                color: key === 'total' ? color : '#333'
              }}>
                {typeof value === 'number' ? 
                  (Number.isInteger(value) ? value : value.toFixed(1)) : 
                  value}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompactStatsCard;