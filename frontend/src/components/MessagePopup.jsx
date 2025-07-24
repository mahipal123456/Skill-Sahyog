import React, { useEffect, useState } from 'react';
import { useMessage } from '../contexts/MessageContext';

const MessagePopup = () => {
  const { message, setMessage } = useMessage();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message) {
      let percent = 100;
      const interval = setInterval(() => {
        percent -= 1;
        setProgress(percent);
        if (percent <= 0) {
          clearInterval(interval);
          setMessage(null);
        }
      }, 30); // 3 seconds total

      return () => clearInterval(interval);
    }
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={() => setMessage(null)}>
          &times;
        </button>
        <p style={styles.text}>{message}</p>
        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 10000,
  },
  popup: {
    backgroundColor: '#fefefe',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '16px 24px 12px 16px',
    minWidth: '250px',
    maxWidth: '300px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '12px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#555',
    cursor: 'pointer',
  },
  text: {
    margin: 0,
    fontSize: '1rem',
    color: '#333',
  },
  progressBarContainer: {
    marginTop: '10px',
    height: '4px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.03s linear',
  },
};

export default MessagePopup;
