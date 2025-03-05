// src/components/ecosystem/visualization/CanvasTreeDensityGrid.jsx
import React, { useRef, useEffect, useState } from 'react';

const CanvasTreeDensityGrid = ({ simulationManager }) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 320, height: 320 });
  const [simulationData, setSimulationData] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  
  // Configuration values
  const gridDimension = 100; // Original 100x100 grid
  const densityGridSize = 20; // 20x20 visualization grid
  const maxTreesPerCell = 25; // 5x5 cells could have at most 25 trees
  
  // Force update every 500ms to ensure visualization stays current with simulation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUpdateTrigger(prev => prev + 1);
    }, 500);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Calculate and update density grid when simulation changes
  useEffect(() => {
    if (!simulationManager?.treeManager) return;
    
    // Calculate density grid
    const densityGrid = calculateDensityGrid(simulationManager);
    
    // Store the data for rendering
    setSimulationData(densityGrid);
  }, [simulationManager, updateTrigger]);
  
  // Update canvas when simulation data changes
  useEffect(() => {
    if (!simulationData || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Render the fluid gradient visualization
    renderFluidGradient(ctx, simulationData, canvas.width, canvas.height);
    
  }, [simulationData, canvasSize]);
  
  // Calculate density grid from simulation data
  const calculateDensityGrid = (simulationManager) => {
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
  
  // Render a truly fluid gradient based on density values
  const renderFluidGradient = (ctx, densityGrid, width, height) => {
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
  
  // Get forest color using a natural color palette
  const getForestColor = (normalizedDensity) => {
    // Define a natural forest color palette with multiple reference points
    // These colors are sampled from actual forest imagery
    const forestPalette = [
      { density: 0.0,  color: { r: 171, g: 145, b: 68 } },  // Barren/desert
      { density: 0.1,  color: { r: 147, g: 155, b: 60 } },  // Very sparse vegetation
      { density: 0.2,  color: { r: 122, g: 154, b: 62 } },  // Beginning greenery
      { density: 0.3,  color: { r: 95,  g: 141, b: 64 } },  // Light forest
      { density: 0.4,  color: { r: 76,  g: 130, b: 60 } },  // Medium light forest
      { density: 0.5,  color: { r: 56,  g: 114, b: 56 } },  // Medium forest (darker)
      { density: 0.6,  color: { r: 42,  g: 105, b: 52 } },  // Medium dense forest
      { density: 0.7,  color: { r: 30,  g: 96,  b: 48 } },  // Dense forest
      { density: 0.85, color: { r: 24,  g: 110, b: 45 } },  // Very dense forest
      { density: 1.0,  color: { r: 18,  g: 140, b: 40 } },  // Exceptionally dense, vibrant forest
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
  
  // Handle resize
  useEffect(() => {
    const updateCanvasSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        // Make canvas a square based on the smaller dimension
        const size = Math.min(container.clientWidth - 20, 320);
        setCanvasSize({ width: size, height: size });
      }
    };
    
    // Initial size
    updateCanvasSize();
    
    // Add resize listener
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);
  
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          border: '2px solid #888',
          boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.3)',
          borderRadius: '3px'
        }}
      />
      
      <div style={{ 
        marginTop: '10px', 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '11px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ 
            width: '180px', 
            height: '15px', 
            background: 'linear-gradient(to right, rgb(171, 145, 68), rgb(95, 141, 64), rgb(56, 114, 56), rgb(30, 96, 48), rgb(18, 140, 40))'
          }}></div>
          <span style={{ whiteSpace: 'nowrap' }}>Forest Density</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasTreeDensityGrid;