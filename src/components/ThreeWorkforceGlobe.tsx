import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, ShieldCheck, Zap, Globe2 } from 'lucide-react';

interface ThreeWorkforceGlobeProps {
  interactive?: boolean;
}

export const ThreeWorkforceGlobe: React.FC<ThreeWorkforceGlobeProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePipeline, setActivePipeline] = useState<string>('UP ➔ Mysore Automotive Hub');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer
    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;
    camera.position.y = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group for all rotating objects
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Central Core Sphere (Dark metallic translucent with glowing wireframe)
    const sphereGeo = new THREE.SphereGeometry(6, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0c1a30,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(innerSphere);

    // Inner subtle glow core
    const coreGeo = new THREE.SphereGeometry(5.4, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06284d,
      transparent: true,
      opacity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 2. Orbital Industrial Gear / Ring Elements
    const ringGeo1 = new THREE.RingGeometry(6.8, 7.1, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.2;
    globeGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(7.4, 7.55, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    globeGroup.add(ring2);

    // 3. Coordinate conversion helper (Lat/Long to 3D Sphere coordinates)
    const latLongToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Regional Hubs coordinates mapped onto sphere
    const locations = [
      { name: 'Mysore Hub (Tandavpura)', lat: 12.3, lon: 76.6, color: 0xf59e0b, radius: 0.35, pulse: true },
      { name: 'Uttar Pradesh (Varanasi/Gorakhpur)', lat: 26.8, lon: 82.9, color: 0x06b6d4, radius: 0.28 },
      { name: 'Bihar (Patna/Gaya)', lat: 25.6, lon: 85.1, color: 0x38bdf8, radius: 0.28 },
      { name: 'Jharkhand (Ranchi/Dhanbad)', lat: 23.3, lon: 85.3, color: 0x22d3ee, radius: 0.28 },
      { name: 'Nanjangud Industrial Cluster', lat: 12.1, lon: 76.7, color: 0xf59e0b, radius: 0.2 },
      { name: 'Kadakola Belt (TVS Plant)', lat: 12.2, lon: 76.65, color: 0xf59e0b, radius: 0.2 },
      { name: 'Hebbal & Hootagalli Belt', lat: 12.35, lon: 76.58, color: 0xf59e0b, radius: 0.2 },
    ];

    const hubVectors: { [key: string]: THREE.Vector3 } = {};

    locations.forEach((loc) => {
      const pos = latLongToVector3(loc.lat, loc.lon, 6.05);
      hubVectors[loc.name] = pos;

      const nodeGeo = new THREE.SphereGeometry(loc.radius, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: loc.color });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      globeGroup.add(nodeMesh);

      // Glowing aura around nodes
      const haloGeo = new THREE.RingGeometry(loc.radius * 1.3, loc.radius * 2.2, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: loc.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos);
      halo.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(halo);
    });

    // 4. Energy Arcs / Conduits connecting North India to Mysore
    const mysorePos = hubVectors['Mysore Hub (Tandavpura)'];
    const upPos = hubVectors['Uttar Pradesh (Varanasi/Gorakhpur)'];
    const biharPos = hubVectors['Bihar (Patna/Gaya)'];
    const jharkhandPos = hubVectors['Jharkhand (Ranchi/Dhanbad)'];

    const conduits = [
      { start: upPos, end: mysorePos, color: 0xf59e0b, label: 'UP ➔ Mysore Auto Lines' },
      { start: biharPos, end: mysorePos, color: 0x06b6d4, label: 'Bihar ➔ FMCG / Beverage' },
      { start: jharkhandPos, end: mysorePos, color: 0x38bdf8, label: 'Jharkhand ➔ Logistics & Heavy Loading' },
    ];

    const particleStreams: { curve: THREE.QuadraticBezierCurve3; points: THREE.Points; offsets: number[] }[] = [];

    conduits.forEach((c) => {
      if (!c.start || !c.end) return;

      // Calculate arched midpoint
      const mid = new THREE.Vector3().addVectors(c.start, c.end).multiplyScalar(0.5);
      const midDistance = mid.length();
      mid.normalize().multiplyScalar(midDistance + 2.2); // arch outwards

      const curve = new THREE.QuadraticBezierCurve3(c.start, mid, c.end);
      const curvePoints = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: c.color,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(line);

      // Flowing particles along the conduit curve
      const particleCount = 18;
      const pPositions = new Float32Array(particleCount * 3);
      const pOffsets: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        pOffsets.push(i / particleCount);
        const p = curve.getPoint(i / particleCount);
        pPositions[i * 3] = p.x;
        pPositions[i * 3 + 1] = p.y;
        pPositions[i * 3 + 2] = p.z;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: c.color,
        size: 0.35,
        transparent: true,
        opacity: 0.9,
      });
      const pSystem = new THREE.Points(pGeo, pMat);
      globeGroup.add(pSystem);

      particleStreams.push({ curve, points: pSystem, offsets: pOffsets });
    });

    // 5. Star / Industrial ambient particles in surrounding space
    const starGeo = new THREE.BufferGeometry();
    const starCount = 200;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 40;
      starPos[i + 1] = (Math.random() - 0.5) * 40;
      starPos[i + 2] = (Math.random() - 0.5) * 40;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x475569,
      size: 0.12,
      transparent: true,
      opacity: 0.5,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Initial globe tilt to frame India prominently
    globeGroup.rotation.y = -Math.PI / 1.7;
    globeGroup.rotation.x = 0.3;

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = globeGroup.rotation.y;
    let targetRotationX = globeGroup.rotation.x;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotationY = -Math.PI / 1.7 + mouseX * 0.4;
      targetRotationX = 0.3 - mouseY * 0.3;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth camera/globe interpolation
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.05 + 0.0015;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;

      // Move particles along curves
      particleStreams.forEach((stream) => {
        const positions = stream.points.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < stream.offsets.length; i++) {
          stream.offsets[i] = (stream.offsets[i] + 0.004) % 1;
          const pos = stream.curve.getPoint(stream.offsets[i]);
          positions[i * 3] = pos.x;
          positions[i * 3 + 1] = pos.y;
          positions[i * 3 + 2] = pos.z;
        }
        stream.points.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Interval to cycle active pipeline telemetry
    const pipelineInterval = setInterval(() => {
      const pipelines = [
        'UP (Varanasi / Gorakhpur) ➔ Kadakola TVS Plant [145 Workers]',
        'Bihar (Patna / Gaya) ➔ Tandavpura Paperboat Unit [98 Workers]',
        'Jharkhand (Ranchi / Dhanbad) ➔ Nanjangud Coca-Cola Bottling [112 Workers]',
        'Tandavpura Central Reserve ➔ 100+ km Rapid Deployment [35 Workers]',
      ];
      setActivePipeline(pipelines[Math.floor(Math.random() * pipelines.length)]);
    }, 4000);

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      clearInterval(pipelineInterval);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div 
      className="relative w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Futuristic Background Radial Sheen */}
      <div className="absolute inset-0 bg-radial-gradient from-industrial-850/20 via-transparent to-industrial-950 pointer-events-none" />

      {/* Floating Industrial HUD Badges */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-industrial-900/80 border border-safety-amber/40 backdrop-blur-md text-xs font-mono text-safety-amber">
        <span className="w-2 h-2 rounded-full bg-safety-amber animate-ping" />
        <span>LIVE 3D WORKFORCE PIPELINE</span>
      </div>

      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-industrial-900/80 border border-blueprint-cyan/40 backdrop-blur-md text-xs font-mono text-blueprint-cyan">
        <Globe2 className="w-3.5 h-3.5" />
        <span>MYSORE INDUSTRIAL NEXUS</span>
      </div>

      {/* Real-time Telemetry Bar at bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-10 glass-panel rounded-2xl p-3 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-safety-amber/10 border border-safety-amber/30 text-safety-amber">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <p className="text-slate-400 font-medium">Active Deployment Corridor</p>
            <p className="text-slate-100 font-semibold font-mono">{activePipeline}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-300 font-mono">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>500+ ON ROLL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blueprint-cyan" />
            <span>100% STATUTORY COMPLIANT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
