import React from 'react';

function Message({ message }) {
  return (
    <div style={{
      backgroundColor: '#e0f7fa',
      color: '#00796b',
      border: '1px solid #b2dfdb',
      padding: '0.75rem',
      borderRadius: '5px',
      marginBottom: '1rem',
    }}>
      {message}
    </div>
  );
}

export default Message;
