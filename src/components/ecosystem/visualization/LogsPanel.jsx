// src/components/ecosystem/visualization/LogsPanel.jsx
import React from 'react';

const LogsPanel = ({ logs, showLogs, onToggleLogs }) => {
  const getLogColor = (type) => {
    switch (type) {
      case 'error': return '#f44336';
      case 'system': return '#2196f3';
      case 'tree': return '#4caf50';
      case 'deer': return '#8B4513';
      case 'wolf': return '#555';
      default: return '#666';
    }
  };
  
  const renderLogs = () => {
    return (
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        border: '2px inset #aaa',
        backgroundColor: '#f8f8f8',
        padding: '10px',
        fontFamily: 'monospace',
        fontSize: '12px',
        lineHeight: '1.3'
      }}>
        {logs.map(log => (
          <div key={log.id} style={{ 
            marginBottom: '2px',
            paddingBottom: '2px',
            borderBottom: '1px solid #eee',
            color: getLogColor(log.type)
          }}>
            <span style={{ fontWeight: 'bold' }}>
              [Year {log.year}]
            </span> {log.message}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <>
      {/* Logs panel (collapsible) */}
      {showLogs && (
        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '10px',
          border: '2px outset #ddd',
          borderRadius: '3px',
          marginTop: '20px',
          width: '100%',
          maxWidth: '1200px',
          margin: '20px auto 0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <h2 style={{ 
              fontSize: '16px',
              margin: '0',
              color: '#2a8a43',
              fontFamily: 'Tahoma, Arial, sans-serif',
            }}>
              Simulation Logs
            </h2>
            
            {/* Export logs button removed per your request */}
          </div>
          
          {renderLogs()}
        </div>
      )}
    </>
  );
};

export default LogsPanel;