// ============================================
// COURSE MANAGEMENT APPLICATION
// ============================================

// --- DATA LAYER ---
const CATEGORY_MAP = {
    programming: { label: 'Programación', icon: 'code', color: '#7c3aed' },
    design: { label: 'Diseño', icon: 'palette', color: '#ec4899' },
    marketing: { label: 'Marketing', icon: 'campaign', color: '#f59e0b' },
    business: { label: 'Negocios', icon: 'business_center', color: '#06b6d4' },
    data: { label: 'Datos & IA', icon: 'psychology', color: '#10b981' }
};

const LEVEL_MAP = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
};

const STATUS_MAP = {
    active: 'Activo',
    draft: 'Borrador',
    archived: 'Archivado'
};

const BANNER_GRADIENTS = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f5576c 0%, #ff6f91 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
];

// Sample data
const defaultCourses = [
    {
        id: '1',
        name: 'Python para Ciencia de Datos',
        description: 'Aprende Python desde cero y domina las bibliotecas más utilizadas en ciencia de datos como Pandas, NumPy y Matplotlib.',
        instructor: 'María González',
        category: 'data',
        status: 'active',
        duration: 48,
        students: 342,
        price: 59.99,
        level: 'intermediate',
        createdAt: '2026-01-15',
        bannerIndex: 0
    },
    {
        id: '2',
        name: 'Diseño UX/UI Avanzado',
        description: 'Domina las mejores prácticas de diseño de interfaces y experiencia de usuario con Figma y herramientas modernas.',
        instructor: 'Carlos Ruiz',
        category: 'design',
        status: 'active',
        duration: 36,
        students: 215,
        price: 79.99,
        level: 'advanced',
        createdAt: '2026-01-20',
        bannerIndex: 1
    },
    {
        id: '3',
        name: 'Marketing Digital 360°',
        description: 'Estrategias completas de marketing digital: SEO, SEM, redes sociales, email marketing y analítica web.',
        instructor: 'Ana Martínez',
        category: 'marketing',
        status: 'active',
        duration: 52,
        students: 189,
        price: 49.99,
        level: 'beginner',
        createdAt: '2026-02-01',
        bannerIndex: 2
    },
    {
        id: '4',
        name: 'React.js y Next.js Moderno',
        description: 'Construye aplicaciones web modernas y escalables con React 19, Next.js 15, TypeScript y las mejores prácticas.',
        instructor: 'Roberto López',
        category: 'programming',
        status: 'active',
        duration: 64,
        students: 478,
        price: 89.99,
        level: 'intermediate',
        createdAt: '2026-02-10',
        bannerIndex: 3
    },
    {
        id: '5',
        name: 'Machine Learning Práctico',
        description: 'Implementa algoritmos de ML desde cero y aprende a usar scikit-learn, TensorFlow y técnicas de producción.',
        instructor: 'Elena Torres',
        category: 'data',
        status: 'draft',
        duration: 72,
        students: 0,
        price: 99.99,
        level: 'advanced',
        createdAt: '2026-02-15',
        bannerIndex: 4
    },
    {
        id: '6',
        name: 'Emprendimiento Digital',
        description: 'Guía completa para lanzar y escalar tu negocio digital. Desde la idea hasta la monetización efectiva.',
        instructor: 'Pedro Sánchez',
        category: 'business',
        status: 'active',
        duration: 30,
        students: 156,
        price: 39.99,
        level: 'beginner',
        createdAt: '2026-02-18',
        bannerIndex: 5
    },
    {
        id: '7',
        name: 'JavaScript Full Stack',
        description: 'Domina JavaScript completo: ES6+, Node.js, Express, MongoDB y despliegue en la nube con Docker.',
        instructor: 'Diego Hernández',
        category: 'programming',
        status: 'archived',
        duration: 80,
        students: 523,
        price: 69.99,
        level: 'intermediate',
        createdAt: '2025-11-05',
        bannerIndex: 6
    },
    {
        id: '8',
        name: 'Branding y Estrategia de Marca',
        description: 'Crea marcas memorables. Aprende identidad visual, naming, posicionamiento y storytelling de marca.',
        instructor: 'Laura Díaz',
        category: 'design',
        status: 'draft',
        duration: 24,
        students: 0,
        price: 44.99,
        level: 'beginner',
        createdAt: '2026-02-20',
        bannerIndex: 7
    },
];


// --- STATE ---
class AppState {
    constructor() {
        this.courses = this.loadCourses();
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.currentView = 'grid';
        this.searchQuery = '';
        this.editingCourseId = null;
    }

    loadCourses() {
        const stored = localStorage.getItem('coursehub_courses');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return [...defaultCourses];
            }
        }
        return [...defaultCourses];
    }

    saveCourses() {
        localStorage.setItem('coursehub_courses', JSON.stringify(this.courses));
    }

    addCourse(course) {
        course.id = Date.now().toString();
        course.createdAt = new Date().toISOString().slice(0, 10);
        course.bannerIndex = Math.floor(Math.random() * BANNER_GRADIENTS.length);
        this.courses.unshift(course);
        this.saveCourses();
    }

    updateCourse(id, data) {
        const index = this.courses.findIndex(c => c.id === id);
        if (index !== -1) {
            this.courses[index] = { ...this.courses[index], ...data };
            this.saveCourses();
        }
    }

    deleteCourse(id) {
        this.courses = this.courses.filter(c => c.id !== id);
        this.saveCourses();
    }

    getCourse(id) {
        return this.courses.find(c => c.id === id);
    }

    getFilteredCourses() {
        return this.courses.filter(course => {
            const matchesFilter = this.currentFilter === 'all' || course.status === this.currentFilter;
            const matchesCategory = this.currentCategory === 'all' || course.category === this.currentCategory;
            const matchesSearch = this.searchQuery === '' ||
                course.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                course.instructor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesFilter && matchesCategory && matchesSearch;
        });
    }

    getStats() {
        const total = this.courses.length;
        const active = this.courses.filter(c => c.status === 'active').length;
        const totalStudents = this.courses.reduce((sum, c) => sum + (c.students || 0), 0);
        const completionRate = total > 0 ? Math.round((active / total) * 100) : 0;
        return { total, active, totalStudents, completionRate };
    }
}


// --- UI CONTROLLER ---
class CourseApp {
    constructor() {
        this.state = new AppState();
        this.cacheDOM();
        this.bindEvents();
        this.render();
    }

    cacheDOM() {
        // Sidebar
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.querySelectorAll('.nav-link');

        // Search
        this.searchInput = document.getElementById('searchInput');

        // Stats
        this.statTotalCourses = document.getElementById('statTotalCourses');
        this.statActiveCourses = document.getElementById('statActiveCourses');
        this.statTotalStudents = document.getElementById('statTotalStudents');
        this.statCompletionRate = document.getElementById('statCompletionRate');

        // Filters & View
        this.filterChips = document.querySelectorAll('.filter-chip');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.viewBtns = document.querySelectorAll('.view-btn');
        this.coursesGrid = document.getElementById('coursesGrid');
        this.emptyState = document.getElementById('emptyState');

        // Page Header
        this.pageTitle = document.getElementById('pageTitle');
        this.pageSubtitle = document.getElementById('pageSubtitle');

        // Modals
        this.courseModal = document.getElementById('courseModal');
        this.deleteModal = document.getElementById('deleteModal');
        this.courseForm = document.getElementById('courseForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.deleteCourseName = document.getElementById('deleteCourseName');

        // Buttons
        this.addCourseBtn = document.getElementById('addCourseBtn');
        this.emptyAddBtn = document.getElementById('emptyAddBtn');
        this.modalClose = document.getElementById('modalClose');
        this.modalCancel = document.getElementById('modalCancel');
        this.modalSave = document.getElementById('modalSave');
        this.deleteModalClose = document.getElementById('deleteModalClose');
        this.deleteCancelBtn = document.getElementById('deleteCancelBtn');
        this.deleteConfirmBtn = document.getElementById('deleteConfirmBtn');

        // Toast
        this.toastContainer = document.getElementById('toastContainer');
    }

    bindEvents() {
        // Sidebar
        this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        this.mobileMenuBtn.addEventListener('click', () => this.openMobileSidebar());

        // Navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveNav(link);
            });
        });

        // Search
        this.searchInput.addEventListener('input', (e) => {
            this.state.searchQuery = e.target.value;
            this.renderCourses();
        });

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.searchInput.focus();
            }
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Filters
        this.filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.state.currentFilter = chip.dataset.filter;
                this.renderCourses();
            });
        });

        this.categoryFilter.addEventListener('change', (e) => {
            this.state.currentCategory = e.target.value;
            this.renderCourses();
        });

        // View toggle
        this.viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.currentView = btn.dataset.view;
                this.applyView();
            });
        });

        // Add course buttons
        this.addCourseBtn.addEventListener('click', () => this.openCourseModal());
        this.emptyAddBtn.addEventListener('click', () => this.openCourseModal());

        // Modal controls
        this.modalClose.addEventListener('click', () => this.closeCourseModal());
        this.modalCancel.addEventListener('click', () => this.closeCourseModal());
        this.modalSave.addEventListener('click', () => this.saveCourse());
        this.deleteModalClose.addEventListener('click', () => this.closeDeleteModal());
        this.deleteCancelBtn.addEventListener('click', () => this.closeDeleteModal());
        this.deleteConfirmBtn.addEventListener('click', () => this.confirmDelete());

        // Close modals on overlay click
        this.courseModal.addEventListener('click', (e) => {
            if (e.target === this.courseModal) this.closeCourseModal();
        });
        this.deleteModal.addEventListener('click', (e) => {
            if (e.target === this.deleteModal) this.closeDeleteModal();
        });

        // Course grid delegation for edit/delete buttons
        this.coursesGrid.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-btn');
            const deleteBtn = e.target.closest('.delete-btn');

            if (editBtn) {
                const courseId = editBtn.dataset.id;
                this.openCourseModal(courseId);
            }

            if (deleteBtn) {
                const courseId = deleteBtn.dataset.id;
                this.openDeleteModal(courseId);
            }
        });
    }

    // --- SIDEBAR ---
    toggleSidebar() {
        this.sidebar.classList.toggle('collapsed');
        const isCollapsed = this.sidebar.classList.contains('collapsed');
        this.sidebar.style.width = isCollapsed ? 'var(--sidebar-collapsed)' : '';
        document.querySelector('.main-content').style.marginLeft = isCollapsed ? 'var(--sidebar-collapsed)' : '';
    }

    openMobileSidebar() {
        this.sidebar.classList.add('mobile-open');
        let backdrop = document.querySelector('.sidebar-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'sidebar-backdrop';
            document.body.appendChild(backdrop);
        }
        setTimeout(() => backdrop.classList.add('active'), 10);
        backdrop.addEventListener('click', () => this.closeMobileSidebar());
    }

    closeMobileSidebar() {
        this.sidebar.classList.remove('mobile-open');
        const backdrop = document.querySelector('.sidebar-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
            setTimeout(() => backdrop.remove(), 300);
        }
    }

    setActiveNav(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
        const section = activeLink.dataset.section;
        const titles = {
            dashboard: { title: 'Dashboard', subtitle: 'Bienvenido de nuevo. Aquí tienes un resumen de tus cursos.' },
            courses: { title: 'Mis Cursos', subtitle: 'Gestiona y organiza todos tus cursos educativos.' },
            categories: { title: 'Categorías', subtitle: 'Explora los cursos por categoría.' },
            students: { title: 'Estudiantes', subtitle: 'Visualiza los estudiantes inscriptos en tus cursos.' },
            analytics: { title: 'Analíticas', subtitle: 'Estadísticas y métricas de tus cursos.' }
        };
        const info = titles[section] || titles.dashboard;
        this.pageTitle.textContent = info.title;
        this.pageSubtitle.textContent = info.subtitle;
    }

    // --- RENDER ---
    render() {
        this.renderStats();
        this.renderCourses();
    }

    renderStats() {
        const stats = this.state.getStats();
        this.animateNumber(this.statTotalCourses, stats.total);
        this.animateNumber(this.statActiveCourses, stats.active);
        this.animateNumber(this.statTotalStudents, stats.totalStudents);
        this.animateNumber(this.statCompletionRate, stats.completionRate, '%');
    }

    animateNumber(element, target, suffix = '') {
        const duration = 800;
        const start = parseInt(element.textContent) || 0;
        const range = target - start;
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(start + range * eased);
            element.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }

    renderCourses() {
        const filtered = this.state.getFilteredCourses();

        if (filtered.length === 0) {
            this.coursesGrid.innerHTML = '';
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');
        this.coursesGrid.innerHTML = filtered.map((course, index) => this.createCourseCard(course, index)).join('');
        this.applyView();
    }

    createCourseCard(course, index) {
        const cat = CATEGORY_MAP[course.category] || { label: course.category, icon: 'folder', color: '#7c3aed' };
        const gradient = BANNER_GRADIENTS[course.bannerIndex % BANNER_GRADIENTS.length];
        const initials = course.instructor.split(' ').map(n => n[0]).join('').toUpperCase();
        const priceDisplay = course.price ? `$${parseFloat(course.price).toFixed(2)}` : 'Gratis';

        return `
            <div class="course-card" style="animation-delay: ${index * 0.06}s">
                <div class="card-banner">
                    <div class="card-banner-bg" style="background: ${gradient}">
                        <span class="material-icons-round">${cat.icon}</span>
                    </div>
                    <span class="card-status ${course.status}">${STATUS_MAP[course.status]}</span>
                    <span class="card-level">${LEVEL_MAP[course.level] || course.level}</span>
                </div>
                <div class="card-body">
                    <span class="card-category" style="color: ${cat.color}">${cat.label}</span>
                    <h3 class="card-title">${this.escapeHtml(course.name)}</h3>
                    <p class="card-description">${this.escapeHtml(course.description || '')}</p>
                    <div class="card-meta">
                        <span class="card-meta-item">
                            <span class="material-icons-round">schedule</span>
                            ${course.duration || 0}h
                        </span>
                        <span class="card-meta-item">
                            <span class="material-icons-round">groups</span>
                            ${(course.students || 0).toLocaleString()}
                        </span>
                        <span class="card-price">${priceDisplay}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-instructor">
                        <div class="instructor-avatar">${initials}</div>
                        <span class="instructor-name">${this.escapeHtml(course.instructor)}</span>
                    </div>
                    <div class="card-actions">
                        <button class="card-action-btn edit-btn" data-id="${course.id}" title="Editar curso" aria-label="Edit course">
                            <span class="material-icons-round">edit</span>
                        </button>
                        <button class="card-action-btn delete delete-btn" data-id="${course.id}" title="Eliminar curso" aria-label="Delete course">
                            <span class="material-icons-round">delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    applyView() {
        if (this.state.currentView === 'list') {
            this.coursesGrid.classList.add('list-view');
        } else {
            this.coursesGrid.classList.remove('list-view');
        }
    }

    // --- MODALS ---
    openCourseModal(courseId = null) {
        this.state.editingCourseId = courseId;
        this.courseForm.reset();

        if (courseId) {
            const course = this.state.getCourse(courseId);
            if (!course) return;
            this.modalTitle.textContent = 'Editar Curso';
            document.getElementById('courseName').value = course.name;
            document.getElementById('courseInstructor').value = course.instructor;
            document.getElementById('courseDescription').value = course.description || '';
            document.getElementById('courseCategory').value = course.category;
            document.getElementById('courseStatus').value = course.status;
            document.getElementById('courseDuration').value = course.duration || '';
            document.getElementById('courseStudents').value = course.students || '';
            document.getElementById('coursePrice').value = course.price || '';
            document.getElementById('courseLevel').value = course.level || 'beginner';
            document.getElementById('courseId').value = course.id;
        } else {
            this.modalTitle.textContent = 'Nuevo Curso';
            document.getElementById('courseId').value = '';
        }

        this.courseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => document.getElementById('courseName').focus(), 300);
    }

    closeCourseModal() {
        this.courseModal.classList.remove('active');
        document.body.style.overflow = '';
        this.state.editingCourseId = null;
    }

    openDeleteModal(courseId) {
        this.state.editingCourseId = courseId;
        const course = this.state.getCourse(courseId);
        if (!course) return;
        this.deleteCourseName.textContent = course.name;
        this.deleteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeDeleteModal() {
        this.deleteModal.classList.remove('active');
        document.body.style.overflow = '';
        this.state.editingCourseId = null;
    }

    closeAllModals() {
        this.closeCourseModal();
        this.closeDeleteModal();
    }

    // --- CRUD OPERATIONS ---
    saveCourse() {
        const name = document.getElementById('courseName').value.trim();
        const instructor = document.getElementById('courseInstructor').value.trim();
        const category = document.getElementById('courseCategory').value;

        if (!name || !instructor || !category) {
            this.showToast('Por favor completa todos los campos obligatorios.', 'error');
            return;
        }

        const courseData = {
            name,
            instructor,
            description: document.getElementById('courseDescription').value.trim(),
            category,
            status: document.getElementById('courseStatus').value,
            duration: parseInt(document.getElementById('courseDuration').value) || 0,
            students: parseInt(document.getElementById('courseStudents').value) || 0,
            price: parseFloat(document.getElementById('coursePrice').value) || 0,
            level: document.getElementById('courseLevel').value,
        };

        const editId = document.getElementById('courseId').value;

        if (editId) {
            this.state.updateCourse(editId, courseData);
            this.showToast(`Curso "${name}" actualizado correctamente.`, 'success');
        } else {
            this.state.addCourse(courseData);
            this.showToast(`Curso "${name}" creado correctamente.`, 'success');
        }

        this.closeCourseModal();
        this.render();
    }

    confirmDelete() {
        const courseId = this.state.editingCourseId;
        const course = this.state.getCourse(courseId);
        if (!course) return;

        const name = course.name;
        this.state.deleteCourse(courseId);
        this.closeDeleteModal();
        this.render();
        this.showToast(`Curso "${name}" eliminado correctamente.`, 'success');
    }

    // --- TOAST NOTIFICATIONS ---
    showToast(message, type = 'info') {
        const iconMap = {
            success: 'check_circle',
            error: 'error',
            info: 'info'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="material-icons-round toast-icon">${iconMap[type]}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Close notification">
                <span class="material-icons-round">close</span>
            </button>
        `;

        this.toastContainer.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));

        setTimeout(() => this.removeToast(toast), 3200);
    }

    removeToast(toast) {
        if (!toast || toast.classList.contains('removing')) return;
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }

    // --- UTILS ---
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}


// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CourseApp();
});
