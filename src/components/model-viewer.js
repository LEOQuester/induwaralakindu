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

function getModelOffsetX() {
  const w = window.innerWidth;
  if (w < 640) return 0.45;
  if (w < 1024) return 1.05;
  return 1.75;
}

function getViewOffsetX(width) {
  if (width < 640) return 0;
  if (width < 1024) return width * 0.14;
  return width * 0.28;
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
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  const lookTarget = new THREE.Vector3();
  const orbit = { radius: 3.35, theta: 0.55, phi: 0.08 };
  let modelBaseX = getModelOffsetX();

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

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xa5b4fc, 1.7);
  key.position.set(4, 5, 6);
  const fill = new THREE.DirectionalLight(0x7dd3fc, 1);
  fill.position.set(-5, 0, 3);
  const rim = new THREE.DirectionalLight(0xc4b5fd, 0.9);
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
    modelBaseX = getModelOffsetX();

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);

    const offsetX = getViewOffsetX(w);
    if (offsetX > 0) {
      camera.setViewOffset(w, h, offsetX, 0, w, h);
    } else {
      camera.clearViewOffset();
    }

    if (model) {
      model.position.x = modelBaseX;
    }
  };

  const fitModel = (object) => {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);
    const scale = 1.85 / Math.max(size.x, size.y, size.z);
    object.scale.setScalar(scale);
    object.position.x = modelBaseX;
    object.position.y -= size.y * scale * 0.06;
  };

  const updateScroll = () => {
    const rect = hero.getBoundingClientRect();
    const total = rect.height + window.innerHeight * 0.2;
    scrollProgress = Math.min(1, Math.max(0, -rect.top / total));
    const fade = 1 - scrollProgress;

    hero.style.setProperty('--hero-scroll', scrollProgress.toFixed(3));

    if (heroScene) {
      heroScene.style.opacity = String(fade);
      heroScene.style.visibility = fade < 0.02 ? 'hidden' : 'visible';
    }
    if (overlay) {
      overlay.style.opacity = String((0.5 + scrollProgress * 0.4) * fade);
      overlay.style.visibility = fade < 0.02 ? 'hidden' : 'visible';
    }
    if (mesh) {
      mesh.style.opacity = String((0.35 - scrollProgress * 0.15) * fade);
      mesh.style.transform = `translateY(${scrollProgress * 40}px) scale(${1 + scrollProgress * 0.08})`;
      mesh.style.visibility = fade < 0.02 ? 'hidden' : 'visible';
    }

    const stats = document.querySelector('[data-hero-stats]');
    const scrollHint = document.querySelector('[data-hero-scroll-hint]');
    const orbs = document.querySelector('.hero__orbs');

    if (stats) {
      stats.style.transform = `translate3d(0, ${scrollProgress * -32}px, 0)`;
      stats.style.opacity = String(1 - scrollProgress * 0.65);
    }
    if (scrollHint) {
      scrollHint.style.opacity = String(1 - scrollProgress * 1.2);
    }
    if (orbs) {
      orbs.style.opacity = String(fade);
      orbs.style.visibility = fade < 0.02 ? 'hidden' : 'visible';
      orbs.style.transform = `translate3d(${scrollProgress * -50}px, ${scrollProgress * 70}px, 0) scale(${1 + scrollProgress * 0.2})`;
      orbs.style.filter = `hue-rotate(${scrollProgress * 55}deg) saturate(${1 + scrollProgress * 0.35})`;
    }
    if (content) {
      content.style.transform = `translate3d(0, ${scrollProgress * -56}px, 0)`;
      content.style.opacity = String(1 - scrollProgress * 0.88);
    }
  };

  const onPointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (!isVisible) return;

    smoothPointer.x += (pointer.x - smoothPointer.x) * 0.14;
    smoothPointer.y += (pointer.y - smoothPointer.y) * 0.14;

    const t = clock.getElapsedTime();
    const scroll = scrollProgress;
    const px = smoothPointer.x;
    const py = smoothPointer.y;

    const targetX = modelBaseX + scroll * 0.35;
    const targetY = py * 0.12 - scroll * 0.2;
    const targetZ = 0;

    const scrollTheta = scroll * 1.15;
    const scrollPhi = scroll * 0.55;
    const pointerTheta = px * 0.55;
    const pointerPhi = py * 0.35;
    const idleTheta = Math.sin(t * 0.45) * 0.18 + Math.sin(t * 1.1) * 0.08;
    const idlePhi = Math.sin(t * 0.6) * 0.1 + Math.cos(t * 0.85) * 0.06;

    const theta = orbit.theta + scrollTheta + pointerTheta + idleTheta;
    const phi = orbit.phi + scrollPhi + pointerPhi + idlePhi;
    const radius = orbit.radius + scroll * 1.4 - py * 0.15;

    lookTarget.set(targetX, targetY, targetZ);
    camera.position.x = lookTarget.x + Math.sin(theta) * radius;
    camera.position.y = lookTarget.y + Math.sin(phi) * 0.85;
    camera.position.z = lookTarget.z + Math.cos(theta) * radius;
    camera.lookAt(lookTarget);

    if (model) {
      const idleRotY =
        Math.sin(t * 0.5) * 0.2 +
        Math.sin(t * 0.95) * 0.1 +
        Math.cos(t * 0.35) * 0.08;
      const idleRotX = Math.sin(t * 0.65) * 0.14 + Math.cos(t * 1.2) * 0.06;
      const idleRotZ = Math.sin(t * 0.4) * 0.07;

      model.rotation.y = 0.4 + px * 0.45 + idleRotY + scroll * 1.1;
      model.rotation.x = py * 0.28 + idleRotX + scroll * 0.35;
      model.rotation.z = px * 0.12 + idleRotZ + scroll * 0.15;

      model.position.x = targetX + Math.sin(t * 0.55) * 0.06 + px * 0.08;
      model.position.y =
        Math.sin(t * 0.75) * 0.05 +
        Math.cos(t * 1.3) * 0.03 -
        scroll * 0.18 +
        py * 0.04;
      model.position.z = Math.sin(t * 0.4) * 0.04 + scroll * 0.12;
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
  window.addEventListener('scroll', updateScroll, { passive: true });

  return () => {
    cancelAnimationFrame(animationId);
    observer.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', updateScroll);
    renderer.dispose();
  };
}
