import React, { useEffect, useRef, useState } from 'react';
import './Customizer.css';

function Customizer() {
    const [thickness, setThickness] = useState(1);
    const [generalScale, setGeneralScale] = useState(1);
    const [size, setSize] = useState({ x: 1, y: 1, z: 1 });
    
    return (
        <div className="customizer-container">
            <div className="customizer-controls">
                <div className="control-group">
                    <label>Thickness:</label>
                    <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={thickness}
                        onChange={(e) => setThickness(parseFloat(e.target.value))}
                    />
                    <input
                        type="number"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={thickness}
                        onChange={(e) => setThickness(parseFloat(e.target.value))}
                    />
                </div>

                <div className="control-group">
                    <label>General Scale:</label>
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={generalScale}
                        onChange={(e) => setGeneralScale(parseFloat(e.target.value))}
                    />
                    <input
                        type="number"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={generalScale}
                        onChange={(e) => setGeneralScale(parseFloat(e.target.value))}
                    />
                </div>

                <div className="control-group">
                    <label>Size (X):</label>
                    <input
                        type="number"
                        value={size.x}
                        onChange={(e) => setSize({ ...size, x: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="control-group">
                    <label>Size (Y):</label>
                    <input
                        type="number"
                        value={size.y}
                        onChange={(e) => setSize({ ...size, y: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="control-group">
                    <label>Size (Z):</label>
                    <input
                        type="number"
                        value={size.z}
                        onChange={(e) => setSize({ ...size, z: parseFloat(e.target.value) })}
                    />
                </div>
            </div>
        </div>
    );
}       

export default Customizer;
