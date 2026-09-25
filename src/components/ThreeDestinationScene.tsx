import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Destination, Hotspot3D } from '../types/travel';
import { soundManager } from '../utils/soundEffects';
import {
  Compass,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sun,
  Sunrise,
  Moon,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

interface Props {
  destination: Destination;
  activeHotspotId?: string;
  onSelectHotspot?: (hotspot: Hotspot3D) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

type TimeOfDay = 'dawn' | 'afternoon' | 'night';

export const ThreeDestinationScene: React.FC<Props> = ({
  destination,
  activeHotspotId,
  onSelectHotspot,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot3D | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot3D | null>(null);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const hotspotMeshesRef = useRef<{ mesh: THREE.Group; hotspot: Hotspot3D }[]>([]);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const campfireLightRef = useRef<THREE.PointLight | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);

  // Sound toggle
  const handleToggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.toggleAmbient(!nextState);
  };

  // Fly camera to a point
  const flyTo = useCallback((pos: [number, number, number], target: [number, number, number]) => {
    targetCamPosRef.current = new THREE.Vector3(...pos);
    targetLookAtRef.current = new THREE.Vector3(...target);
    soundManager.playTap();
  }, []);

  // Reset Camera View
  const handleResetCamera = () => {
    flyTo([16, 14, 20], [0, 2, 0]);
    setSelectedHotspot(null);
  };

  // Apply Lighting for Time of Day
  useEffect(() => {
    if (!sceneRef.current || !dirLightRef.current || !hemiLightRef.current) return;

    if (timeOfDay === 'dawn') {
      sceneRef.current.background = new THREE.Color(0xec9f74);
      sceneRef.current.fog = new THREE.FogExp2(0xdf9468, 0.022);
      dirLightRef.current.color.setHex(0xffaa66);
      dirLightRef.current.intensity = 1.4;
      dirLightRef.current.position.set(25, 8, -15);
      hemiLightRef.current.color.setHex(0xffbb88);
      hemiLightRef.current.groundColor.setHex(0x443322);
    } else if (timeOfDay === 'afternoon') {
      sceneRef.current.background = new THREE.Color(0x7ec0ee);
      sceneRef.current.fog = new THREE.FogExp2(0x9bcbed, 0.015);
      dirLightRef.current.color.setHex(0xfff3db);
      dirLightRef.current.intensity = 2.0;
      dirLightRef.current.position.set(15, 30, 20);
      hemiLightRef.current.color.setHex(0xb1e1ff);
      hemiLightRef.current.groundColor.setHex(0x3b5323);
    } else {
      // Night
      sceneRef.current.background = new THREE.Color(0x060c18);
      sceneRef.current.fog = new THREE.FogExp2(0x091424, 0.025);
      dirLightRef.current.color.setHex(0x6b8eb9);
      dirLightRef.current.intensity = 0.5;
      dirLightRef.current.position.set(-15, 20, -15);
      hemiLightRef.current.color.setHex(0x19273c);
      hemiLightRef.current.groundColor.setHex(0x080f1a);
    }
  }, [timeOfDay]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x7ec0ee);
    scene.fog = new THREE.FogExp2(0x9bcbed, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(16, 14, 20);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't dip below ground
    controls.minDistance = 4;
    controls.maxDistance = 50;
    controls.target.set(0, 2, 0);
    controlsRef.current = controls;

    // Ambient & Hemisphere Lighting
    const hemiLight = new THREE.HemisphereLight(0xb1e1ff, 0x3b5323, 1.2);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Sun Directional Light with Shadows
    const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
    dirLight.position.set(15, 30, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 80;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Campfire flickering light (warm point light)
    const campfire = new THREE.PointLight(0xff7722, 2.5, 12);
    campfire.position.set(-2, 2.2, 7);
    campfire.castShadow = true;
    scene.add(campfire);
    campfireLightRef.current = campfire;

    // --- PROCEDURAL 3D TERRAIN CREATION ---
    const terrainSize = 44;
    const terrainSegments = 64;
    const terrainGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, terrainSegments, terrainSegments);
    terrainGeo.rotateX(-Math.PI / 2);

    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      let y = 0;
      // Ridge along negative X
      y += Math.sin(x * 0.18) * Math.cos(z * 0.15) * 2.2;
      // Elevated hilltop around [-6, -4]
      const distToHill = Math.hypot(x + 6, z + 4);
      y += Math.max(0, 4.2 - distToHill * 0.5);

      // Elevated ridge around [4, -8]
      const distToRidge = Math.hypot(x - 4, z + 8);
      y += Math.max(0, 5.0 - distToRidge * 0.45);

      // Depressed lake basin in quadrant [+7, +5]
      const distToLake = Math.hypot(x - 8, z - 5);
      if (distToLake < 6.5) {
        y -= (6.5 - distToLake) * 0.45;
      }

      // Edge falloff
      const distFromCenter = Math.hypot(x, z);
      if (distFromCenter > 18) {
        y -= (distFromCenter - 18) * 0.5;
      }

      posAttr.setY(i, y);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x416834,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // --- WATER BODY (Kotepally Reservoir) ---
    const waterGeo = new THREE.CircleGeometry(5.8, 32);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1f5e82,
      roughness: 0.15,
      metalness: 0.4,
      transparent: true,
      opacity: 0.85,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(8, 0.35, 5);
    waterMesh.receiveShadow = true;
    scene.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // --- PROCEDURAL TEMPLE SHRINE (Sri Anantha Padmanabha Swamy Temple) ---
    const templeGroup = new THREE.Group();
    templeGroup.position.set(-6, 3.2, -4);

    // Stone Base Plinth
    const plinthGeo = new THREE.BoxGeometry(4.2, 0.6, 4.2);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x8a7d6b, roughness: 0.9 });
    const plinth = new THREE.Mesh(plinthGeo, stoneMat);
    plinth.position.y = 0.3;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    templeGroup.add(plinth);

    // Sanctum Walls (Garbhagriha)
    const sanctumGeo = new THREE.BoxGeometry(2.6, 2.2, 2.6);
    const sanctum = new THREE.Mesh(sanctumGeo, stoneMat);
    sanctum.position.y = 1.6;
    sanctum.castShadow = true;
    templeGroup.add(sanctum);

    // Stepped Shikhara / Spire (Dravidian/Deccan stepped pyramidal tower)
    const towerLevels = 4;
    for (let l = 0; l < towerLevels; l++) {
      const size = 2.4 - l * 0.45;
      const stepGeo = new THREE.BoxGeometry(size, 0.45, size);
      const stepMat = new THREE.MeshStandardMaterial({ color: 0x7c6e5a, roughness: 0.8 });
      const step = new THREE.Mesh(stepGeo, stepMat);
      step.position.y = 2.7 + l * 0.45;
      step.castShadow = true;
      templeGroup.add(step);
    }

    // Golden Kalasam Spire Peak
    const kalasamGeo = new THREE.ConeGeometry(0.25, 0.7, 8);
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xddaa22, roughness: 0.3, metalness: 0.8 });
    const kalasam = new THREE.Mesh(kalasamGeo, goldMat);
    kalasam.position.y = 4.8;
    templeGroup.add(kalasam);

    // Colonnade Pillars & Mandapam front
    const pillarGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 8);
    const pillarPositions: [number, number][] = [
      [1.4, 1.4],
      [1.4, 0],
      [1.4, -1.4],
      [2.2, 1.4],
      [2.2, -1.4]
    ];
    pillarPositions.forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(pillarGeo, stoneMat);
      pillar.position.set(px, 1.4, pz);
      pillar.castShadow = true;
      templeGroup.add(pillar);
    });

    scene.add(templeGroup);

    // --- KERELLI RIDGE LOOKOUT DECK ---
    const deckGroup = new THREE.Group();
    deckGroup.position.set(4, 6.2, -8);
    const deckGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.3, 12);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x6e4a2e, roughness: 0.8 });
    const deck = new THREE.Mesh(deckGeo, woodMat);
    deck.receiveShadow = true;
    deckGroup.add(deck);

    // Lookout Railing
    const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 6);
    for (let a = 0; a < 8; a++) {
      const angle = (a / 8) * Math.PI * 2;
      const post = new THREE.Mesh(postGeo, woodMat);
      post.position.set(Math.cos(angle) * 2.2, 0.5, Math.sin(angle) * 2.2);
      deckGroup.add(post);
    }
    scene.add(deckGroup);

    // --- CAMPING GLADE TENTS & BONFIRE ---
    const campGroup = new THREE.Group();
    campGroup.position.set(-2, 1.8, 7);

    // Two A-frame Canvas Tents
    const tentGeo = new THREE.ConeGeometry(1.1, 1.4, 4);
    tentGeo.rotateY(Math.PI / 4);
    const tentMat1 = new THREE.MeshStandardMaterial({ color: 0x2d5a7b, roughness: 0.7 });
    const tentMat2 = new THREE.MeshStandardMaterial({ color: 0xc87d32, roughness: 0.7 });

    const tent1 = new THREE.Mesh(tentGeo, tentMat1);
    tent1.position.set(-0.8, 0.7, 0);
    tent1.castShadow = true;
    campGroup.add(tent1);

    const tent2 = new THREE.Mesh(tentGeo, tentMat2);
    tent2.position.set(1.2, 0.7, -0.6);
    tent2.castShadow = true;
    campGroup.add(tent2);

    // Campfire ring & logs
    const ringGeo = new THREE.TorusGeometry(0.4, 0.1, 6, 12);
    ringGeo.rotateX(Math.PI / 2);
    const fireRing = new THREE.Mesh(ringGeo, stoneMat);
    fireRing.position.set(0.1, 0.05, 0.8);
    campGroup.add(fireRing);

    // Embers
    const emberGeo = new THREE.ConeGeometry(0.2, 0.45, 5);
    const emberMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
    const ember = new THREE.Mesh(emberGeo, emberMat);
    ember.position.set(0.1, 0.25, 0.8);
    campGroup.add(ember);

    scene.add(campGroup);

    // --- PROCEDURAL FOREST TREES (Pine & Sal Trees) ---
    const treeGroup = new THREE.Group();
    const treeTrunkGeo = new THREE.CylinderGeometry(0.1, 0.16, 1.0, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.9 });
    const foliageConeGeo = new THREE.ConeGeometry(0.8, 1.6, 6);
    const foliageMats = [
      new THREE.MeshStandardMaterial({ color: 0x2e5a27, roughness: 0.8, flatShading: true }),
      new THREE.MeshStandardMaterial({ color: 0x22481d, roughness: 0.8, flatShading: true }),
      new THREE.MeshStandardMaterial({ color: 0x3d6e32, roughness: 0.8, flatShading: true }),
    ];

    const createTree = (x: number, y: number, z: number, scale = 1) => {
      const tree = new THREE.Group();
      tree.position.set(x, y, z);
      tree.scale.set(scale, scale, scale);

      const trunk = new THREE.Mesh(treeTrunkGeo, trunkMat);
      trunk.position.y = 0.5;
      trunk.castShadow = true;
      tree.add(trunk);

      const mat = foliageMats[Math.floor(Math.random() * foliageMats.length)];
      const foliage = new THREE.Mesh(foliageConeGeo, mat);
      foliage.position.y = 1.5;
      foliage.castShadow = true;
      tree.add(foliage);

      return tree;
    };

    // Plant trees across hillsides avoiding the lake
    const treeCoords: [number, number, number, number][] = [
      [-10, 2.5, -6, 1.2],
      [-8, 3.4, -9, 1.4],
      [-4, 4.0, -10, 1.1],
      [-1, 4.8, -8, 1.3],
      [2, 5.2, -6, 1.0],
      [6, 5.0, -10, 1.2],
      [-12, 1.8, -2, 1.1],
      [-11, 1.6, 3, 1.0],
      [-8, 1.8, 6, 1.2],
      [-5, 2.2, 9, 1.1],
      [3, 2.0, 7, 0.9],
      [5, 1.5, 9, 1.1],
      [11, 1.2, 1, 1.0],
      [12, 1.5, -4, 1.2],
      [8, 3.0, -5, 1.1],
      [-3, 2.8, -2, 0.8],
      [-7, 2.0, 2, 0.9],
    ];

    treeCoords.forEach(([tx, ty, tz, tScale]) => {
      treeGroup.add(createTree(tx, ty, tz, tScale));
    });
    scene.add(treeGroup);

    // --- FLOATING DUST PARTICLES & BIRDS ---
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 36;
      particlePos[p * 3 + 1] = Math.random() * 12 + 1;
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 36;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- 3D INTERACTIVE HOTSPOTS ---
    hotspotMeshesRef.current = [];
    destination.hotspots3D.forEach((hotspot) => {
      const group = new THREE.Group();
      group.position.set(...hotspot.position);

      // Inner glowing core
      const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b, // Amber gold
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Pulsing outer halo ring
      const ringGeo = new THREE.RingGeometry(0.45, 0.6, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      group.add(ring);

      // Vertical stem beacon to ground
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
      const stemMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.5,
      });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = -0.6;
      group.add(stem);

      scene.add(group);
      hotspotMeshesRef.current.push({ mesh: group, hotspot });
    });

    // --- RAYCASTING FOR INTERACTION ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const interactiveTargets = hotspotMeshesRef.current.map((h) => h.mesh.children[0]);
      const intersects = raycaster.intersectObjects(interactiveTargets);

      if (intersects.length > 0) {
        const found = hotspotMeshesRef.current.find(
          (h) => h.mesh.children[0] === intersects[0].object
        );
        if (found) {
          setHoveredHotspot(found.hotspot);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredHotspot(null);
        container.style.cursor = 'grab';
      }
    };

    const onPointerDown = () => {
      container.style.cursor = 'grabbing';
    };

    const onPointerUp = (event: MouseEvent) => {
      container.style.cursor = 'grab';
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const interactiveTargets = hotspotMeshesRef.current.map((h) => h.mesh.children[0]);
      const intersects = raycaster.intersectObjects(interactiveTargets);

      if (intersects.length > 0) {
        const found = hotspotMeshesRef.current.find(
          (h) => h.mesh.children[0] === intersects[0].object
        );
        if (found) {
          soundManager.playChime();
          setSelectedHotspot(found.hotspot);
          flyTo(found.hotspot.cameraPosition, found.hotspot.cameraTarget);
          if (onSelectHotspot) onSelectHotspot(found.hotspot);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', onPointerMove);
    domElement.addEventListener('mousedown', onPointerDown);
    domElement.addEventListener('mouseup', onPointerUp);

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation if flying
      if (targetCamPosRef.current && targetLookAtRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.05);
        controls.target.lerp(targetLookAtRef.current, 0.05);

        if (camera.position.distanceTo(targetCamPosRef.current) < 0.2) {
          targetCamPosRef.current = null;
          targetLookAtRef.current = null;
        }
      }

      controls.update();

      // Animate hotspot beacons (pulsing and floating)
      hotspotMeshesRef.current.forEach(({ mesh, hotspot }) => {
        const floatY = Math.sin(elapsed * 2.5 + mesh.position.x) * 0.15;
        mesh.position.y = hotspot.position[1] + floatY;

        // Outer ring pulse
        const ring = mesh.children[1] as THREE.Mesh;
        if (ring) {
          const scale = 1 + Math.sin(elapsed * 3) * 0.18;
          ring.scale.set(scale, scale, scale);
        }
      });

      // Animate campfire flicker
      if (campfireLightRef.current) {
        campfireLightRef.current.intensity = 2.0 + Math.sin(elapsed * 12) * 0.6 + Math.cos(elapsed * 18) * 0.4;
      }

      // Water subtle shimmer
      if (waterMeshRef.current) {
        waterMeshRef.current.rotation.z = Math.sin(elapsed * 0.5) * 0.02;
      }

      // Dust particle slow drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.005;
        if (positions[i * 3 + 1] > 14) positions[i * 3 + 1] = 1;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousemove', onPointerMove);
      domElement.removeEventListener('mousedown', onPointerDown);
      domElement.removeEventListener('mouseup', onPointerUp);
      renderer.dispose();
      terrainGeo.dispose();
      waterGeo.dispose();
    };
  }, [destination, flyTo, onSelectHotspot]);

  // Synchronize when parent passes activeHotspotId
  useEffect(() => {
    if (!activeHotspotId) return;
    const target = destination.hotspots3D.find((h) => h.id === activeHotspotId);
    if (target) {
      setSelectedHotspot(target);
      flyTo(target.cameraPosition, target.cameraTarget);
    }
  }, [activeHotspotId, destination.hotspots3D, flyTo]);

  return (
    <div className={`relative w-full overflow-hidden bg-slate-950 select-none ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[500px] md:h-[620px] rounded-2xl border border-amber-500/20 shadow-2xl'}`}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP BAR: Conceptual Badge & Quick Metrics */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-xs font-medium text-amber-300 flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Conceptual 3D Visualization</span>
          </div>
          <span className="hidden sm:inline text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/50">
            Drag to Orbit • Scroll to Zoom • Right-click to Pan
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 shadow-xl">
          {/* Time of Day */}
          <div className="flex items-center border-r border-slate-700/60 pr-1 mr-0.5">
            <button
              onClick={() => { setTimeOfDay('dawn'); soundManager.playTap(); }}
              title="Dawn Sunrise"
              className={`p-1.5 rounded-lg transition-all ${timeOfDay === 'dawn' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Sunrise className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setTimeOfDay('afternoon'); soundManager.playTap(); }}
              title="Golden Afternoon"
              className={`p-1.5 rounded-lg transition-all ${timeOfDay === 'afternoon' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setTimeOfDay('night'); soundManager.playTap(); }}
              title="Starlit Night"
              className={`p-1.5 rounded-lg transition-all ${timeOfDay === 'night' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            title="Reset Camera View"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Ambient Sound */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Turn On Mountain Ambient Breeze' : 'Mute Ambient Breeze'}
            className={`p-1.5 rounded-lg transition ${!isMuted ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* BOTTOM LEFT: Hotspot Quick Strip */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 pointer-events-auto scrollbar-none">
          <div className="hidden md:flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-700/60 text-xs text-slate-300 font-medium">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Landmarks:</span>
          </div>

          {destination.hotspots3D.map((h) => {
            const isSelected = selectedHotspot?.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => {
                  soundManager.playChime();
                  setSelectedHotspot(h);
                  flyTo(h.cameraPosition, h.cameraTarget);
                  if (onSelectHotspot) onSelectHotspot(h);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 backdrop-blur-md shadow-lg ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-amber-500/30'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800/90 border border-slate-700/50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-amber-400'}`} />
                <span>{h.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* HOVER TOOLTIP */}
      {hoveredHotspot && !selectedHotspot && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-amber-500/40 shadow-2xl text-center pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="text-xs font-semibold text-amber-300">{hoveredHotspot.name}</div>
          <div className="text-[11px] text-slate-300 max-w-xs">{hoveredHotspot.highlightFact}</div>
          <div className="text-[10px] text-amber-400/80 mt-0.5">Click to fly in & view story</div>
        </div>
      )}

      {/* SELECTED HOTSPOT CARD OVERLAY */}
      {selectedHotspot && (
        <div className="absolute top-16 right-4 max-w-xs sm:max-w-sm rounded-xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 p-4 shadow-2xl animate-in slide-in-from-right-4 duration-300 pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                {selectedHotspot.category}
              </span>
              <h4 className="text-base font-bold text-white mt-1">{selectedHotspot.name}</h4>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedHotspot.description}</p>
          <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
            <span className="text-amber-300/90 italic flex items-center gap-1">
              <Info className="w-3 h-3 text-amber-400 shrink-0" />
              {selectedHotspot.highlightFact}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
