'use client';
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getRecommendedSize } from '../lib/sizeCharts';

const Viewer = dynamic(() => import('../components/Viewer'), { ssr: false });

export default function Home() {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("#00FFFF");
  const [fit, setFit] = useState('oversized');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [faceUrl, setFaceUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSize(getRecommendedSize(height, weight));
  }, [height, weight]);

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#050505', color: '#00FFFF', fontFamily: 'monospace' }}>
      <div style={{ width: '350px', padding: '30px', borderRight: '1px solid #1a1a1a', background: 'black', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontSize: '24px', letterSpacing: '4px', color: 'white' }}>SWAY<span style={{ color: '#00FFFF' }}>3D</span></h1>
        
        <div>
          <label>FIT TYPE:</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => setFit('oversized')} style={{ flex: 1, padding: '10px', background: fit === 'oversized' ? '#00FFFF' : 'transparent', color: fit === 'oversized' ? 'black' : '#00FFFF', border: '1px solid #00FFFF', cursor: 'pointer' }}>OVERSIZED</button>
            <button onClick={() => setFit('regular')} style={{ flex: 1, padding: '10px', background: fit === 'regular' ? '#00FFFF' : 'transparent', color: fit === 'regular' ? 'black' : '#00FFFF', border: '1px solid #00FFFF', cursor: 'pointer' }}>REGULAR</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label>HEIGHT (CM)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#00FFFF', marginTop: '5px' }} />
          </div>
          <div>
            <label>WEIGHT (KG)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#00FFFF', marginTop: '5px' }} />
          </div>
        </div>

        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '4px' }}>
          <label style={{ fontSize: '12px' }}>AI RECOMMENDATION:</label>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>SIZE {size}</div>
        </div>

        <button onClick={() => fileInputRef.current.click()} style={{ width: '100%', padding: '15px', background: 'transparent', border: '2px dashed #00FFFF', color: '#00FFFF', cursor: 'pointer', fontWeight: 'bold' }}>UPLOAD FACE</button>
        <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => setFaceUrl(URL.createObjectURL(e.target.files[0]))} />

        <div style={{ marginTop: 'auto', color: '#444', fontSize: '10px' }}>WE-WAVE-AGENCY © 2026</div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <Viewer currentSize={size} tshirtColor={color} faceUrl={faceUrl} fitType={fit} />
      </div>
    </main>
  );
}
