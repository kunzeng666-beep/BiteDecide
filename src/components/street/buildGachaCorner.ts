import * as THREE from "three";
import { GACHA_COLORS } from "../../data/foods";

export interface GachaCornerHandle {
  group: THREE.Group;
  handleMesh: THREE.Mesh;
  chamberBalls: THREE.Mesh[];
}

/**
 * 建造右侧：街角复古扭蛋机 + 饮料自动贩卖机（已优化：移除昂贵物理折射 + 几何体复用）
 */
export function buildGachaCorner(scene: THREE.Scene): GachaCornerHandle {
  const gachaMachineGroup = new THREE.Group();
  gachaMachineGroup.position.set(4.65, 0.1, 0);
  gachaMachineGroup.rotation.y = -Math.PI / 2;
  scene.add(gachaMachineGroup);

  // 1. 扭蛋机红色金属底座机身
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.85, 0.95, 1.2, 20),
    new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.25,
      metalness: 0.45,
    }),
  );
  base.position.set(0, 0.6, 0);
  gachaMachineGroup.add(base);

  // 2. 透明高光球仓（使用轻量高光透明材质替代昂贵的 MeshPhysicalMaterial 物理折射）
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 24, 24),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      roughness: 0.08,
      metalness: 0.15,
      depthWrite: false, // 避免透明排序闪烁与额外开销
    }),
  );
  globe.position.set(0, 1.95, 0);
  gachaMachineGroup.add(globe);

  // 机顶复古黄铜圆顶盖
  const topCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.75, 0.25, 20),
    new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
    }),
  );
  topCap.position.set(0, 2.78, 0);
  gachaMachineGroup.add(topCap);

  // 3. 球仓内 8 大分类纯色扭蛋球（共享单个 Geometry 与 8 个颜色材质，极速创建）
  const colorHexList = Object.values(GACHA_COLORS);
  const sharedBallGeo = new THREE.SphereGeometry(0.14, 12, 12);
  const sharedBallMats = colorHexList.map(
    (hex) => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.2 }),
  );

  const chamberBalls: THREE.Mesh[] = [];
  for (let i = 0; i < 28; i++) {
    const ball = new THREE.Mesh(
      sharedBallGeo,
      sharedBallMats[i % sharedBallMats.length],
    );
    const angle = (i / 28) * Math.PI * 6;
    const dist = 0.15 + (i % 5) * 0.09;
    ball.position.set(
      Math.cos(angle) * dist,
      1.55 + (i % 6) * 0.11,
      Math.sin(angle) * dist,
    );
    gachaMachineGroup.add(ball);
    chamberBalls.push(ball);
  }

  // 4. 正面旋转金属把手
  const crankAxle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 0.1, 12),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }),
  );
  crankAxle.rotation.x = Math.PI / 2;
  crankAxle.position.set(0, 0.75, 0.9);
  gachaMachineGroup.add(crankAxle);

  const handleBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.11, 0.08),
    new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      metalness: 0.9,
      roughness: 0.2,
    }),
  );
  handleBar.position.set(0, 0.75, 0.96);
  gachaMachineGroup.add(handleBar);

  // 5. 复古黄色冷饮自动贩卖机
  const vendGroup = new THREE.Group();
  vendGroup.position.set(-1.45, 0, 0.1);

  const vendBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 2.3, 0.9),
    new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
      metalness: 0.3,
    }),
  );
  vendBody.position.y = 1.15;
  vendGroup.add(vendBody);

  const windowMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.1, 0.08),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.4,
    }),
  );
  windowMesh.position.set(0, 1.45, 0.46);
  vendGroup.add(windowMesh);
  gachaMachineGroup.add(vendGroup);

  // 6. 街角木质汽水周转箱
  const crate = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.35, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 }),
  );
  crate.position.set(1.1, 0.18, 0.6);
  gachaMachineGroup.add(crate);

  return {
    group: gachaMachineGroup,
    handleMesh: handleBar,
    chamberBalls,
  };
}
