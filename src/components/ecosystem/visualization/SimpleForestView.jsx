// src/components/ecosystem/visualization/SimpleForestView.jsx
import React, { useRef, useState, useEffect } from 'react';

const SimpleForestView = ({ simulationManager, currentYear }) => {
  // Define hooks at the top level (not conditionally)
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  
  // Original grid dimension and visualization parameters
  const gridDimension = 100; // Original 100x100 grid
  const densityGridSize = 20; // 20x20 visualization grid
  const cellSize = 15; // Display cell size
  const maxTreesPerCell = 25; // 5x5 cells could have at most 25 trees
  
  // Calculate density grid from simulation data
  const calculateDensityGrid = () => {
    if (!simulationManager?.treeManager) return Array(densityGridSize).fill().map(() => Array(densityGridSize).fill(0));
    
    const densityGrid = Array(densityGridSize).fill().map(() => Array(densityGridSize).fill(0));
    
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
    
    return densityGrid;
  };
  
  // Force redraw every 500ms to ensure visualization stays current
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (canvasRef.current && simulationManager?.treeManager) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const densityGrid = calculateDensityGrid();
        renderForestCanvas(ctx, densityGrid, canvas.width, canvas.height);
      }
    }, 500);
    
    return () => clearInterval(intervalId);
  }, [simulationManager]);
  
  // Render the forest on the canvas when currentYear changes
  useEffect(() => {
    if (!canvasRef.current || !simulationManager?.treeManager) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const densityGrid = calculateDensityGrid();
    
    // Render the fluid gradient visualization
    renderForestCanvas(ctx, densityGrid, canvas.width, canvas.height);
  }, [simulationManager, currentYear]);
  
  // Also handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const container = canvasRef.current.parentElement;
      if (container) {
        // Calculate the available space, accounting for padding
        const availableWidth = container.clientWidth - 20; // 10px padding on each side
        // Cap the size at a reasonable maximum and minimum
        const size = Math.min(Math.max(availableWidth, 200), 280);
        setCanvasSize({ width: size, height: size });
      }
    };
    
    // Initial sizing
    handleResize();
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get forest color using a natural color palette
  const getForestColor = (normalizedDensity) => {
    // Define a natural forest color palette with multiple reference points
    const forestPalette = [
      { density: 0.0,  color: { r: 187, g: 157, b: 70 } },  // Barren/desert
      { density: 0.03, color: { r: 161, g: 162, b: 60 } },  // Very sparse vegetation
      { density: 0.07, color: { r: 136, g: 167, b: 51 } },  // Beginning greenery
      { density: 0.11, color: { r: 104, g: 173, b: 39 } },  // Light forest
      { density: 0.15, color: { r: 72,  g: 162, b: 33 } },  // Medium light forest
      { density: 0.22, color: { r: 21,  g: 143, b: 23 } },  // Medium forest
      { density: 0.31, color: { r: 17,  g: 124, b: 21 } },  // Medium dense forest
      { density: 0.42, color: { r: 11,  g: 99,  b: 19 } },  // Dense forest
      { density: 0.55, color: { r: 6,   g: 76,  b: 17 } },  // Very dense forest
      { density: 1.0,  color: { r: 0,   g: 50,  b: 14 } },  // Extremely dense forest
    ];    
    
    // Find the two palette entries to interpolate between
    let lower = forestPalette[0];
    let upper = forestPalette[forestPalette.length - 1];
    
    for (let i = 0; i < forestPalette.length - 1; i++) {
      if (normalizedDensity >= forestPalette[i].density && 
          normalizedDensity <= forestPalette[i + 1].density) {
        lower = forestPalette[i];
        upper = forestPalette[i + 1];
        break;
      }
    }
    
    // Calculate how far between the two points we are (0 to 1)
    const range = upper.density - lower.density;
    const t = range === 0 ? 0 : (normalizedDensity - lower.density) / range;
    
    // Interpolate between the two colors
    return {
      r: Math.round(lower.color.r + t * (upper.color.r - lower.color.r)),
      g: Math.round(lower.color.g + t * (upper.color.g - lower.color.g)),
      b: Math.round(lower.color.b + t * (upper.color.b - lower.color.b))
    };
  };
  
  // Render the forest on the canvas
  const renderForestCanvas = (ctx, densityGrid, width, height) => {
    // Clear the canvas first
    ctx.clearRect(0, 0, width, height);
    
    // First create an ImageData object to work with pixel data directly
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Increase effective resolution for smoother interpolation
    const interpolationFactor = 2; // Higher means smoother transitions
    const effectiveGridSize = densityGridSize * interpolationFactor;
    
    // Create a higher resolution density map for smoother transitions
    const highResGrid = Array(effectiveGridSize).fill().map(() => Array(effectiveGridSize).fill(0));
    
    // Interpolate the original grid to the higher resolution grid
    for (let y = 0; y < effectiveGridSize; y++) {
      for (let x = 0; x < effectiveGridSize; x++) {
        // Map to original grid coordinates
        const origX = (x / interpolationFactor);
        const origY = (y / interpolationFactor);
        
        const x0 = Math.floor(origX);
        const y0 = Math.floor(origY);
        const x1 = Math.min(x0 + 1, densityGridSize - 1);
        const y1 = Math.min(y0 + 1, densityGridSize - 1);
        
        // Calculate interpolation weights
        const weightX = origX - x0;
        const weightY = origY - y0;
        
        // Get density values at the four corners
        const q00 = densityGrid[y0]?.[x0] || 0;
        const q01 = densityGrid[y0]?.[x1] || 0;
        const q10 = densityGrid[y1]?.[x0] || 0;
        const q11 = densityGrid[y1]?.[x1] || 0;
        
        // Bilinear interpolation
        highResGrid[y][x] = 
          q00 * (1 - weightX) * (1 - weightY) +
          q01 * weightX * (1 - weightY) +
          q10 * (1 - weightX) * weightY +
          q11 * weightX * weightY;
      }
    }
    
    // Apply a simple smoothing pass to further reduce blockiness
    const smoothedGrid = smoothGrid(highResGrid, effectiveGridSize);
    
    // Scale factors for mapping canvas pixels to high res grid
    const xScale = effectiveGridSize / width;
    const yScale = effectiveGridSize / height;
    
    // For each pixel in the canvas
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Find the four nearest grid points for interpolation
        const gridX = x * xScale;
        const gridY = y * yScale;
        
        const x0 = Math.floor(gridX);
        const y0 = Math.floor(gridY);
        const x1 = Math.min(x0 + 1, effectiveGridSize - 1);
        const y1 = Math.min(y0 + 1, effectiveGridSize - 1);
        
        // Calculate interpolation weights
        const weightX = gridX - x0;
        const weightY = gridY - y0;
        
        // Get density values at the four corners
        const q00 = smoothedGrid[y0]?.[x0] || 0;
        const q01 = smoothedGrid[y0]?.[x1] || 0;
        const q10 = smoothedGrid[y1]?.[x0] || 0;
        const q11 = smoothedGrid[y1]?.[x1] || 0;
        
        // Bilinear interpolation for smooth density value
        const density = 
          q00 * (1 - weightX) * (1 - weightY) +
          q01 * weightX * (1 - weightY) +
          q10 * (1 - weightX) * weightY +
          q11 * weightX * weightY;
        
        // Normalize density
        const normalizedDensity = Math.min(1, density / maxTreesPerCell);
        
        // Get color for this density using our forest color palette
        const color = getForestColor(normalizedDensity);
        
        // Set pixel value in ImageData
        const pixelIndex = (y * width + x) * 4;
        data[pixelIndex] = color.r;     // Red
        data[pixelIndex + 1] = color.g; // Green
        data[pixelIndex + 2] = color.b; // Blue
        data[pixelIndex + 3] = 255;     // Alpha (fully opaque)
      }
    }
    
    // Draw the image data to canvas
    ctx.putImageData(imageData, 0, 0);
    
    // Add a subtle texture overlay
    addSubtleTexture(ctx, width, height);
  };
  
  // Apply a simple smoothing pass to the grid
  const smoothGrid = (grid, size) => {
    const result = Array(size).fill().map(() => Array(size).fill(0));
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let sum = 0;
        let count = 0;
        
        // Consider a 3x3 window around the current point
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
              sum += grid[ny][nx];
              count++;
            }
          }
        }
        
        result[y][x] = sum / count;
      }
    }
    
    return result;
  };
  
  // Add subtle texture overlay for more natural look
  const addSubtleTexture = (ctx, width, height) => {
    ctx.save();
    
    // Use multiply blend mode
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.05;
    
    // Create noise pattern
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2 + 0.5;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
      ctx.fill();
    }
    
    ctx.restore();
  };
  
  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center'
    }}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          borderRadius: '3px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          maxWidth: '100%' // Ensure it never exceeds its container
        }}
      />
      
      {/* Simplified color scale (much smaller and subtler) */}
      <div style={{
        width: '150px',
        height: '8px',
        background: 'linear-gradient(to right, rgb(171, 145, 68), rgb(95, 141, 64), rgb(38, 83, 38), rgb(24, 80, 39))',
        margin: '5px 0 2px 0',
        borderRadius: '4px'
      }}></div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '150px',
        fontSize: '10px',
        color: '#666'
      }}>
        <span>Low</span>
        <span>Forest Density</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default SimpleForestView;