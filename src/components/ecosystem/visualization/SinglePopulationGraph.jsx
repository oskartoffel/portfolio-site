// src/components/ecosystem/visualization/SinglePopulationGraph.jsx
import React from 'react';

const SinglePopulationGraph = ({ 
  dataKey, 
  color, 
  maxValue,
  currentYear,
  populationData,
  valueLabel,
  title 
}) => {
  // Graph dimensions - keep it relatively compact
  const graphWidth = 220;
  const graphHeight = 100;
  const padding = { top: 15, right: 20, bottom: 20, left: 30 };
  const innerWidth = graphWidth - padding.left - padding.right;
  const innerHeight = graphHeight - padding.top - padding.bottom;
  
  // Determine visible window for the graph
  const visibleYears = 20; // Show 20 years at a time
  
  // Calculate visible data range
  const startYear = Math.max(0, currentYear - visibleYears + 1);
  const visibleData = populationData.filter(d => d.year >= startYear && d.year <= currentYear);
  
  // Define scales based on visible window
  const xScale = innerWidth / (visibleYears - 1 || 1); // Avoid division by zero
  const yScale = innerHeight / maxValue;
  
  // Generate line points for visible data only
  const points = visibleData.map((d) => {
    // Map year to x position relative to the visible window
    const x = padding.left + ((d.year - startYear) * xScale);
    const y = padding.top + innerHeight - (d[dataKey] * yScale);
    return `${x},${y}`;
  }).join(' ');
  
  // Current value is the latest data point
  const currentValue = populationData.length > 0 
    ? populationData[populationData.length - 1][dataKey] 
    : 0;
  
  // Calculate visible x-axis labels based on current window
  const visibleXLabels = [];
  const numLabels = 4; // Reduced number of labels for cleaner appearance
  for (let i = 0; i < numLabels; i++) {
    const yearOffset = Math.floor(i * (visibleYears - 1) / (numLabels - 1));
    visibleXLabels.push(startYear + yearOffset);
  }
  
  // Calculate visible y-axis labels based on maxValue
  const visibleYLabels = [];
  const numYLabels = 3; // Only show 3 y labels for cleanliness
  for (let i = 0; i < numYLabels; i++) {
    visibleYLabels.push(Math.round(maxValue * i / (numYLabels - 1)));
  }
  
  return (
    <div style={{ marginBottom: '10px' }}>
      {title && (
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          color, 
          textAlign: 'center',
          marginBottom: '5px'
        }}>
          {title}
        </div>
      )}
      
      <div style={{
        position: 'relative',
        width: `${graphWidth}px`,
        height: `${graphHeight}px`,
        backgroundColor: 'white',
        borderRadius: '4px',
        border: '1px solid #ddd',
        margin: '0 auto'
      }}>
        {/* Y-axis grid lines - much simpler */}
        {visibleYLabels.map((label, i) => {
          const y = padding.top + (numYLabels - 1 - i) * (innerHeight / (numYLabels - 1));
          return (
            <React.Fragment key={`grid-y-${i}`}>
              <line 
                x1={padding.left} 
                y1={y} 
                x2={graphWidth - padding.right} 
                y2={y} 
                stroke="#eee" 
                strokeWidth="1"
                style={{ position: 'absolute' }}
              />
              <div style={{ 
                position: 'absolute', 
                left: '2px', 
                top: `${y - 6}px`, 
                fontSize: '8px',
                color: '#999',
                width: '25px',
                textAlign: 'right'
              }}>
                {label}
              </div>
            </React.Fragment>
          );
        })}
        
        {/* X-axis grid lines and labels - minimal */}
        {visibleXLabels.map((year, i) => {
          const x = padding.left + (i * innerWidth / (numLabels - 1));
          return (
            <React.Fragment key={`grid-x-${i}`}>
              <line 
                x1={x} 
                y1={padding.top} 
                x2={x} 
                y2={graphHeight - padding.bottom} 
                stroke="#eee" 
                strokeWidth="1"
                style={{ position: 'absolute' }}
              />
              <div style={{ 
                position: 'absolute', 
                left: `${x - 8}px`, 
                bottom: '2px', 
                fontSize: '8px',
                color: '#999'
              }}>
                {year}
              </div>
            </React.Fragment>
          );
        })}
        
        {/* X-axis label - minimized */}
        <div style={{ 
          position: 'absolute', 
          bottom: '1px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '8px',
          color: '#999'
        }}>
          Year
        </div>
        
        {/* Population line - only for visible data */}
        {visibleData.length > 1 && (
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <polyline 
              points={points} 
              fill="none" 
              stroke={color} 
              strokeWidth="1.5" 
            />
            
            {/* Current value marker */}
            {visibleData.length > 0 && (
              <circle 
                cx={padding.left + ((visibleData[visibleData.length - 1].year - startYear) * xScale)}
                cy={padding.top + innerHeight - (visibleData[visibleData.length - 1][dataKey] * yScale)}
                r="3"
                fill="white"
                stroke={color}
                strokeWidth="1.5"
              />
            )}
          </svg>
        )}
        
        {/* Current value text - compact */}
        <div style={{
          position: 'absolute',
          top: '3px',
          right: '5px',
          fontSize: '10px',
          fontWeight: 'bold',
          backgroundColor: 'rgba(255,255,255,0.7)',
          border: `1px solid ${color}`,
          borderRadius: '2px',
          padding: '1px 3px',
          color: color
        }}>
          {currentValue}
        </div>
      </div>
    </div>
  );
};

export default SinglePopulationGraph;