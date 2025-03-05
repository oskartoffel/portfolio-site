// src/components/ecosystem/visualization/TreeDensityGrid.jsx
import React from 'react';

const TreeDensityGrid = ({ simulationManager }) => {
  if (!simulationManager?.treeManager) return null;
  
  // Create a density map from the 100x100 grid
  // For visualization, we'll use a 20x20 density grid (5x5 cells aggregated)
  const gridDimension = 100; // Original 100x100 grid
  const densityGridSize = 20; // 20x20 visualization grid
  const cellSize = 15; // Display cell size
  
  const densityGrid = Array(densityGridSize).fill().map(() => Array(densityGridSize).fill(0));
  const maxTreesPerCell = 25; // 5x5 cells could have at most 25 trees
  
  // Calculate tree density
  simulationManager.treeManager.trees.forEach((tree, index) => {
    if (tree && tree.position !== 0) {
      // Convert linear position to x,y in 100x100 grid
      const x = index % gridDimension;
      const y = Math.floor(index / gridDimension);
      
      // Map to density grid position
      const densityX = Math.floor(x / (gridDimension / densityGridSize));
      const densityY = Math.floor(y / (gridDimension / densityGridSize));
      
      // Increment density counter if within bounds
      if (densityX < densityGridSize && densityY < densityGridSize) {
        densityGrid[densityY][densityX]++;
      }
    }
  });
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${densityGridSize}, ${cellSize}px)`,
    gap: '1px',
    margin: '0 auto',
    border: '2px solid #888',
    padding: '2px',
    backgroundColor: '#c0c0c0',
    width: `${cellSize * densityGridSize + densityGridSize}px`,
    height: `${cellSize * densityGridSize + densityGridSize}px`,
    boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.3)'
  };
  
  // Color function for density
  const getDensityColor = (density) => {
    // Calculate density percentage
    const percentage = Math.min(1, density / maxTreesPerCell);
    
    if (percentage === 0) {
      return '#a0a0a0'; // Empty cell
    }
    
    // Green shades based on density
    if (percentage < 0.2) {
      return '#dab88b'; // Light brown for very sparse
    } else if (percentage < 0.4) {
      return '#c2e088'; // Light green-yellow for sparse
    } else if (percentage < 0.6) {
      return '#8ed861'; // Light green for medium
    } else if (percentage < 0.8) {
      return '#4caf50'; // Green for dense
    } else {
      return '#2e7d32'; // Dark green for very dense
    }
  };
  
  return (
    <div>
      <div style={gridStyle}>
        {densityGrid.flatMap((row, y) => 
          row.map((density, x) => {
            return (
              <div 
                key={`${x}-${y}`} 
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: getDensityColor(density),
                  border: '1px outset #ddd',
                  boxSizing: 'border-box'
                }} 
                title={`Density: ${density} trees`}
              />
            );
          })
        )}
      </div>
      
      <div style={{ 
        marginTop: '10px', 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        fontSize: '11px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#dab88b' }}></div>
          <span>Very sparse</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#c2e088' }}></div>
          <span>Sparse</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#8ed861' }}></div>
          <span>Medium</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#4caf50' }}></div>
          <span>Dense</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#2e7d32' }}></div>
          <span>Very dense</span>
        </div>
      </div>
    </div>
  );
};

export default TreeDensityGrid;