'use client';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('../components/Viewer'), { 
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center', color: '#00FFFF', backgroundColor: '#050505' }}>
      LOADING SWAY ENGINE...
    </div>
  )
});

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

  return (
    <main style={{ width: '100vw', height: '100vh', backgroundColor: '#050505', display: 'flex', overflow: 'hidden' }}>
      <div style={{ width: '300px', padding: '40px', borderRight: '1px solid #8A2BE2', background: 'rgba(0,0,0,0.9)', zIndex: 10 }}>
        <h2 style={{ color: '#8A2BE2', letterSpacing: '2px' }}>SWAY MAVERICK</h2>
        
        <div style={{ marginTop: '30px' }}>
          <p style={{ color: '#00FFFF', fontSize: '12px' }}>COLOR SELECTOR</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {themeColors.map((c) => (
              <button key={c.hex} onClick={() => setColor(c.hex)} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: c.hex, border: color === c.hex ? '2px solid white' : '1px solid #444', cursor: 'pointer' }} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <p style={{ color: '#00FFFF', fontSize: '12px' }}>SIZE SELECTOR</p>
          {['S', 'M', 'L', 'XL'].map((s) => (
            <button key={s} onClick={() => setSize(s)} style={{ padding: '10px', margin: '5px', backgroundColor: size === s ? '#00FFFF' : 'transparent', color: size === s ? '#000' : '#00FFFF', border: '1px solid #00FFFF', cursor: 'pointer' }}>{s}</button>
          ))}
        </div>

        <div style={{ marginTop: '30px' }}>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setFaceUrl(URL.createObjectURL(e.target.files[0]))} style={{ display: 'none' }} />
          <button onClick={() => fileInputRef.current.click()} style={{ width: '100%', padding: '10px', border: '1px solid #8A2BE2', color: '#8A2BE2', cursor: 'pointer', background: 'transparent' }}>UPLOAD FACE</button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <Viewer currentSize={size} tshirtColor={color} faceUrl={faceUrl} />
      </div>
    </main>
  );
}
