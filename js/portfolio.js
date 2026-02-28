// Portfolio Data Management
class PortfolioManager {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        await this.loadData();
        this.render();
        this.setupEventListeners();
    }

    async loadData() {
        try {
            const response = await fetch('data/portfolio.json');
            this.data = await response.json();
            console.log('Portfolio data loaded:', this.data);
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            this.data = this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            personalInfo: {
                name: 'John Doe',
                title: 'Full Stack Developer',
                tagline: 'Building amazing web experiences',
                email: 'john@example.com',
                location: {
                    city: 'San Francisco',
                    country: 'USA'
                }
            },
            professionalSummary: {
                summary: 'Experienced developer with passion for creating elegant solutions',
                yearsOfExperience: 5
            },
            technicalSkills: {
                languages: [],
                frameworks: [],
                databases: [],
                devTools: []
            },
            projects: []
        };
    }

    render() {
        this.renderHero();
        this.renderAbout();
        this.renderSkills();
        this.renderProjects();
        this.renderExperience();
        this.renderEducation();
        this.renderCertifications();
        this.renderTestimonials();
        this.renderContact();
        this.renderFooter();
        this.applyTheme();
    }

    renderHero() {
        const { personalInfo } = this.data;
        document.getElementById('hero-name').textContent = personalInfo.name || 'Your Name';
        document.getElementById('hero-title').textContent = personalInfo.title || 'Developer';
        document.getElementById('hero-tagline').textContent = personalInfo.tagline || '';
        
        const profileImage = document.getElementById('profile-image');
        if (personalInfo.profileImage?.url) {
            profileImage.src = personalInfo.profileImage.url;
            profileImage.alt = personalInfo.profileImage.alt || personalInfo.name;
        }
    }

    renderAbout() {
        const { personalInfo, professionalSummary } = this.data;
        
        document.getElementById('about-summary').textContent = professionalSummary.summary || '';
        document.getElementById('about-detailed').textContent = professionalSummary.detailedBio || '';
        document.getElementById('location').textContent = 
            personalInfo.location ? `${personalInfo.location.city || ''}, ${personalInfo.location.country || ''}` : '';
        document.getElementById('experience-years').textContent = 
            `${professionalSummary.yearsOfExperience || 0}+ years experience`;
        document.getElementById('contact-email').textContent = personalInfo.email || '';

        // Render language stats
        if (this.data.technicalSkills?.languages) {
            const statsGrid = document.getElementById('languages-stats');
            statsGrid.innerHTML = this.data.technicalSkills.languages
                .slice(0, 4)
                .map(lang => `
                    <div class="stat-item">
                        <div class="stat-value">${lang.proficiency || 0}%</div>
                        <div class="stat-label">${lang.name}</div>
                    </div>
                `).join('');
        }
    }

    renderSkills() {
        const skills = this.data.technicalSkills || {};
        const tabs = document.querySelectorAll('.tab-btn');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.showSkillCategory(tab.dataset.tab);
            });
        });

        // Show initial category
        this.showSkillCategory('languages');
    }

    showSkillCategory(category) {
        const skills = this.data.technicalSkills || {};
        const content = document.getElementById('skills-content');
        
        let items = [];
        switch(category) {
            case 'languages':
                items = skills.languages || [];
                break;
            case 'frameworks':
                items = skills.frameworks || [];
                break;
            case 'databases':
                items = skills.databases || [];
                break;
            case 'tools':
                items = skills.devTools || [];
                break;
        }

        content.innerHTML = items.map(item => `
            <div class="skill-card">
                <div class="skill-name">${item.name}</div>
                <div class="skill-level">
                    <div class="skill-level-bar" style="width: ${item.proficiency || 0}%"></div>
                </div>
            </div>
        `).join('');
    }

    renderProjects() {
        const projects = this.data.projects || [];
        const grid = document.getElementById('projects-grid');
        
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterProjects(btn.dataset.filter);
            });
        });

        this.displayProjects(projects);
    }

    displayProjects(projects) {
        const grid = document.getElementById('projects-grid');
        grid.innerHTML = projects.map(project => `
            <div class="project-card" data-category="${project.category || 'Web App'}">
                <div class="project-image">
                    <img src="${project.coverImage?.url || 'https://via.placeholder.com/300x200'}" 
                         alt="${project.coverImage?.alt || project.title}">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.shortDescription || project.description}</p>
                    <div class="project-tech">
                        ${(project.technologies || []).slice(0, 3).map(tech => 
                            `<span class="tech-tag">${tech.name}</span>`
                        ).join('')}
                    </div>
                    <div class="project-links">
                        ${project.links?.live ? 
                            `<a href="${project.links.live}" class="project-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Live
                            </a>` : ''}
                        ${project.links?.github ? 
                            `<a href="${project.links.github}" class="project-link" target="_blank">
                                <i class="fab fa-github"></i> Code
                            </a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterProjects(category) {
        const projects = this.data.projects || [];
        const filtered = category === 'all' 
            ? projects 
            : projects.filter(p => p.category === category);
        this.displayProjects(filtered);
    }

    renderExperience() {
        const experience = this.data.workExperience || [];
        const timeline = document.getElementById('timeline');
        
        timeline.innerHTML = experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date">
                        ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                    </div>
                    <div class="timeline-company">${exp.company}</div>
                    <div class="timeline-position">${exp.position}</div>
                    <p class="timeline-description">${exp.description || ''}</p>
                    <ul class="timeline-achievements">
                        ${(exp.achievements || []).map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    renderEducation() {
        const education = this.data.education || [];
        const grid = document.getElementById('education-grid');
        
        grid.innerHTML = education.map(edu => `
            <div class="education-card">
                <div class="education-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h3 class="education-degree">${edu.degree}</h3>
                <p class="education-institution">${edu.institution}</p>
                <p class="education-date">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</p>
                <p>${edu.fieldOfStudy || ''}</p>
            </div>
        `).join('');
    }

    renderCertifications() {
        const certifications = this.data.certifications || [];
        const grid = document.getElementById('certifications-grid');
        
        grid.innerHTML = certifications.map(cert => `
            <div class="certification-card">
                <div class="certification-icon">
                    <i class="fas fa-certificate"></i>
                </div>
                <h3 class="certification-name">${cert.name}</h3>
                <p class="certification-issuer">${cert.issuingOrganization}</p>
                <p class="certification-date">${cert.dateIssued}</p>
            </div>
        `).join('');
    }

    renderTestimonials() {
        const testimonials = this.data.testimonials || [];
        const slider = document.getElementById('testimonials-slider');
        
        slider.innerHTML = testimonials.map(test => `
            <div class="testimonial-card">
                <div class="testimonial-quote"><i class="fas fa-quote-right"></i></div>
                <p class="testimonial-content">${test.content}</p>
                <div class="testimonial-author">
                    <img src="${test.avatar || 'https://via.placeholder.com/50'}" 
                         alt="${test.name}" class="testimonial-avatar">
                    <div class="testimonial-info">
                        <h4>${test.name}</h4>
                        <p>${test.position} at ${test.company}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderContact() {
        const { personalInfo, contact } = this.data;
        
        // Social links
        const socialLinks = document.getElementById('social-links');
        if (personalInfo?.socialProfiles) {
            socialLinks.innerHTML = personalInfo.socialProfiles
                .filter(profile => profile.display !== false)
                .map(profile => {
                    const icon = this.getSocialIcon(profile.platform);
                    return `<a href="${profile.url}" class="social-link" target="_blank">
                        <i class="fab fa-${icon}"></i>
                    </a>`;
                }).join('');
        }

        // Contact details
        const contactDetails = document.getElementById('contact-details');
        contactDetails.innerHTML = `
            <div class="contact-detail">
                <i class="fas fa-envelope"></i>
                <span>${personalInfo.email || ''}</span>
            </div>
            ${personalInfo.phone ? `
                <div class="contact-detail">
                    <i class="fas fa-phone"></i>
                    <span>${personalInfo.phone}</span>
                </div>
            ` : ''}
            ${personalInfo.location ? `
                <div class="contact-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${personalInfo.location.city || ''}, ${personalInfo.location.country || ''}</span>
                </div>
            ` : ''}
        `;
    }

    getSocialIcon(platform) {
        const icons = {
            'GitHub': 'github',
            'LinkedIn': 'linkedin',
            'Twitter': 'twitter',
            'StackOverflow': 'stack-overflow',
            'Medium': 'medium',
            'Dev.to': 'dev',
            'Hashnode': 'hashnode',
            'YouTube': 'youtube',
            'Twitch': 'twitch',
            'CodePen': 'codepen',
            'CodeSandbox': 'codesandbox',
            'GitLab': 'gitlab',
            'Bitbucket': 'bitbucket'
        };
        return icons[platform] || 'globe';
    }

    renderFooter() {
        const year = new Date().getFullYear();
        const name = this.data.personalInfo?.name || 'Developer';
        document.getElementById('footer-copyright').textContent = 
            `© ${year} ${name}. All rights reserved.`;
    }

    applyTheme() {
        if (this.data.theme) {
            const { primaryColor, secondaryColor, fontFamily } = this.data.theme;
            
            document.documentElement.style.setProperty('--primary-color', primaryColor || '#0066ff');
            document.documentElement.style.setProperty('--secondary-color', secondaryColor || '#00cc88');
            
            if (fontFamily) {
                document.body.style.fontFamily = fontFamily;
            }
        }
    }

    setupEventListeners() {
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Message sent! (Demo - Form submission disabled)');
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});