import * as THREE from 'three';

export function renderAmbientScene() {
  return `
    <div class="ambient-scene" data-ambient-scene aria-hidden="true">
      <canvas class="ambient-scene__canvas" data-ambient-canvas></canvas>
    </div>
  `;
}

export function initAmbientScene() {
  const container = document.querySelector('[data-ambient-scene]');
  const canvas = document.querySelector('[data-ambient-canvas]');
  if (!container || !canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 14;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const count = window.innerWidth < 768 ? 80 : 140;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const palette = [
    new THREE.Color('#4f46e5'),
    new THREE.Color('#0ea5e9'),
    new THREE.Color('#7c3aed'),
    new THREE.Color('#ec4899'),
  ];

  for (let i = 0; i < count; i += 1) {
    const radius = 5 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const color = palette[i % palette.length];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(points);

  const linePositions = [];
  const maxDistance = 2.8;
  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < maxDistance) {
        linePositions.push(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2],
        );
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(
    lineGeometry,
    new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(lines);

  const pointer = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  let animationId = null;
  let isVisible = true;

  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const onPointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationId) animate();
      if (!isVisible && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
    { threshold: 0 },
  );

  observer.observe(container);
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (!isVisible) return;

    smooth.x += (pointer.x - smooth.x) * 0.04;
    smooth.y += (pointer.y - smooth.y) * 0.04;

    points.rotation.y += 0.0012;
    points.rotation.x += 0.0004;
    lines.rotation.copy(points.rotation);

    camera.position.x = smooth.x * 1.2;
    camera.position.y = -smooth.y * 0.8;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    observer.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointerMove);
    if (animationId) cancelAnimationFrame(animationId);
    geometry.dispose();
    lineGeometry.dispose();
    renderer.dispose();
  };
}
