// src/components/ecosystem/visualization/StatisticsPanel.jsx
import React from 'react';
import StatisticsCard from './StatisticsCard';

const StatisticsPanel = ({ stats, showLogs, onToggleLogs, onExportLogs, logs }) => {
  return (
    <div style={{ 
      width: '220px',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      border: '2px outset #ddd',
      borderRadius: '3px'
    }}>
      <h2 style={{ 
        fontSize: '16px', 
        textAlign: 'center', 
        margin: '0 0 15px 0',
        borderBottom: '1px solid #ccc',
        paddingBottom: '5px'
      }}>
        Detailed Statistics
      </h2>
      
      <StatisticsCard 
        title="TREES" 
        stats={{
          total: stats.trees.total,
          "Avg Age": stats.trees.averageAge?.toFixed(1) || 0,
          Seedlings: stats.trees.ageDistribution?.seedling || 0,
          Young: stats.trees.ageDistribution?.young || 0,
          Mature: stats.trees.ageDistribution?.mature || 0,
          Deaths: stats.trees.totalDeaths || 0,
          "By Age": stats.trees.ageDeaths || 0,
          "By Stress": stats.trees.stressDeaths || 0,
          Eaten: stats.trees.consumedByDeer || 0
        }} 
        color="#228B22" 
        iconEmoji="🌲"
      />
      
      <StatisticsCard 
        title="DEER" 
        stats={{
          total: stats.deer.total,
          "Avg Age": stats.deer.averageAge?.toFixed(1) || 0,
          "Reproduced": stats.deer.reproducedCount || 0,
          "Migrated": stats.deer.migratedCount || 0,
          "Foraging": stats.deer.averageForagingSuccess || 'N/A',
          Deaths: (stats.deer.starvationDeaths || 0) + (stats.deer.ageDeaths || 0) + (stats.deer.predationDeaths || 0),
          "By Age": stats.deer.ageDeaths || 0,
          "By Starvation": stats.deer.starvationDeaths || 0,
          "By Predation": stats.deer.predationDeaths || 0
        }} 
        color="#8B4513" 
        iconEmoji="🦌"
      />
      
      <StatisticsCard 
        title="WOLVES" 
        stats={{
          total: stats.wolves.total,
          "Avg Age": stats.wolves.averageAge?.toFixed(1) || 0,
          "Reproduced": stats.wolves.reproducedCount || 0,
          "Migrated": stats.wolves.migratedCount || 0,
          "Hunting": stats.wolves.averageHuntingSuccess || 'N/A',
          "Prey Killed": stats.wolves.preyKilled || 0,
          Deaths: (stats.wolves.starvationDeaths || 0) + (stats.wolves.ageDeaths || 0),
          "By Age": stats.wolves.ageDeaths || 0,
          "By Starvation": stats.wolves.starvationDeaths || 0
        }} 
        color="#555" 
        iconEmoji="🐺"
      />
      
      {/* Log control buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '15px',
        gap: '5px'
      }}>
        <button
          onClick={onToggleLogs}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: showLogs ? '#4caf50' : '#e0e0e0',
            color: showLogs ? 'white' : 'black',
            border: '2px outset #ddd',
            borderRadius: '3px',
            cursor: 'pointer',
            flex: 1
          }}
        >
          {showLogs ? 'Hide Logs' : 'Show Logs'}
        </button>
        
        <button
          onClick={onExportLogs}
          disabled={logs.length === 0}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: logs.length === 0 ? '#e0e0e0' : '#2196f3',
            color: logs.length === 0 ? '#999' : 'white',
            border: '2px outset #ddd',
            borderRadius: '3px',
            cursor: logs.length === 0 ? 'default' : 'pointer',
            opacity: logs.length === 0 ? 0.7 : 1,
            flex: 1
          }}
        >
          Export Logs
        </button>
      </div>
    </div>
  );
};

export default StatisticsPanel;