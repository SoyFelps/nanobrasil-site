/* NanoBrasil — carro 3D minimalista para o "mergulho na escala"
   Carroceria extrudada do mesmo perfil do desenho técnico, com afunilamento da cabine,
   material grafite acetinado, contornos finos e acentos em laranja.
   Controlado pelo vortex.js via window.NanoCar3D.render(L, t). */
import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const host = document.querySelector('[data-dive-car]');
if (host) init().catch((e) => console.warn('[car3d]', e)); // se o WebGL falhar, o desenho em SVG continua como alternativa

async function init() {
  const canvas = document.createElement('canvas');
  canvas.className = 'dive__3d';
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;

  const camera = new THREE.PerspectiveCamera(26, 2, .05, 100);

  /* ---------- carroceria: perfil lateral → extrusão ---------- */
  const BODY = 'M66 250C58 238 52 214 53 188C54 174 62 164 78 160C140 146 232 120 328 99L332 98C382 72 432 49 488 39C524 31 562 27 602 27C652 27 692 31 722 39C792 57 862 92 908 114L914 117C926 122 941 133 946 149C952 171 954 211 950 233C948 246 940 250 930 250L852 250A79 79 0 0 0 694 250L311 250A79 79 0 0 0 153 250Z';
  const GLASS = 'M412 106C440 77 468 54 500 43C560 35 650 35 700 41C722 52 740 66 752 79C761 88 771 94 783 98C662 100 522 103 412 106Z';
  const toShapes = (d) => new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`).paths[0].toShapes(true);

  const W = 1.62; // meia-largura da carroceria (unidades: 1 = 100px do desenho)
  const extrude = (d, depth, bevel) => {
    const g = new THREE.ExtrudeGeometry(toShapes(d), { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * .8, bevelSegments: 8, curveSegments: 64 });
    g.translate(0, 0, -depth / 2);
    // SVG → mundo: x centrado, y para cima, escala 1/100
    g.applyMatrix4(new THREE.Matrix4().makeScale(.01, -.01, -1)); // espelha z junto para manter a orientação das faces
    g.translate(-5, 3, 0);
    return g;
  };
  // afunila a cabine (tumblehome) e arredonda frente/traseira vistas de cima
  const shape = (g) => {
    const p = g.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const cabin = THREE.MathUtils.smoothstep(v.y, 1.85, 2.75);
      const ends = THREE.MathUtils.smoothstep(Math.abs(v.x), 3.4, 4.55);
      const low = THREE.MathUtils.smoothstep(-v.y, -.75, -.5);
      v.z *= (1 - cabin * .3) * (1 - ends * .22) * (1 - low * .05);
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  };

  const paint = new THREE.MeshPhysicalMaterial({ color: 0x1b1b20, metalness: .55, roughness: .32, clearcoat: 1, clearcoatRoughness: .12 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x050507, metalness: .2, roughness: .05, clearcoat: 1 });
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .14 });

  const car = new THREE.Group();
  const bodyGeo = shape(extrude(BODY, W * 2 - .4, .2));
  car.add(new THREE.Mesh(bodyGeo, paint));
  car.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 28), lineMat));
  const glassGeo = shape(extrude(GLASS, W * 2 - .34, .2));
  car.add(new THREE.Mesh(glassGeo, glassMat));

  // lanternas (laranja) e faróis
  const tail = new THREE.Mesh(new THREE.BoxGeometry(.06, .07, W * 1.5), new THREE.MeshBasicMaterial({ color: 0xF26430 }));
  tail.position.set(4.3, 1.72, 0); tail.rotation.z = -.25; car.add(tail);
  const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (const s of [-1, 1]) {
    const h = new THREE.Mesh(new THREE.BoxGeometry(.5, .05, .32), headMat);
    h.position.set(-4.12, 1.34, s * 1.05); h.rotation.z = .2; car.add(h);
  }

  // rodas: pneu de perfil baixo + aro escuro "aero" com raios duplos, no mesmo tom da carroceria
  // (eixo da roda = z local; +z é a face externa)
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x0c0c0f, roughness: .8, side: THREE.DoubleSide });
  const rimMat = new THREE.MeshPhysicalMaterial({ color: 0x4a4a53, metalness: .95, roughness: .26, clearcoat: .8, clearcoatRoughness: .15 });
  const barrelMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, metalness: .6, roughness: .6, side: THREE.DoubleSide });
  const discMat = new THREE.MeshStandardMaterial({ color: 0x2e2e34, metalness: .85, roughness: .45 });
  const lipMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .38 });
  const caliperMat = new THREE.MeshStandardMaterial({ color: 0xB8491F, roughness: .55, metalness: .2 });
  const lathe = (pts, seg = 72) => new THREE.LatheGeometry(pts.map(([r, z]) => new THREE.Vector2(r, z)), seg).rotateX(Math.PI / 2);
  // perfil do pneu: banda reta, ombros levemente arredondados, flanco baixo (aro grande)
  const RIM = .5;
  const tireGeo = lathe([[RIM, -.16], [.56, -.175], [.612, -.172], [.634, -.15], [.642, -.105], [.642, .105], [.634, .15], [.612, .172], [.56, .175], [RIM, .16]]);
  const barrelGeo = new THREE.CylinderGeometry(RIM, RIM, .3, 64, 1, true).rotateX(Math.PI / 2);
  const discGeo = new THREE.CylinderGeometry(.37, .37, .03, 48).rotateX(Math.PI / 2);
  const capGeo = new THREE.CylinderGeometry(.075, .085, .05, 32).rotateX(Math.PI / 2);
  const lipGeo = new THREE.TorusGeometry(RIM - .008, .007, 6, 96);
  const caliperGeo = new THREE.TorusGeometry(.33, .028, 8, 12, .45);
  // raio fino e reto, do cubo até o aro, com chanfro leve
  const spokeShape = new THREE.Shape();
  spokeShape.moveTo(.08, -.016); spokeShape.lineTo(RIM - .02, -.02); spokeShape.lineTo(RIM - .02, .02); spokeShape.lineTo(.08, .016); spokeShape.closePath();
  const spokeGeo = new THREE.ExtrudeGeometry(spokeShape, { depth: .03, bevelEnabled: true, bevelThickness: .008, bevelSize: .006, bevelSegments: 2 });
  const spokeEdges = new THREE.EdgesGeometry(spokeGeo, 30); // contorno fino, como o da carroceria
  const wheel = () => {
    const w = new THREE.Group();
    w.add(new THREE.Mesh(tireGeo, tireMat));
    w.add(new THREE.Mesh(barrelGeo, barrelMat));
    const disc = new THREE.Mesh(discGeo, discMat); disc.position.z = -.04; w.add(disc);
    const cal = new THREE.Mesh(caliperGeo, caliperMat); cal.rotation.z = .5; w.add(cal);
    const lip = new THREE.Mesh(lipGeo, lipMat); lip.position.z = .15; w.add(lip);
    const cap = new THREE.Mesh(capGeo, rimMat); cap.position.z = .13; w.add(cap);
    // 5 pares de raios paralelos
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2;
      for (const o of [-.032, .032]) {
        const sp = new THREE.Mesh(spokeGeo, rimMat);
        sp.rotation.z = a;
        sp.position.set(-Math.sin(a) * o, Math.cos(a) * o, .09);
        sp.add(new THREE.LineSegments(spokeEdges, lineMat));
        w.add(sp);
      }
    }
    return w;
  };
  for (const x of [-2.68, 2.73]) for (const s of [-1, 1]) {
    const w = wheel(); w.position.set(x, .64, s * (W - .22)); if (s < 0) w.rotation.y = Math.PI; car.add(w);
  }

  // ponto-alvo do zoom na porta (laranja)
  const target = new THREE.Vector3(1.4, 1.35, 0);
  const dot = new THREE.Mesh(new THREE.SphereGeometry(.045, 24, 16), new THREE.MeshBasicMaterial({ color: 0xF26430 }));
  car.add(dot);
  scene.add(car);

  // chão: sombra suave
  const sh = document.createElement('canvas'); sh.width = sh.height = 128;
  const sg = sh.getContext('2d'), gr = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(0,0,0,.85)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); sg.fillStyle = gr; sg.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(11, 4.6), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sh), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = .005; scene.add(shadow);

  // luzes: chave branca + recorte laranja por trás
  scene.add(new THREE.HemisphereLight(0xffffff, 0x101014, .35));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-4, 7, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xF26430, 2.2); rim.position.set(6, 2.5, -6); scene.add(rim);

  /* ---------- câmera e tamanho ---------- */
  let cw = 0, ch = 0, R = 15.5;
  const resize = () => {
    const r = host.getBoundingClientRect();
    if (Math.abs(r.width - cw) < 1 && Math.abs(r.height - ch) < 120 && cw) return;
    cw = r.width; ch = r.height;
    renderer.setSize(cw, ch, false); camera.aspect = cw / ch;
    // o ponto de foco aparece a 38% da altura (mesmo centro das partículas)
    camera.setViewOffset(cw, ch, 0, ch * (.5 - .38), cw, ch);
    camera.updateProjectionMatrix();
    // distância para o carro (~10 unidades) caber na largura
    R = Math.max(20, (camera.aspect < 1 ? 11.5 : 16) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect));
  };
  host.appendChild(canvas);
  host.classList.add('is-3d');
  addEventListener('resize', resize);

  const sm = (a, b, v) => THREE.MathUtils.smoothstep(v, a, b);
  const look = new THREE.Vector3(), camPos = new THREE.Vector3();

  window.NanoCar3D = {
    ready: true,
    render(L, t) {
      resize();
      const doorSide = new THREE.Vector3(target.x, target.y, W - .1);
      dot.position.copy(doorSide);
      // ângulo: gira devagar (vista 3/4) e alinha de lado conforme o zoom começa
      const idle = -.75 + Math.sin(t * .22) * .35;
      const align = sm(0, .35, L);
      const ang = idle * (1 - align);
      // distância: de toda a cena até encostar na porta
      const dist = THREE.MathUtils.lerp(R, .35, sm(.02, .72, L));
      const height = THREE.MathUtils.lerp(3.4, 0, align);
      look.lerpVectors(new THREE.Vector3(0, 1.15, 0), doorSide, sm(0, .45, L));
      camPos.set(look.x + Math.sin(ang) * dist, look.y + height * (dist / R), look.z + Math.cos(ang) * dist);
      camera.position.copy(camPos); camera.lookAt(look);
      renderer.render(scene, camera);
    },
  };
}
