// src/components/ecosystem/visualization/LogsPanel.jsx
import React from 'react';

const LogsPanel = ({ logs, showLogs, onToggleLogs, onExportLogs }) => {
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
          <h2 style={{ 
            fontSize: '16px', 
            textAlign: 'center', 
            margin: '0 0 10px 0',
            borderBottom: '1px solid #ccc',
            paddingBottom: '5px'
          }}>
            Simulation Logs
          </h2>
          {renderLogs()}
        </div>
      )}
    </>
  );
};

export default LogsPanel;