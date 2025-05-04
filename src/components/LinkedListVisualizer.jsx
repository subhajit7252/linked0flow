// File: src/components/LinkedListVisualizer.jsx

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const LinkedListVisualizer = ({ listData = [] }) => {
  const mountRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(ambient);
    scene.add(light);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const nodeMeshes = [];
    const objects = [];


    const nodeSpacing = 6;
    listData.forEach((value, index) => {
      const addressDiv = document.createElement('div');
      addressDiv.innerText = `@${index}`;
      addressDiv.style.position = 'absolute';
      addressDiv.style.left = `${index * 60 + 30}px`;
      addressDiv.style.top = `360px`;
      addressDiv.style.fontSize = '12px';
      addressDiv.style.color = '#333';
      addressDiv.style.textAlign = 'center';
      addressDiv.className = 'linked0flow-address';
      mountRef.current.appendChild(addressDiv);
      const geometry = new THREE.BoxGeometry(3, 3, 3);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ccff });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = index * nodeSpacing;
      cube.userData = { index, value };
      nodeMeshes.push(cube);
      scene.add(cube);

      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(value), canvas.width / 2, canvas.height / 2);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      const labelMaterial = new THREE.SpriteMaterial({ map: texture });
      const label = new THREE.Sprite(labelMaterial);
      label.scale.set(4, 2, 1);
      label.position.set(index * nodeSpacing, 4, 0);
      scene.add(label);

      objects.push(cube);   // after scene.add(cube)
        objects.push(label);  // after scene.add(label)
        //objects.push(line);   // after scene.add(line)

      if (index < listData.length - 1) {
        const points = [];
        points.push(new THREE.Vector3(index * nodeSpacing + 2, 0, 0));
        points.push(new THREE.Vector3((index + 1) * nodeSpacing - 2, 0, 0));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      }
    });

    camera.position.set(10, 10, 20);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const node = intersects[0].object.userData;
        setSelectedNode(node);
      } else {
        setSelectedNode(null);
      }
    };
    renderer.domElement.addEventListener("click", handleClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.domElement.removeEventListener("click", handleClick);
      const addrEls = document.querySelectorAll('.linked0flow-address');
      addrEls.forEach(el => el.remove());
    };
  }, [listData]);

  return (
    <div className="relative overflow-hidden">
      <div ref={mountRef} style={{ width: "100%", height: "400px" }} />
      {selectedNode && (
        <div className="absolute top-2 right-4 bg-white shadow-lg rounded p-2 text-sm">
          <strong>Node Info</strong>
          <div>Index: {selectedNode.index}</div>
          <div>Value: {selectedNode.value}</div>
        </div>
      )}
    </div>
  );
};

export default LinkedListVisualizer;
