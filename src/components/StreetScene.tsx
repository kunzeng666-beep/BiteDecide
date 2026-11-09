import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildChefStall } from "./street/buildChefStall";
import { buildGachaCorner } from "./street/buildGachaCorner";

/**
 * 程序化生成暖调步行街地砖贴图（256x256 极速生成）
 */
function generateCobblestoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#2d1e17";
  ctx.fillRect(0, 0, 256, 256);

  const rows = 8;
  const cols = 4;
  const rowHeight = 256 / rows;
  const colWidth = 256 / cols;

  for (let r = 0; r < rows; r++) {
    const xOffset = r % 2 === 0 ? 0 : colWidth / 2;
    for (let c = -1; c < cols + 1; c++) {
      const x = c * colWidth + xOffset;
      const y = r * rowHeight;

      const base = Math.floor(85 + Math.random() * 30);
      const red = Math.min(255, base + 28);
      const green = Math.min(255, base + 8);
      const blue = Math.max(0, base - 12);
      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, colWidth - 4, rowHeight - 4, 3);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 20);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * 布置“灯火通明”繁华夜市灯光系统（已移除昂贵的点光源立方体阴影，保证满帧 60FPS）
 */
function setupFoodStreetLighting(scene: THREE.Scene) {
  // 1. 高亮暖色半球环境光
  const hemiLight = new THREE.HemisphereLight(0xffedd5, 0xd97706, 2.4);
  hemiLight.position.set(0, 15, 0);
  scene.add(hemiLight);

  // 2. 暖色全局补光
  scene.add(new THREE.AmbientLight(0xfff7ed, 1.3));

  // 3. 左侧主理人摊位暖黄光 + 右侧扭蛋机暖橙光
  const chefLight = new THREE.PointLight(0xffb703, 18, 16, 0.8);
  chefLight.position.set(-3.8, 3.2, 0.5);
  scene.add(chefLight);
  const gachaLight = new THREE.PointLight(0xfb8500, 16, 16, 0.8);
  gachaLight.position.set(3.8, 3.2, 0.5);
  scene.add(gachaLight);

  // 4. 街道中央通明暖光
  const centerLamp = new THREE.PointLight(0xffe599, 22, 24, 0.8);
  centerLamp.position.set(0, 4.5, 1.5);
  scene.add(centerLamp);

  // 5. 远景夜市灯海暖红光
  const distantFestivalGlow = new THREE.PointLight(0xff5a36, 22, 28, 0.7);
  distantFestivalGlow.position.set(0, 3.2, -10);
  scene.add(distantFestivalGlow);
}

/**
 * 建造暖调步行街地面、路牙石与两侧食肆区地面
 */
function buildPavedPedestrianStreet(
  scene: THREE.Scene,
  stoneTexture: THREE.CanvasTexture,
) {
  const street = new THREE.Mesh(
    new THREE.PlaneGeometry(6.4, 36),
    new THREE.MeshStandardMaterial({
      map: stoneTexture,
      roughness: 0.32,
      metalness: 0.1,
    }),
  );
  street.rotation.x = -Math.PI / 2;
  scene.add(street);

  const curbGeo = new THREE.BoxGeometry(0.35, 0.16, 36);
  const curbMat = new THREE.MeshStandardMaterial({
    color: 0x785a46,
    roughness: 0.55,
  });

  const curbL = new THREE.Mesh(curbGeo, curbMat);
  curbL.position.set(-3.3, 0.08, 0);
  const curbR = new THREE.Mesh(curbGeo, curbMat);
  curbR.position.set(3.3, 0.08, 0);
  scene.add(curbL, curbR);

  const walkGeo = new THREE.PlaneGeometry(4.5, 36);
  const walkMat = new THREE.MeshStandardMaterial({
    color: 0x4a3226,
    roughness: 0.6,
  });

  const walkL = new THREE.Mesh(walkGeo, walkMat);
  walkL.rotation.x = -Math.PI / 2;
  walkL.position.set(-5.6, 0.1, 0);

  const walkR = new THREE.Mesh(walkGeo, walkMat);
  walkR.rotation.x = -Math.PI / 2;
  walkR.position.set(5.6, 0.1, 0);
  scene.add(walkL, walkR);
}

/**
 * 建造漫天灯火（共享几何体与材质，零冗余开销）
 */
function buildBrightNightMarketAtmosphere(scene: THREE.Scene): THREE.Group[] {
  const lanterns: THREE.Group[] = [];
  const cableZPositions = [3.5, 0.2, -3.2, -6.8];

  // 全局共享几何体与材质（大幅提速首屏加载与渲染）
  const wireGeo = new THREE.CylinderGeometry(0.015, 0.015, 9, 6);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x5c3a21 });
  const bodyGeo = new THREE.SphereGeometry(0.22, 12, 12);
  const capGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.05, 8);
  const capMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });

  // 使用 MeshBasicMaterial 自发光色直接呈现高亮灯笼，省去全部光照计算
  const redLanternMat = new THREE.MeshBasicMaterial({ color: 0xff4d3d });
  const goldLanternMat = new THREE.MeshBasicMaterial({ color: 0xffbe0b });

  cableZPositions.forEach((z) => {
    const wire = new THREE.Mesh(wireGeo, wireMat);
    wire.rotation.z = Math.PI / 2;
    wire.position.set(0, 4.35, z);
    scene.add(wire);

    for (let x = -3.2; x <= 3.2; x += 1.6) {
      const lanternGroup = new THREE.Group();
      const sag = Math.cos((x / 3.2) * (Math.PI / 2)) * 0.18;
      lanternGroup.position.set(x, 4.1 - sag, z);

      const isRed = Math.round(Math.abs(x * 10)) % 3 === 0;
      const body = new THREE.Mesh(
        bodyGeo,
        isRed ? redLanternMat : goldLanternMat,
      );
      body.scale.set(1, 1.2, 1);

      const topCap = new THREE.Mesh(capGeo, capMat);
      topCap.position.y = 0.24;
      const botCap = new THREE.Mesh(capGeo, capMat);
      botCap.position.y = -0.24;

      lanternGroup.add(body, topCap, botCap);
      scene.add(lanternGroup);
      lanterns.push(lanternGroup);
    }
  });

  // 远景发光美食招牌（共享几何体 + MeshBasicMaterial 零光照负担）
  const signGeo = new THREE.BoxGeometry(0.18, 0.75, 1.3);
  const signColors = [0xff595e, 0xffca3a, 0xff924c, 0xff4d6d, 0xfbbf24];
  for (let i = 0; i < 10; i++) {
    const isLeft = i % 2 === 0;
    const signMesh = new THREE.Mesh(
      signGeo,
      new THREE.MeshBasicMaterial({ color: signColors[i % signColors.length] }),
    );
    signMesh.position.set(
      isLeft ? -3.8 - (i % 3) * 0.3 : 3.8 + (i % 3) * 0.3,
      2.2 + (i % 3) * 0.65,
      -5 - i * 1.6,
    );
    scene.add(signMesh);
  }

  return lanterns;
}

export default function StreetScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f121b);
    scene.fog = new THREE.FogExp2(0x28151d, 0.025);

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.7, 9.0);
    camera.lookAt(0, 1.8, 0);

    // 关闭全局 shadowMap 实时阴影重绘，换取极致丝滑帧率
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    const stoneTexture = generateCobblestoneTexture();
    setupFoodStreetLighting(scene);
    buildPavedPedestrianStreet(scene, stoneTexture);
    const lanterns = buildBrightNightMarketAtmosphere(scene);
    const chefStall = buildChefStall(scene);
    buildGachaCorner(scene);

    let animationFrameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      lanterns.forEach((lantern, idx) => {
        lantern.rotation.z = Math.sin(elapsed * 2 + idx) * 0.06;
      });

      chefStall.updateSteam();

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      stoneTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#1f121b] select-none"
    />
  );
}
