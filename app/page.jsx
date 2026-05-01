'use client';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('../components/Viewer'), { 
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center', color: '#00FFFF', backgroundColor: '#050505', letterSpacing: '0.1em' }}>
      LOADING SWAY ENGINE...
    </div>
  )
});

const SIZE_GUIDE = {
  "S": { width: 54, length: 72.5, label: "1(S)" },
  "M": { width: 57, length: 73.5, label: "2(M)" },
  "L": { width: 60, length: 74.5, label: "3(L)" },
  "XL": { width: 63, length: 76.5, label: "4(XL)" }
};

export default function Home() {
  const [size, setSize] = useState("L");
  const [color, setColor] = useState("#00FFFF"); 
  const [faceUrl, setFaceUrl] = useState(null);
  const fileInputRef = useRef(null);

  const themeColors = [
    { name: 'Aqua', hex: '#00FFFF' },
    { name: 'Black', hex: '#111111' },
    { name: 'Purple', hex: '#8A2BE2' }
  ];

  const handleFaceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaceUrl(url);
    }
  };

  return (
    <main style={{ width: '100vw', height: '100vh', backgroundColor: '#050505', color: '#00FFFF', fontFamily: 'sans-serif', display: 'flex', overflow: 'hidden' }}>
      
      <div style={{ width: '300px', padding: '40px', borderRight: '1px solid #8A2BE2', display: 'flex', flexDirection: 'column', gap: '30px', background: 'rgba(0,0,0,0.8)', zIndex: 10 }}>
        <h2 style={{ letterSpacing: '2px', color: '#8A2BE2', margin: 0 }}>SWAY MAVERICK</h2>
        
        <div>
          <p style={{ fontSize: '12px', marginBottom: '10px', letterSpacing: '1px' }}>SELECT COLOR</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            {themeColors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c.hex)}
                style={{
                  width: '35px', height: '35px', borderRadius: '50%',
                  backgroundColor: c.hex, border: color === c.hex ? '3px solid white' : '1px solid #444',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: '12px', marginBottom: '10px', letterSpacing: '1px' }}>SIZE (OVERSIZED FIT)</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {Object.keys(SIZE_GUIDE).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  padding: '12px', backgroundColor: size === s ? '#00FFFF' : 'transparent',
                  color: size === s ? '#000' : '#00FFFF', border: '1px solid #00FFFF',
                  cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                {SIZE_GUIDE[s].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: '12px', marginBottom: '10px', letterSpacing: '1px' }}>FACE MAPPING</p>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFaceUpload} style={{ display: 'none' }} />
          <button 
            onClick={() => fileInputRef.current.click()}
            style={{
              width: '100%', padding: '12px', backgroundColor: 'transparent',
              color: '#8A2BE2', border: '1px solid #8A2BE2', cursor: 'pointer',
              fontWeight: 'bold', letterSpacing: '1px'
            }}
          >
            UPLOAD FACE
          </button>
        </div>

        <div style={{ marginTop: 'auto', fontSize: '10px', color: '#444', letterSpacing: '1px' }}>
          WE-WAVE-AGENCY © 2026
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <Viewer currentSize={size} tshirtColor={color} faceUrl={faceUrl} />
      </div>
    </main>
  );
}
