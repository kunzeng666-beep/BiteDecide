import * as THREE from "three";

export interface ChefStallHandle {
  group: THREE.Group;
  updateSteam: () => void;
}

/**
 * 建造左侧：深夜食堂美食主理人小摊（侧对街道，面向 +X 轴）
 */
export function buildChefStall(scene: THREE.Scene): ChefStallHandle {
  const chefStandGroup = new THREE.Group();
  chefStandGroup.position.set(-4.85, 0.1, 0);
  chefStandGroup.rotation.y = Math.PI / 2; // 面向街道中央 (+X)
  scene.add(chefStandGroup);

  // 1. 木质吧台底座与台面
  const counter = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 1.1, 1.15),
    new THREE.MeshStandardMaterial({ color: 0x4a2511, roughness: 0.55 }),
  );
  counter.position.set(0, 0.55, 0);
  counter.castShadow = true;
  counter.receiveShadow = true;
  chefStandGroup.add(counter);

  const top = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.1, 1.35),
    new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.35 }),
  );
  top.position.set(0, 1.15, 0);
  top.castShadow = true;
  chefStandGroup.add(top);

  // 2. 屋檐木支架与暖色斜顶布棚
  const roofPoleMat = new THREE.MeshStandardMaterial({ color: 0x271408 });
  for (const px of [-1.25, 1.25]) {
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 1.6, 12),
      roofPoleMat,
    );
    pole.position.set(px, 1.95, 0.55);
    chefStandGroup.add(pole);
  }

  const awning = new THREE.Mesh(
    new THREE.BoxGeometry(2.9, 0.08, 1.6),
    new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.45 }),
  );
  awning.position.set(0, 2.75, 0);
  awning.rotation.x = 0.22;
  awning.castShadow = true;
  chefStandGroup.add(awning);

  // 屋檐下悬挂的发光红灯笼
  const stallLantern = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.4, 16),
    new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 2.0,
    }),
  );
  stallLantern.position.set(-0.95, 2.3, 0.45);
  chefStandGroup.add(stallLantern);

  // 3. 吧台后的卡通美食主理人
  const chefBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.46, 0.95, 16),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b }),
  );
  chefBody.position.set(0, 1.35, -0.65);
  chefStandGroup.add(chefBody);

  const chefHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xfed7aa }),
  );
  chefHead.position.set(0, 1.98, -0.65);
  chefStandGroup.add(chefHead);

  const chefHat = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.24, 0.16, 16),
    new THREE.MeshStandardMaterial({ color: 0xfffbeb }),
  );
  chefHat.position.set(0, 2.18, -0.65);
  chefStandGroup.add(chefHat);

  // 4. 台面左：三层竹编蒸笼
  for (let s = 0; s < 3; s++) {
    const steamer = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.65 }),
    );
    steamer.position.set(0.75, 1.25 + s * 0.13, 0.15);
    steamer.castShadow = true;
    chefStandGroup.add(steamer);
  }

  // 5. 台面右：热汤砂锅与升腾热气粒子
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.18, 0.24, 16),
    new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.4 }),
  );
  pot.position.set(-0.55, 1.3, 0.15);
  chefStandGroup.add(pot);

  const steamParticles: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshBasicMaterial
  >[] = [];
  for (let i = 0; i < 8; i++) {
    const steam = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
      }),
    );
    steam.position.set(-0.55, 1.48 + i * 0.08, 0.15);
    steam.userData = { initialY: 1.48, speed: 0.009 + i * 0.002 };
    chefStandGroup.add(steam);
    steamParticles.push(steam);
  }

  // 6. 吧台前两张木质高脚圆凳
  for (const sx of [-0.65, 0.65]) {
    const stool = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.06, 16),
      new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.5 }),
    );
    stool.position.set(sx, 0.65, 1.1);

    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.65, 8),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 }),
    );
    leg.position.set(sx, 0.32, 1.1);
    chefStandGroup.add(stool, leg);
  }

  // 7. 地面立式手绘黑板水牌
  const boardGroup = new THREE.Group();
  boardGroup.position.set(-1.8, 0, 0.6);
  boardGroup.rotation.y = -0.4;
  const boardFace = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.9, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 }),
  );
  boardFace.position.y = 0.55;
  boardFace.rotation.x = -0.15;
  boardGroup.add(boardFace);
  chefStandGroup.add(boardGroup);

  // 每帧更新砂锅蒸汽升腾动画
  const updateSteam = () => {
    steamParticles.forEach((p) => {
      const { initialY, speed } = p.userData as {
        initialY: number;
        speed: number;
      };
      p.position.y += speed;
      p.material.opacity = Math.max(0, 0.45 - (p.position.y - initialY) * 0.65);
      if (p.position.y > initialY + 0.55) {
        p.position.y = initialY;
        p.material.opacity = 0.45;
      }
    });
  };

  return { group: chefStandGroup, updateSteam };
}
