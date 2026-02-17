document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Logic ---
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.navigation a');
    const scrollContainer = document.querySelector('.scroll-container');

    // Observer options
    const observerOptions = {
        root: scrollContainer,
        threshold: 0.5 // Trigger when 50% of the slide is visible
    };

    // --- KPI Modal Data & Logic ---
    const kpiData = {
        financial: {
            subtitle: "Perspectiva Financiera",
            title: "Confianza del Inversionista",
            calc: "Tasa de Ejecución = (Inversión Realizada / Inversión Proyectada) x 100",
            function: "Este KPI monitorea la capacidad de ejecución real del presupuesto ($12,000 MDD). Un valor bajo indica burocracia o falta de liquidez; un valor alto genera confianza en mercados internacionales.",
            initiative: "Estrategia de Inversión Mixta: Asegurar el 54% de participación estatal mediante bonos de deuda soberana verde, permitiendo al sector privado inyectar el 46% restante en tecnología de punta.",
            chartData: [20, 45, 68, 85, 92],
            chartLabel: "Ejecución Presupuestal (%)",
            chartColor: "#10b981"
        },
        customer: {
            subtitle: "Perspectiva del Cliente (Ciudadanía/Red)",
            title: "Desbloqueo de Capacidad",
            calc: "Cuello de Botella = (Proyectos Detenidos / Capacidad Total Nacional)",
            function: "Mide cuánta energía limpia está 'atrapada' en trámites. Actualmente 5.3% de la capacidad (414 MW) está instalada pero no operativa por falta de permisos.",
            initiative: "Ventanilla Única Digital: Plataforma blockchain para trazabilidad de permisos que elimina duplicidad de trámites en 5 dependencias diferentes.",
            chartData: [414, 350, 200, 100, 20],
            chartLabel: "MW Detenidos (Reducción meta)",
            chartColor: "#3b82f6"
        },
        processes: {
            subtitle: "Perspectiva de Procesos Internos",
            title: "Agilidad Regulatoria",
            calc: "Tiempo Promedio = (Fecha Autorización - Fecha Solicitud) en días",
            function: "Evalúa la eficiencia operativa del ente regulador. Reducir este tiempo es crítico para competir con otros mercados energéticos emergentes.",
            initiative: "Fast-Track Energético: Protocolo de aprobación automática (60 días) para proyectos que cumplan pre-certificación de impacto ambiental estándar.",
            chartData: [540, 360, 180, 90, 60],
            chartLabel: "Días de Trámite (Tiempo)",
            chartColor: "#f59e0b"
        },
        learning: {
            subtitle: "Aprendizaje y Crecimiento",
            title: "Impacto Ambiental Real",
            calc: "Mitigación = (Emisiones Base - Emisiones Actuales) / Meta Nacional",
            function: "No solo mide CO2, sino la capacidad técnica adquirida por el personal para mantener estas reducciones a largo plazo.",
            initiative: "Capacitación CleanTech: Programa nacional de certificación para ingenieros locales en mantenimiento de turbinas de 15MW.",
            chartData: [5, 12, 18, 22, 25.1],
            chartLabel: "Contr. a Meta Nacional (%)",
            chartColor: "#8b5cf6"
        }
    };

    const modal = document.getElementById('kpiModal');
    const cards = document.querySelectorAll('.bsc-card');
    const closeBtn = document.getElementById('closeModal');
    let modalChartInstance = null;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.getAttribute('data-type');
            openModal(type);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    function openModal(type) {
        const data = kpiData[type];
        if (!data) return;

        // Update Text
        document.getElementById('modalSubtitle').innerText = data.subtitle;
        document.getElementById('modalSubtitle').style.color = data.chartColor;
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalCalc').innerText = data.calc;
        document.getElementById('modalCalc').style.borderLeftColor = data.chartColor;
        document.getElementById('modalFunction').innerText = data.function;
        document.getElementById('modalInitiative').innerText = data.initiative;

        // Update Chart
        const ctx = document.getElementById('modalChart').getContext('2d');

        if (modalChartInstance) {
            modalChartInstance.destroy();
        }

        modalChartInstance = new Chart(ctx, {
            type: 'bar', // Can vary per type if we wanted
            data: {
                labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5'],
                datasets: [{
                    label: data.chartLabel,
                    data: data.chartData,
                    backgroundColor: data.chartColor,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, labels: { color: '#fff' } }
                },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#cbd5e1' } },
                    x: { ticks: { color: '#cbd5e1' } }
                }
            }
        });

        modal.classList.add('active');
    }

    // --- Chart.js Instances ---
    let growthChart = null;
    let efficiencyChart = null;

    function initCharts() {
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Outfit', sans-serif";

        // 1. Growth Chart (Slide 2)
        const ctxGrowth = document.getElementById('growthChart').getContext('2d');
        const gradientGrowth = ctxGrowth.createLinearGradient(0, 400, 0, 0);
        gradientGrowth.addColorStop(0, 'rgba(0, 242, 96, 0.1)');
        gradientGrowth.addColorStop(1, 'rgba(0, 242, 96, 0.6)');

        growthChart = new Chart(ctxGrowth, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025 (P)', '2026 (P)'],
                datasets: [{
                    label: 'Retorno de Inversión (Millones USD)',
                    data: [120, 150, 210, 350, 580, 820, 1200],
                    borderColor: '#00f260',
                    backgroundColor: gradientGrowth,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#fff',
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#fff', font: { size: 14 } } },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.1)' }, beginAtZero: true },
                    x: { grid: { display: false } }
                }
            }
        });

        // 2. Efficiency Chart (Slide 3)
        const ctxEff = document.getElementById('efficiencyChart').getContext('2d');
        efficiencyChart = new Chart(ctxEff, {
            type: 'bar',
            data: {
                labels: ['Gas Natural', 'Carbón', 'Eólica (Tradicional)', 'Nueva Eólica (High-Tech)'],
                datasets: [{
                    label: 'Eficiencia Energética (ROI/MW)',
                    data: [45, 38, 65, 92],
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.2)',
                        'rgba(255, 255, 255, 0.2)',
                        'rgba(5, 117, 230, 0.5)',
                        'rgba(0, 242, 96, 0.8)'
                    ],
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // Horizontal bars
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { grid: { display: false }, ticks: { color: '#fff', font: { size: 12 } } }
                }
            }
        });
    }

    // Call init but maybe reset data for animation loop
    initCharts();

    // --- Anime.js Animations & Intersection Observer ---

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = entry.target.getAttribute('data-index');

                // Navigation
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');

                // Trigger General Animations
                animateSlide(entry.target);

                // Trigger Chart Animations specific to slide
                if (index === '2' && growthChart) {
                    // Re-render to animate
                    growthChart.reset();
                    growthChart.update();
                }
                if (index === '4' && efficiencyChart) {
                    efficiencyChart.reset();
                    efficiencyChart.update();
                }
            }
        });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));



    // --- Anime.js Animations ---

    function animateSlide(slideElement) {
        // Reset opacity/transform for replayability if desired, 
        // or just ensure they are in initial state before animating.
        // For simple presentation flow, we just animate in.

        // Text Animations
        const textElements = slideElement.querySelectorAll('.animate-text');
        if (textElements.length > 0) {
            anime({
                targets: textElements,
                translateY: [20, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1000,
                delay: anime.stagger(200) // Delay between each text element
            });
        }

        // Card Animations (Slide 2)
        const cards = slideElement.querySelectorAll('.animate-card');
        if (cards.length > 0) {
            anime({
                targets: cards,
                translateY: [50, 0],
                opacity: [0, 1],
                scale: [0.9, 1],
                easing: 'spring(1, 80, 10, 0)',
                delay: anime.stagger(150, { start: 300 })
            });
        }

        // Visuals (Slide 3)
        const visuals = slideElement.querySelectorAll('.animate-visual');
        if (visuals.length > 0) {
            anime({
                targets: visuals,
                translateX: [50, 0],
                opacity: [0, 1],
                easing: 'easeOutCubic',
                duration: 1200,
                delay: 200
            });
        }

        // BSC Cards (Slide 4)
        const bscCards = slideElement.querySelectorAll('.animate-bsc');
        if (bscCards.length > 0) {
            anime({
                targets: bscCards,
                translateY: [30, 0],
                opacity: [0, 1],
                easing: 'easeOutQuad',
                duration: 800,
                delay: anime.stagger(100, { start: 200 })
            });
        }

        // Objective Box Zoom (Slide 5)
        const zoomBox = slideElement.querySelectorAll('.animate-zoom');
        if (zoomBox.length > 0) {
            anime({
                targets: zoomBox,
                scale: [0.8, 1],
                opacity: [0, 1],
                easing: 'easeOutElastic(1, .8)',
                duration: 1500,
                delay: 200
            });
        }

        // Special Turbine Animation if visible
        const turbineBlades = slideElement.querySelector('.blades');
        if (turbineBlades) {
            // Remove CSS animation to let Anime take over smoothly or enhance it
            turbineBlades.style.animation = 'none';
            anime({
                targets: turbineBlades,
                rotate: '1turn',
                loop: true,
                duration: 3000,
                easing: 'linear'
            });
        }
    }

    // --- Smooth Scroll for Nav Dots ---
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSlide = slides[index];
            targetSlide.scrollIntoView({ behavior: 'smooth' });
        });
    });

});
