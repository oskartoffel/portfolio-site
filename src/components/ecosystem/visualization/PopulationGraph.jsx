// src/components/ecosystem/visualization/PopulationGraph.jsx
import React from 'react';

const PopulationGraph = ({ 
  title, 
  dataKey, 
  color, 
  maxPopulation, 
  yLabel,
  currentYear,
  populationData 
}) => {
  // Graph dimensions
  const graphWidth = 360;
  const graphHeight = 100;
  const padding = { top: 20, right: 30, bottom: 20, left: 40 };
  const innerWidth = graphWidth - padding.left - padding.right;
  const innerHeight = graphHeight - padding.top - padding.bottom;
  
  // Determine visible window for the graph
  const visibleYears = 20; // Show 20 years at a time
  
  // Calculate visible data range
  const startYear = Math.max(0, currentYear - visibleYears + 1);
  const visibleData = populationData.filter(d => d.year >= startYear && d.year <= currentYear);
  
  // Define scales based on visible window
  const xScale = innerWidth / (visibleYears - 1 || 1); // Avoid division by zero
  const yScale = innerHeight / maxPopulation;
  
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
  const numLabels = 6;
  for (let i = 0; i < numLabels; i++) {
    const yearOffset = Math.floor(i * (visibleYears - 1) / (numLabels - 1));
    visibleXLabels.push(startYear + yearOffset);
  }
  
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ 
        fontSize: '12px', 
        fontWeight: 'bold', 
        color: color,
        padding: '4px',
        marginBottom: '5px',
        textAlign: 'center'
      }}>
        {title}
      </div>
      
      <div style={{
        position: 'relative',
        width: `${graphWidth}px`,
        height: `${graphHeight}px`,
        border: '2px inset #aaa',
        backgroundColor: '#f8f8f8',
        margin: '0 auto'
      }}>
        {/* Y-axis grid lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = padding.top + i * (innerHeight / 4);
          const label = maxPopulation - i * (maxPopulation / 4);
          return (
            <React.Fragment key={`grid-y-${i}`}>
              <line 
                x1={padding.left} 
                y1={y} 
                x2={graphWidth - padding.right} 
                y2={y} 
                stroke="#ddd" 
                strokeWidth="1"
                style={{ position: 'absolute' }}
              />
              <div style={{ 
                position: 'absolute', 
                left: '2px', 
                top: `${y - 8}px`, 
                fontSize: '10px',
                color: '#666'
              }}>
                {label}
              </div>
            </React.Fragment>
          );
        })}
        
        {/* X-axis grid lines and labels - based on visible window */}
        {visibleXLabels.map((year, i) => {
          const x = padding.left + (i * innerWidth / (numLabels - 1));
          return (
            <React.Fragment key={`grid-x-${i}`}>
              <line 
                x1={x} 
                y1={padding.top} 
                x2={x} 
                y2={graphHeight - padding.bottom} 
                stroke="#ddd" 
                strokeWidth="1"
                style={{ position: 'absolute' }}
              />
              <div style={{ 
                position: 'absolute', 
                left: `${x - 10}px`, 
                bottom: '2px', 
                fontSize: '10px',
                color: '#666'
              }}>
                {year}
              </div>
            </React.Fragment>
          );
        })}
        
        {/* Y-axis label */}
        <div style={{ 
          position: 'absolute', 
          left: '-25px',
          top: '50%',
          transform: 'rotate(-90deg) translateX(50%)',
          fontSize: '10px',
          color: '#666'
        }}>
          {yLabel}
        </div>
        
        {/* X-axis label */}
        <div style={{ 
          position: 'absolute', 
          bottom: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          color: '#666'
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
              strokeWidth="2" 
            />
            
            {/* Current value marker */}
            {visibleData.length > 0 && (
              <circle 
                cx={padding.left + ((visibleData[visibleData.length - 1].year - startYear) * xScale)}
                cy={padding.top + innerHeight - (visibleData[visibleData.length - 1][dataKey] * yScale)}
                r="4"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
            )}
          </svg>
        )}
        
        {/* Current value text */}
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          fontSize: '12px',
          fontWeight: 'bold',
          padding: '2px 5px',
          backgroundColor: 'rgba(255,255,255,0.7)',
          border: `1px solid ${color}`,
          borderRadius: '3px',
          color: color
        }}>
          {currentValue}
        </div>
      </div>
    </div>
  );
};

export default PopulationGraph;