import SceneContainer from './components/3d/SceneContainer';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Customizer from './components/UI/Customizer';

function App() {

  const [sceneSize, setSceneSize] = useState({ width: 400, height: 225 });

  useEffect(() => {
      const handleResize = () => {
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;
          const width = screenWidth / 2;
          const height = (width / 9) * 16; // Maintain 16:9 aspect ratio
          setSceneSize({ width, height });
      };

      handleResize(); // Set initial size
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
    <div className="app-container">
      <Customizer />
      <SceneContainer sceneSize={sceneSize} />
    </div>
  </div>
);
}

export default App;
