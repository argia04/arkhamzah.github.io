// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, 500); // Set height explicitly
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create a basic globe with texture mapping
const globeGeometry = new THREE.SphereGeometry(5, 50, 50);
const globeMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('assets/earth-map.jpg'), // Ensure this path is correct
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// Position the camera
camera.position.z = 12;

// Rotate the globe for effect
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Adjust globe size on window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('globe-container');
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
});
