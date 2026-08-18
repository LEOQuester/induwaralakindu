import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODEL_PATH = '/assets/models/hero/induwara.glb';

export function renderModelViewer() {
  return `
    <div class="hero-scene" data-hero-scene aria-hidden="true">
      <canvas class="hero-scene__canvas" id="hero-model-canvas"></canvas>
      <div class="hero-scene__loader" data-model-loader>
        <div class="hero-scene__loader-ring"></div>
      </div>
    </div>
  `;
}

export function initModelViewer() {
  const hero = document.querySelector('[data-hero-section]');
  const canvas = document.getElementById('hero-model-canvas');
  const heroScene = document.querySelector('[data-hero-scene]');
  const loaderEl = document.querySelector('[data-model-loader]');
  const overlay = document.querySelector('[data-hero-overlay]');
  const content = document.querySelector('[data-hero-content]');
  const mesh = document.querySelector('.hero__mesh');

  if (!hero || !canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const baseCamera = { x: 0.15, y: 0.05, z: 3.4 };
  camera.position.set(baseCamera.x, baseCamera.y, baseCamera.z);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.DirectionalLight(0xa5b4fc, 1.6);
  key.position.set(4, 5, 6);
  const fill = new THREE.DirectionalLight(0x7dd3fc, 0.9);
  fill.position.set(-5, 0, 3);
  const rim = new THREE.DirectionalLight(0xc4b5fd, 0.8);
  rim.position.set(0, 3, -5);
  scene.add(key, fill, rim);

  let model = null;
  let mixer = null;
  const clock = new THREE.Clock();
  const pointer = { x: 0, y: 0 };
  const smoothPointer = { x: 0, y: 0 };
  let scrollProgress = 0;
  let animationId = null;
  let isVisible = true;

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  const fitModel = (object) => {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);
    const scale = 1.85 / Math.max(size.x, size.y, size.z);
    object.scale.setScalar(scale);
    object.position.x = 0.55;
    object.position.y -= size.y * scale * 0.06;
  };

  const updateScroll = () => {
    const rect = hero.getBoundingClientRect();
    const total = rect.height + window.innerHeight * 0.25;
    scrollProgress = Math.min(1, Math.max(0, -rect.top / total));

    const fade = 1 - scrollProgress;

    if (heroScene) {
      heroScene.style.opacity = String(fade);
      heroScene.style.visibility = fade < 0.02 ? 'hidden' : 'visible';
    }
    if (overlay) {
      overlay.style.opacity = String((0.55 + scrollProgress * 0.35) * fade);
      overlay.style.visibility = fade < 0.02 ? 'hidden' : 'visible';
    }
    if (mesh) {
      mesh.style.opacity = String(0.35 * fade);
      mesh.style.visibility = fade < 0.02 ? 'hidden' : 'visible';
    }
    const stats = document.querySelector('[data-hero-stats]');
    const scrollHint = document.querySelector('[data-hero-scroll-hint]');
    const orbs = document.querySelector('.hero__orbs');
    if (stats) {
      stats.style.transform = `translate3d(0, ${scrollProgress * -24}px, 0)`;
      stats.style.opacity = String(1 - scrollProgress * 0.6);
    }
    if (scrollHint) {
      scrollHint.style.opacity = String(1 - scrollProgress * 1.2);
    }
    if (orbs) {
      orbs.style.opacity = String(fade);
      orbs.style.visibility = fade < 0.02 ? 'hidden' : 'visible';
    }
    if (content) {
      content.style.transform = `translate3d(0, ${scrollProgress * -48}px, 0)`;
      content.style.opacity = String(1 - scrollProgress * 0.85);
    }
  };

  const onPointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (!isVisible) return;

    smoothPointer.x += (pointer.x - smoothPointer.x) * 0.06;
    smoothPointer.y += (pointer.y - smoothPointer.y) * 0.06;

    const t = clock.getElapsedTime();
    const scroll = scrollProgress;

    camera.position.x = baseCamera.x + smoothPointer.x * 0.22 + scroll * 0.35;
    camera.position.y = baseCamera.y + smoothPointer.y * 0.1 - scroll * 0.18;
    camera.position.z = baseCamera.z + scroll * 1.1;
    camera.lookAt(0.2 + smoothPointer.x * 0.08, smoothPointer.y * 0.05, 0);

    if (model) {
      model.rotation.y =
        0.35 + smoothPointer.x * 0.18 + Math.sin(t * 0.3) * 0.05 + scroll * 0.45;
      model.rotation.x = smoothPointer.y * 0.06 + scroll * 0.08;
      model.position.y = Math.sin(t * 0.7) * 0.025 - scroll * 0.12;
      model.position.x = 0.55 + scroll * 0.25;
    }

    if (mixer) mixer.update(clock.getDelta());
    updateScroll();
    renderer.render(scene, camera);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting || entry.boundingClientRect.bottom > 0;
    },
    { threshold: 0 },
  );
  observer.observe(hero);

  const enhanceMaterials = (object) => {
    object.traverse((child) => {
      if (!child.isMesh) return;
      const mat = child.material;
      if (!mat) return;
      child.castShadow = true;
      child.receiveShadow = true;
      if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
        mat.metalness = Math.min(mat.metalness ?? 0.2, 0.35);
        mat.roughness = Math.max(mat.roughness ?? 0.5, 0.42);
        mat.envMapIntensity = 1.1;
      }
    });
  };

  new GLTFLoader().load(
    MODEL_PATH,
    (gltf) => {
      model = gltf.scene;
      enhanceMaterials(model);
      fitModel(model);
      scene.add(model);
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      }
      loaderEl?.classList.add('hero-scene__loader--hidden');
      hero.classList.add('hero--model-ready');
    },
    undefined,
    () => loaderEl?.classList.add('hero-scene__loader--hidden'),
  );

  resize();
  updateScroll();
  animate();

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  return () => {
    cancelAnimationFrame(animationId);
    observer.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointerMove);
    renderer.dispose();
  };
}
