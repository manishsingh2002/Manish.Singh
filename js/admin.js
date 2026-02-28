class PortfolioAdmin {
    constructor() {
        this.data = null;
        this.schema = null;
        this.currentSection = 'personal';
        this.init();
    }

    async init() {
        await this.loadSchema();
        await this.loadData();
        this.setupEventListeners();
        this.renderForm();
        this.setupNavigation();
    }

    async loadSchema() {
        try {
            // Schema is embedded in the page or loaded from file
            this.schema = window.portfolioSchema || null;
            console.log('Schema loaded');
        } catch (error) {
            console.error('Error loading schema:', error);
        }
    }

    async loadData() {
        try {
            const response = await fetch('data/portfolio.json');
            this.data = await response.json();
            console.log('Data loaded:', this.data);
        } catch (error) {
            console.error('Error loading data:', error);
            this.data = this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            schemaVersion: "1.0.0",
            personalInfo: {
                name: "",
                title: "",
                tagline: "",
                email: "",
                phone: "",
                location: {
                    city: "",
                    country: "",
                    timezone: "",
                    remote: true
                },
                socialProfiles: []
            },
            professionalSummary: {
                summary: "",
                detailedBio: "",
                yearsOfExperience: 0,
                availableForHire: false,
                openToWork: {
                    status: false,
                    positions: [],
                    locations: [],
                    workTypes: []
                }
            },
            technicalSkills: {
                languages: [],
                frameworks: [],
                databases: [],
                devTools: [],
                platforms: [],
                specialties: []
            },
            projects: [],
            workExperience: [],
            education: [],
            certifications: [],
            achievements: [],
            blog: {
                platform: "",
                posts: []
            },
            talks: [],
            openSource: [],
            testimonials: [],
            services: [],
            interests: [],
            languages: [],
            contact: {
                email: "",
                contactForm: {
                    enabled: true,
                    endpoint: "",
                    recaptcha: false,
                    fields: [
                        { name: "name", type: "text", required: true, placeholder: "Your Name" },
                        { name: "email", type: "email", required: true, placeholder: "Your Email" },
                        { name: "message", type: "textarea", required: true, placeholder: "Your Message" }
                    ]
                },
                calendly: ""
            },
            seo: {
                title: "",
                description: "",
                keywords: [],
                author: "",
                ogImage: "",
                favicon: "",
                canonicalUrl: "",
                twitterHandle: "",
                robots: "index, follow"
            },
            theme: {
                primaryColor: "#0066ff",
                secondaryColor: "#00cc88",
                darkMode: true,
                fontFamily: "Inter, sans-serif",
                layout: "modern"
            },
            analytics: {
                googleAnalytics: "",
                plausible: "",
                hotjar: ""
            },
            meta: {
                lastUpdated: new Date().toISOString(),
                version: "1.0.0",
                buildInfo: {
                    framework: "",
                    generator: "Portfolio Admin",
                    environment: "development"
                }
            }
        };
    }

    renderForm() {
        this.populateForm(this.data, document.getElementById('portfolio-form'));
        this.renderArrayFields();
    }

    populateForm(data, form, prefix = '') {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                const fieldName = prefix ? `${prefix}.${key}` : key;
                
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    this.populateForm(value, form, fieldName);
                } else {
                    const input = form.querySelector(`[name="${fieldName}"]`);
                    if (input) {
                        if (input.type === 'checkbox') {
                            input.checked = value || false;
                        } else {
                            input.value = value || '';
                        }
                    }
                }
            }
        }
    }

    renderArrayFields() {
        // Social Profiles
        this.renderSimpleArray('socialProfiles', this.data.personalInfo?.socialProfiles || [], (item) => `
            <div class="item-fields">
                <select name="platform">
                    ${this.getPlatformOptions(item.platform)}
                </select>
                <input type="url" name="url" value="${item.url || ''}" placeholder="URL">
                <input type="text" name="username" value="${item.username || ''}" placeholder="Username">
                <label>
                    <input type="checkbox" name="display" ${item.display !== false ? 'checked' : ''}> Display
                </label>
            </div>
        `);

        // Languages
        this.renderSimpleArray('languages', this.data.technicalSkills?.languages || [], (item) => `
            <div class="item-fields">
                <input type="text" name="name" value="${item.name || ''}" placeholder="Language">
                <input type="number" name="proficiency" value="${item.proficiency || 0}" min="0" max="100">
                <input type="number" name="yearsUsed" value="${item.yearsUsed || 0}" placeholder="Years">
                <label>
                    <input type="checkbox" name="favorite" ${item.favorite ? 'checked' : ''}> Favorite
                </label>
            </div>
        `);

        // Projects (complex array)
        this.renderComplexArray('projects', this.data.projects || [], (item, index) => `
            <div class="form-grid">
                <div class="form-group">
                    <label>Project ID</label>
                    <input type="text" name="id" value="${item.id || ''}" required>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value="${item.title || ''}" required>
                </div>
                <div class="form-group">
                    <label>Slug</label>
                    <input type="text" name="slug" value="${item.slug || ''}">
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea name="description" rows="3">${item.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select name="category">
                        <option value="Web App" ${item.category === 'Web App' ? 'selected' : ''}>Web App</option>
                        <option value="Mobile App" ${item.category === 'Mobile App' ? 'selected' : ''}>Mobile App</option>
                        <option value="API" ${item.category === 'API' ? 'selected' : ''}>API</option>
                        <option value="Library" ${item.category === 'Library' ? 'selected' : ''}>Library</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select name="status">
                        <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="On Hold" ${item.status === 'On Hold' ? 'selected' : ''}>On Hold</option>
                    </select>
                </div>
                <div class="form-group checkbox">
                    <label>
                        <input type="checkbox" name="featured" ${item.featured ? 'checked' : ''}> Featured Project
                    </label>
                </div>
                <div class="form-group">
                    <label>Cover Image URL</label>
                    <input type="url" name="coverImage.url" value="${item.coverImage?.url || ''}">
                </div>
                <div class="form-group">
                    <label>Live URL</label>
                    <input type="url" name="links.live" value="${item.links?.live || ''}">
                </div>
                <div class="form-group">
                    <label>GitHub URL</label>
                    <input type="url" name="links.github" value="${item.links?.github || ''}">
                </div>
                <div class="form-group">
                    <label>Demo URL</label>
                    <input type="url" name="links.demo" value="${item.links?.demo || ''}">
                </div>
            </div>
        `);
    }

    renderSimpleArray(arrayName, items, templateFn) {
        const container = document.getElementById(`${arrayName}-container`);
        if (!container) return;

        container.innerHTML = items.map((item, index) => `
            <div class="array-item" data-index="${index}">
                ${templateFn(item)}
                <div class="item-actions">
                    <button type="button" class="btn-remove" onclick="admin.removeArrayItem('${arrayName}', ${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderComplexArray(arrayName, items, templateFn) {
        const container = document.getElementById(`${arrayName}-container`);
        if (!container) return;

        container.innerHTML = items.map((item, index) => `
            <div class="complex-item" data-index="${index}">
                <div class="complex-item-header" onclick="admin.toggleComplexItem(this)">
                    <h4>${item.title || item.name || `${arrayName} ${index + 1}`}</h4>
                    <div class="item-actions">
                        <button type="button" class="btn-remove" onclick="event.stopPropagation(); admin.removeArrayItem('${arrayName}', ${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                        <i class="fas fa-chevron-down toggle-icon"></i>
                    </div>
                </div>
                <div class="complex-item-content">
                    ${templateFn(item, index)}
                </div>
            </div>
        `).join('');
    }

    getPlatformOptions(selected) {
        const platforms = [
            "GitHub", "LinkedIn", "Twitter", "StackOverflow", "Medium", 
            "Dev.to", "Hashnode", "YouTube", "Twitch", "CodePen", 
            "CodeSandbox", "GitLab", "Bitbucket", "Personal"
        ];
        
        return platforms.map(p => `
            <option value="${p}" ${selected === p ? 'selected' : ''}>${p}</option>
        `).join('');
    }

    addArrayItem(arrayName) {
        if (arrayName === 'socialProfiles') {
            this.data.personalInfo.socialProfiles.push({
                platform: 'GitHub',
                url: '',
                username: '',
                display: true
            });
        } else if (arrayName === 'languages') {
            if (!this.data.technicalSkills.languages) this.data.technicalSkills.languages = [];
            this.data.technicalSkills.languages.push({
                name: '',
                proficiency: 0,
                yearsUsed: 0,
                favorite: false
            });
        } else if (arrayName === 'projects') {
            this.data.projects.push({
                id: `project-${Date.now()}`,
                title: 'New Project',
                description: '',
                technologies: [],
                featured: false
            });
        } else if (arrayName === 'workExperience') {
            this.data.workExperience.push({
                company: '',
                position: '',
                startDate: '',
                current: false,
                achievements: []
            });
        }
        
        this.renderArrayFields();
    }

    removeArrayItem(arrayName, index) {
        if (arrayName === 'socialProfiles') {
            this.data.personalInfo.socialProfiles.splice(index, 1);
        } else if (arrayName === 'languages') {
            this.data.technicalSkills.languages.splice(index, 1);
        } else if (arrayName === 'projects') {
            this.data.projects.splice(index, 1);
        } else if (arrayName === 'workExperience') {
            this.data.workExperience.splice(index, 1);
        }
        
        this.renderArrayFields();
    }

    toggleComplexItem(header) {
        header.classList.toggle('collapsed');
        const content = header.nextElementSibling;
        content.classList.toggle('collapsed');
    }

    saveData() {
        this.collectFormData();
        
        // Save to localStorage for demo
        localStorage.setItem('portfolioData', JSON.stringify(this.data));
        
        // In a real app, you'd save to server
        this.showNotification('Data saved successfully!', 'success');
        
        // Update meta lastUpdated
        this.data.meta.lastUpdated = new Date().toISOString();
    }

    collectFormData() {
        const form = document.getElementById('portfolio-form');
        const formData = new FormData(form);
        
        // This is a simplified version - in production you'd need
        // more sophisticated deep object merging
        for (let [key, value] of formData.entries()) {
            const keys = key.split('.');
            let current = this.data;
            
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            
            const lastKey = keys[keys.length - 1];
            
            // Handle checkboxes
            const input = form.querySelector(`[name="${key}"]`);
            if (input.type === 'checkbox') {
                current[lastKey] = input.checked;
            } else {
                current[lastKey] = value;
            }
        }
    }

    exportJSON() {
        this.collectFormData();
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `portfolio-data-${new Date().toISOString().slice(0,10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showNotification('JSON exported successfully!', 'success');
    }

    importJSON() {
        const modal = document.getElementById('import-modal');
        modal.classList.add('active');
        
        document.getElementById('confirm-import').onclick = () => {
            const jsonData = document.getElementById('import-json-data').value;
            try {
                const importedData = JSON.parse(jsonData);
                this.data = importedData;
                this.renderForm();
                modal.classList.remove('active');
                this.showNotification('Data imported successfully!', 'success');
            } catch (error) {
                this.showNotification('Invalid JSON format!', 'error');
            }
        };
        
        document.getElementById('close-modal').onclick = () => {
            modal.classList.remove('active');
        };
    }

    resetForm() {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            this.data = this.getDefaultData();
            this.renderForm();
            this.showNotification('Form reset to default', 'warning');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Show corresponding section
                const targetId = link.getAttribute('href').substring(1);
                document.querySelectorAll('.form-section').forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(targetId).classList.add('active');
                
                this.currentSection = targetId;
            });
        });
    }

    setupEventListeners() {
        // Save button
        document.getElementById('save-all').addEventListener('click', () => this.saveData());
        
        // Export button
        document.getElementById('export-json').addEventListener('click', () => this.exportJSON());
        
        // Import button
        document.getElementById('import-json').addEventListener('click', () => this.importJSON());
        
        // Reset button
        document.getElementById('reset-form').addEventListener('click', () => this.resetForm());
        
        // Add item buttons
        document.querySelectorAll('.btn-add-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const arrayName = e.currentTarget.dataset.array;
                this.addArrayItem(arrayName);
            });
        });
    }
}

// Initialize admin
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new PortfolioAdmin();
});