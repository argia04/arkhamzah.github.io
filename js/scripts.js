// Preloader Animation
$(window).on("load", function() {
    $("#preloader").fadeOut("slow");
});

// Smooth Page Transitions
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (link.getAttribute('href').startsWith('#')) return;
        e.preventDefault();
        document.body.classList.remove('fade-in');
        setTimeout(() => {
            window.location = link.href;
        }, 500);
    });
});

// Scroll-to-Top Button Functionality
const scrollToTopButton = document.getElementById("scrollToTop");
window.addEventListener("scroll", function() {
    scrollToTopButton.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollToTopButton.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initialize Chart.js for Adafruit Data
const ctx = document.getElementById('trash-stats-chart').getContext('2d');
const trashStatsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Distance (cm)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 4,
            tension: 0.2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 100,
                ticks: { stepSize: 10 }
            }
        }
    }
});

// Fetch Data from Adafruit and Update Chart and Notification
const AIO_KEY = 'aio_bxZp59xAzUZGQZjarfCUXjGdEvB0';
const FEED_URL = 'https://io.adafruit.com/api/v2/arkhamzah/feeds/distance1/data';

function fetchAdafruitData() {
    $.ajax({
        url: FEED_URL,
        headers: { "X-AIO-Key": AIO_KEY },
        method: "GET",
        success: function(data) {
            const labels = [];
            const values = [];

            data.slice(0, 10).reverse().forEach(entry => {
                labels.push(new Date(entry.created_at).toLocaleTimeString());
                values.push(entry.value);
            });

            // Update Chart with Fetched Data
            trashStatsChart.data.labels = labels;
            trashStatsChart.data.datasets[0].data = values;
            trashStatsChart.update();

            // Update Trend Notification with Latest Distance Data
            const latestValue = data[0].value;
            showTrendNotification(`Current Distance: ${latestValue} cm`);
        },
        error: function() {
            console.error("Failed to fetch data from Adafruit");
        }
    });
}

// Show Notification with Real-Time Distance Data
function showTrendNotification(message) {
    const notification = document.getElementById('trend-notification');
    notification.textContent = message;
    notification.style.display = 'block';

    // Keep the Notification Visible with Each Update
    clearTimeout(notification.timeout);
    notification.timeout = setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Repeatedly Fetch Data Every 5 Seconds
$(document).ready(function() {
    fetchAdafruitData();
    setInterval(fetchAdafruitData, 5000);

    // Smooth Fade-In Effect
    $('.fade-in').css('opacity', 1);

    // Form Submission Animation for Contact Form
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        alert("Your message has been sent!");
        $(this).trigger('reset');
    });

    // Counter Animation for Stats Numbers
    $('.stat-number').each(function() {
        const $this = $(this);
        const countTo = $this.attr('data-count');
        $({ countNum: $this.text() }).animate(
            { countNum: countTo },
            {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            }
        );
    });

    // Apply Fade-In Effect on Scroll for Specified Elements
    const fadeElements = document.querySelectorAll('.fade-in-element');
    function checkFadeIn() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                element.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('load', checkFadeIn); // Initial Check on Page Load
});

// Initialize Leaflet Map with Sample Markers
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const impactData = [
    { location: [37.7749, -122.4194], description: 'Waste Reduction - San Francisco, 500kg' },
    { location: [51.5074, -0.1278], description: 'Eco Project - London, 200 plants' },
];

impactData.forEach(data => {
    L.marker(data.location)
        .addTo(map)
        .bindPopup(data.description)
        .openPopup();
});

// Log Map Update Periodically
setInterval(() => {
    console.log("Updating map data...");
}, 10000);

// Toggle Trend Notification Visibility
function toggleNotification() {
    const notification = document.getElementById('trend-notification');
    notification.style.display = notification.style.display === 'block' ? 'none' : 'block';
}

// Scroll Animation for Timeline Items
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll('.fade-in-element');

    function checkFadeIn() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('load', checkFadeIn); // Initial check on page load
});

// Scroll Animation for Fade-In Elements
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll('.fade-in-element');

    function checkFadeIn() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('load', checkFadeIn); // Initial check on page load
});

// Scroll Animation for Timeline Items
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll('.fade-in-element');

    function checkFadeIn() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('load', checkFadeIn); // Initial check on page load
});

// Scroll Animation for Fade-In Elements
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll('.fade-in-element');

    function checkFadeIn() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('load', checkFadeIn); // Initial check on page load
});
