import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODEL_PATH = '/assets/models/hero/induwara.glb';

export function renderModelViewer() {
  return `
    <div class="model-viewer" data-model-viewer>
      <div class="model-viewer__frame">
        <canvas class="model-viewer__canvas" id="hero-model-canvas" aria-label="Interactive 3D model of Induwara Lakindu"></canvas>
        <div class="model-viewer__loader" data-model-loader>
          <div class="model-viewer__loader-ring"></div>
          <span>Loading model…</span>
        </div>
        <div class="model-viewer__orbit model-viewer__orbit--1" aria-hidden="true"></div>
        <div class="model-viewer__orbit model-viewer__orbit--2" aria-hidden="true"></div>
      </div>
      <div class="model-viewer__glow" aria-hidden="true"></div>
      <div class="model-viewer__glow model-viewer__glow--blue" aria-hidden="true"></div>
    </div>
  `;
}

export function initModelViewer() {
  const container = document.querySelector('[data-model-viewer]');
  const canvas = document.getElementById('hero-model-canvas');
  const loaderEl = document.querySelector('[data-model-loader]');

  if (!container || !canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.15, 3.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  const keyLight = new THREE.DirectionalLight(0x6ee7b7, 1.4);
  keyLight.position.set(3, 4, 5);
  const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.85);
  fillLight.position.set(-4, 1, 2);
  const rimLight = new THREE.DirectionalLight(0xc084fc, 0.7);
  rimLight.position.set(0, 2, -4);
  scene.add(ambient, keyLight, fillLight, rimLight);

  let model = null;
  let mixer = null;
  const clock = new THREE.Clock();
  const pointer = { x: 0, y: 0 };
  const targetRotation = { x: 0, y: 0 };
  const currentRotation = { x: 0, y: 0 };
  let animationId = null;
  let isVisible = true;

  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const fitModel = (object) => {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 1.65 / maxDim;
    object.scale.setScalar(scale);
    object.position.y -= size.y * scale * 0.08;
  };

  const onPointerMove = (event) => {
    const rect = container.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    targetRotation.y = pointer.x * 0.35;
    targetRotation.x = pointer.y * 0.12;
    container.style.setProperty('--tilt-x', `${pointer.y * -6}deg`);
    container.style.setProperty('--tilt-y', `${pointer.x * 6}deg`);
  };

  const onPointerLeave = () => {
    targetRotation.x = 0;
    targetRotation.y = 0;
    container.style.setProperty('--tilt-x', '0deg');
    container.style.setProperty('--tilt-y', '0deg');
  };

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (!isVisible) return;

    const elapsed = clock.getElapsedTime();
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;

    if (model) {
      model.rotation.y = currentRotation.y + Math.sin(elapsed * 0.35) * 0.08;
      model.rotation.x = currentRotation.x;
      model.position.y = Math.sin(elapsed * 0.9) * 0.03;
    }

    if (mixer) mixer.update(clock.getDelta());
    renderer.render(scene, camera);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
    },
    { threshold: 0.1 },
  );
  observer.observe(container);

  new GLTFLoader().load(
    MODEL_PATH,
    (gltf) => {
      model = gltf.scene;
      fitModel(model);
      scene.add(model);

      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      }

      loaderEl?.classList.add('model-viewer__loader--hidden');
      container.classList.add('model-viewer--loaded');
    },
    undefined,
    () => {
      if (loaderEl) {
        loaderEl.innerHTML = '<span>Model unavailable</span>';
      }
    },
  );

  resize();
  animate();

  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('resize', resize);

  return () => {
    cancelAnimationFrame(animationId);
    observer.disconnect();
    container.removeEventListener('pointermove', onPointerMove);
    container.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}
