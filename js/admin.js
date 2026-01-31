// Admin Panel JavaScript
// Handles all admin functionality including CRUD operations

document.addEventListener('DOMContentLoaded', function () {
    // Initialize
    loadDashboard();
    loadAllForms();
    initTabNavigation();
    initFormHandlers();
    initServicesCRUD();
    initExercisesCRUD();
    initResetButton();
});

// ============================================
// Tab Navigation
// ============================================

function initTabNavigation() {
    const tabs = document.querySelectorAll('.admin-tab');
    const sections = document.querySelectorAll('.admin-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetSection = this.getAttribute('data-section');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update active section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Utility function to switch sections programmatically
function switchSection(sectionId) {
    const tab = document.querySelector(`[data-section="${sectionId}"]`);
    if (tab) tab.click();
}

// ============================================
// Dashboard
// ============================================

function loadDashboard() {
    const data = DataService.getData();
    if (!data) return;

    // Update counts
    const servicesCount = document.getElementById('dashboard-services-count');
    const exercisesCount = document.getElementById('dashboard-exercises-count');

    if (servicesCount) servicesCount.textContent = data.services?.length || 0;
    if (exercisesCount) exercisesCount.textContent = data.exercises?.length || 0;
}

// ============================================
// Load All Forms
// ============================================

function loadAllForms() {
    const data = DataService.getData();
    if (!data) return;

    loadClinicForm(data.clinic);
    loadHeroForm(data.hero);
    loadAboutForm(data.about);
    loadContactForm(data.contact, data.clinic);
    loadFooterForm(data.footer);
    loadSocialForm(data.social);
    loadSEOForm(data.seo);
    loadServicesTable(data.services);
    loadExercisesTable(data.exercises);
}

// Load Clinic Form
function loadClinicForm(clinic) {
    if (!clinic) return;

    const nameInput = document.getElementById('clinic-name');
    const taglineInput = document.getElementById('clinic-tagline');
    const logoPreview = document.getElementById('logo-preview');

    if (nameInput) nameInput.value = clinic.name || '';
    if (taglineInput) taglineInput.value = clinic.tagline || '';

    if (logoPreview && clinic.logo) {
        const img = logoPreview.querySelector('img');
        if (img) img.src = clinic.logo;
        logoPreview.style.display = 'block';
    }
}

// Load Hero Form
function loadHeroForm(hero) {
    if (!hero) return;

    setValue('hero-title', hero.title);
    setValue('hero-subtitle', hero.subtitle);
    setValue('hero-cta-text', hero.ctaText);
    setValue('hero-cta-link', hero.ctaLink);
}

// Load About Form
function loadAboutForm(about) {
    if (!about) return;

    setValue('about-title', about.title);
    setValue('about-content', about.content);
}

// Load Contact Form
function loadContactForm(contact, clinic) {
    if (!clinic) return;

    setValue('contact-phone', clinic.phone);
    setValue('contact-email', clinic.email);
    setValue('contact-whatsapp', clinic.whatsapp);
    setValue('contact-address', clinic.address);

    if (contact) {
        setValue('contact-map-url', contact.mapUrl);
    }
}

// Load Footer Form
function loadFooterForm(footer) {
    if (!footer) return;

    setValue('footer-text', footer.text);
    setValue('footer-copyright', footer.copyright);
}

// Load Social Form
function loadSocialForm(social) {
    if (!social) return;

    setValue('social-facebook', social.facebook);
    setValue('social-instagram', social.instagram);
    setValue('social-twitter', social.twitter);
    setValue('social-linkedin', social.linkedin);
}

// Load SEO Form
function loadSEOForm(seo) {
    if (!seo) return;

    setValue('seo-title', seo.title);
    setValue('seo-description', seo.description);
}

// Utility function to set value
function setValue(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined && value !== null) {
        element.value = value;
    }
}

// ============================================
// Form Handlers
// ============================================

function initFormHandlers() {
    // Clinic Form
    const clinicForm = document.getElementById('clinic-form');
    if (clinicForm) {
        clinicForm.addEventListener('submit', handleClinicSubmit);
    }

    // Logo Upload Preview
    const logoInput = document.getElementById('clinic-logo');
    if (logoInput) {
        logoInput.addEventListener('change', handleLogoUpload);
    }

    // Hero Form
    const heroForm = document.getElementById('hero-form');
    if (heroForm) {
        heroForm.addEventListener('submit', handleHeroSubmit);
    }

    // About Form
    const aboutForm = document.getElementById('about-form');
    if (aboutForm) {
        aboutForm.addEventListener('submit', handleAboutSubmit);
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Footer Form
    const footerForm = document.getElementById('footer-form');
    if (footerForm) {
        footerForm.addEventListener('submit', handleFooterSubmit);
    }

    // Social Form
    const socialForm = document.getElementById('social-form');
    if (socialForm) {
        socialForm.addEventListener('submit', handleSocialSubmit);
    }

    // SEO Form
    const seoForm = document.getElementById('seo-form');
    if (seoForm) {
        seoForm.addEventListener('submit', handleSEOSubmit);
    }
}

// Handle Clinic Submit
function handleClinicSubmit(e) {
    e.preventDefault();

    const data = DataService.getData();
    const clinic = data.clinic || {};

    clinic.name = document.getElementById('clinic-name').value;
    clinic.tagline = document.getElementById('clinic-tagline').value;

    if (DataService.updateSection('clinic', clinic)) {
        showToast('Clinic information updated successfully!', 'success');
    } else {
        showToast('Failed to update clinic information', 'error');
    }
}

// Handle Logo Upload
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const logoPreview = document.getElementById('logo-preview');
        const img = logoPreview.querySelector('img');

        if (img) {
            img.src = event.target.result;
            logoPreview.style.display = 'block';
        }

        // Save to data
        const data = DataService.getData();
        const clinic = data.clinic || {};
        clinic.logo = event.target.result;

        if (DataService.updateSection('clinic', clinic)) {
            showToast('Logo uploaded successfully!', 'success');
        }
    };
    reader.readAsDataURL(file);
}

// Handle Hero Submit
function handleHeroSubmit(e) {
    e.preventDefault();

    const hero = {
        title: document.getElementById('hero-title').value,
        subtitle: document.getElementById('hero-subtitle').value,
        ctaText: document.getElementById('hero-cta-text').value,
        ctaLink: document.getElementById('hero-cta-link').value || '#contact'
    };

    if (DataService.updateSection('hero', hero)) {
        showToast('Hero section updated successfully!', 'success');
    } else {
        showToast('Failed to update hero section', 'error');
    }
}

// Handle About Submit
function handleAboutSubmit(e) {
    e.preventDefault();

    const about = {
        title: document.getElementById('about-title').value,
        content: document.getElementById('about-content').value
    };

    if (DataService.updateSection('about', about)) {
        showToast('About section updated successfully!', 'success');
    } else {
        showToast('Failed to update about section', 'error');
    }
}

// Handle Contact Submit
function handleContactSubmit(e) {
    e.preventDefault();

    const data = DataService.getData();

    // Update clinic contact info
    const clinic = data.clinic || {};
    clinic.phone = document.getElementById('contact-phone').value;
    clinic.email = document.getElementById('contact-email').value;
    clinic.whatsapp = document.getElementById('contact-whatsapp').value;
    clinic.address = document.getElementById('contact-address').value;
    DataService.updateSection('clinic', clinic);

    // Update map
    const contact = data.contact || {};
    contact.mapUrl = document.getElementById('contact-map-url').value;

    if (DataService.updateSection('contact', contact)) {
        showToast('Contact information updated successfully!', 'success');
    } else {
        showToast('Failed to update contact information', 'error');
    }
}

// Handle Footer Submit
function handleFooterSubmit(e) {
    e.preventDefault();

    const footer = {
        text: document.getElementById('footer-text').value,
        copyright: document.getElementById('footer-copyright').value
    };

    if (DataService.updateSection('footer', footer)) {
        showToast('Footer updated successfully!', 'success');
    } else {
        showToast('Failed to update footer', 'error');
    }
}

// Handle Social Submit
function handleSocialSubmit(e) {
    e.preventDefault();

    const social = {
        facebook: document.getElementById('social-facebook').value,
        instagram: document.getElementById('social-instagram').value,
        twitter: document.getElementById('social-twitter').value,
        linkedin: document.getElementById('social-linkedin').value
    };

    if (DataService.updateSection('social', social)) {
        showToast('Social links updated successfully!', 'success');
    } else {
        showToast('Failed to update social links', 'error');
    }
}

// Handle SEO Submit
function handleSEOSubmit(e) {
    e.preventDefault();

    const seo = {
        title: document.getElementById('seo-title').value,
        description: document.getElementById('seo-description').value
    };

    if (DataService.updateSection('seo', seo)) {
        showToast('SEO settings updated successfully!', 'success');
    } else {
        showToast('Failed to update SEO settings', 'error');
    }
}

// ============================================
// Services CRUD
// ============================================

function initServicesCRUD() {
    const addBtn = document.getElementById('add-service-btn');
    const modal = document.getElementById('service-modal');
    const cancelBtn = document.getElementById('service-modal-cancel');
    const saveBtn = document.getElementById('service-modal-save');

    if (addBtn) {
        addBtn.addEventListener('click', () => openServiceModal());
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeServiceModal());
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => saveService());
    }

    // Close modal on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeServiceModal();
        });
    }
}

function loadServicesTable(services) {
    const tbody = document.getElementById('services-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!services || services.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="4">
          <div class="empty-state">
            <div class="empty-state-icon">📦</div>
            <p>No services added yet. Click "Add New Service" to get started.</p>
          </div>
        </td>
      </tr>
    `;
        return;
    }

    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td style="font-size: 2rem;">${service.icon || '🏥'}</td>
      <td><strong>${service.name}</strong></td>
      <td>${service.description}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-sm btn-outline" onclick="editService(${service.id})">✏️ Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteService(${service.id})">🗑️ Delete</button>
        </div>
      </td>
    `;
        tbody.appendChild(row);
    });
}

function openServiceModal(serviceId = null) {
    const modal = document.getElementById('service-modal');
    const title = document.getElementById('service-modal-title');
    const form = document.getElementById('service-modal-form');

    form.reset();

    if (serviceId) {
        // Edit mode
        const data = DataService.getData();
        const service = data.services.find(s => s.id === serviceId);

        if (service) {
            title.textContent = 'Edit Service';
            document.getElementById('service-modal-id').value = service.id;
            document.getElementById('service-modal-name').value = service.name;
            document.getElementById('service-modal-description').value = service.description;
            document.getElementById('service-modal-icon').value = service.icon || '';
        }
    } else {
        // Add mode
        title.textContent = 'Add New Service';
        document.getElementById('service-modal-id').value = '';
    }

    modal.classList.add('active');
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    modal.classList.remove('active');
}

function saveService() {
    const form = document.getElementById('service-modal-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const id = document.getElementById('service-modal-id').value;
    const serviceData = {
        name: document.getElementById('service-modal-name').value,
        description: document.getElementById('service-modal-description').value,
        icon: document.getElementById('service-modal-icon').value || '🏥'
    };

    let success;
    if (id) {
        // Update existing
        success = DataService.updateService(parseInt(id), serviceData);
    } else {
        // Add new
        success = DataService.addService(serviceData);
    }

    if (success) {
        showToast(`Service ${id ? 'updated' : 'added'} successfully!`, 'success');
        closeServiceModal();
        const data = DataService.getData();
        loadServicesTable(data.services);
        loadDashboard();
    } else {
        showToast('Failed to save service', 'error');
    }
}

function editService(id) {
    openServiceModal(id);
}

function deleteService(id) {
    if (!confirm('Are you sure you want to delete this service?')) return;

    if (DataService.deleteService(id)) {
        showToast('Service deleted successfully!', 'success');
        const data = DataService.getData();
        loadServicesTable(data.services);
        loadDashboard();
    } else {
        showToast('Failed to delete service', 'error');
    }
}

// ============================================
// Exercises CRUD
// ============================================

function initExercisesCRUD() {
    const addBtn = document.getElementById('add-exercise-btn');
    const modal = document.getElementById('exercise-modal');
    const cancelBtn = document.getElementById('exercise-modal-cancel');
    const saveBtn = document.getElementById('exercise-modal-save');

    if (addBtn) {
        addBtn.addEventListener('click', () => openExerciseModal());
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeExerciseModal());
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => saveExercise());
    }

    // Close modal on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeExerciseModal();
        });
    }
}

function loadExercisesTable(exercises) {
    const tbody = document.getElementById('exercises-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!exercises || exercises.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="3">
          <div class="empty-state">
            <div class="empty-state-icon">📦</div>
            <p>No treatments added yet. Click "Add New Treatment" to get started.</p>
          </div>
        </td>
      </tr>
    `;
        return;
    }

    exercises.forEach(exercise => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td><strong>${exercise.name}</strong></td>
      <td>${exercise.description}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-sm btn-outline" onclick="editExercise(${exercise.id})">✏️ Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteExercise(${exercise.id})">🗑️ Delete</button>
        </div>
      </td>
    `;
        tbody.appendChild(row);
    });
}

function openExerciseModal(exerciseId = null) {
    const modal = document.getElementById('exercise-modal');
    const title = document.getElementById('exercise-modal-title');
    const form = document.getElementById('exercise-modal-form');

    form.reset();

    if (exerciseId) {
        // Edit mode
        const data = DataService.getData();
        const exercise = data.exercises.find(e => e.id === exerciseId);

        if (exercise) {
            title.textContent = 'Edit Treatment';
            document.getElementById('exercise-modal-id').value = exercise.id;
            document.getElementById('exercise-modal-name').value = exercise.name;
            document.getElementById('exercise-modal-description').value = exercise.description;
        }
    } else {
        // Add mode
        title.textContent = 'Add New Treatment';
        document.getElementById('exercise-modal-id').value = '';
    }

    modal.classList.add('active');
}

function closeExerciseModal() {
    const modal = document.getElementById('exercise-modal');
    modal.classList.remove('active');
}

function saveExercise() {
    const form = document.getElementById('exercise-modal-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const id = document.getElementById('exercise-modal-id').value;
    const exerciseData = {
        name: document.getElementById('exercise-modal-name').value,
        description: document.getElementById('exercise-modal-description').value
    };

    let success;
    if (id) {
        // Update existing
        success = DataService.updateExercise(parseInt(id), exerciseData);
    } else {
        // Add new
        success = DataService.addExercise(exerciseData);
    }

    if (success) {
        showToast(`Treatment ${id ? 'updated' : 'added'} successfully!`, 'success');
        closeExerciseModal();
        const data = DataService.getData();
        loadExercisesTable(data.exercises);
        loadDashboard();
    } else {
        showToast('Failed to save treatment', 'error');
    }
}

function editExercise(id) {
    openExerciseModal(id);
}

function deleteExercise(id) {
    if (!confirm('Are you sure you want to delete this treatment?')) return;

    if (DataService.deleteExercise(id)) {
        showToast('Treatment deleted successfully!', 'success');
        const data = DataService.getData();
        loadExercisesTable(data.exercises);
        loadDashboard();
    } else {
        showToast('Failed to delete treatment', 'error');
    }
}

// ============================================
// Reset Data
// ============================================

function initResetButton() {
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', handleReset);
    }
}

function handleReset() {
    if (!confirm('⚠️ WARNING: This will reset ALL data to default values. This action cannot be undone. Are you sure?')) {
        return;
    }

    if (confirm('Are you ABSOLUTELY sure? All your customizations will be lost.')) {
        if (DataService.resetToDefault()) {
            showToast('Data reset to default successfully!', 'success');
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else {
            showToast('Failed to reset data', 'error');
        }
    }
}

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️';

    toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close">×</button>
  `;

    container.appendChild(toast);

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Make functions global for HTML onclick handlers
window.editService = editService;
window.deleteService = deleteService;
window.editExercise = editExercise;
window.deleteExercise = deleteExercise;
window.switchSection = switchSection;
