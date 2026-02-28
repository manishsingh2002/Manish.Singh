<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Admin</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f0f2f5;
            color: #333;
        }

        /* Login Screen */
        .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .login-box {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
        }

        .login-box h2 {
            margin-bottom: 30px;
            color: #333;
            text-align: center;
        }

        .login-box input {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }

        .login-box button {
            width: 100%;
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .login-box button:hover {
            background: #5a67d8;
        }

        .error-message {
            color: #e53e3e;
            margin-bottom: 15px;
            text-align: center;
        }

        /* Admin Dashboard */
        .admin-container {
            display: none;
            min-height: 100vh;
        }

        .admin-header {
            background: white;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .admin-header h1 {
            font-size: 24px;
            color: #333;
        }

        .admin-header button {
            padding: 10px 20px;
            background: #e53e3e;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px;
        }

        .admin-header button.save-btn {
            background: #48bb78;
        }

        .admin-main {
            display: flex;
            height: calc(100vh - 80px);
        }

        .sidebar {
            width: 280px;
            background: white;
            border-right: 1px solid #e2e8f0;
            overflow-y: auto;
        }

        .section-list {
            padding: 20px;
        }

        .section-item {
            display: flex;
            align-items: center;
            padding: 12px;
            margin-bottom: 5px;
            background: #f7fafc;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .section-item:hover {
            background: #edf2f7;
        }

        .section-item.active {
            background: #667eea;
            color: white;
        }

        .section-item .icon {
            margin-right: 10px;
            font-size: 20px;
        }

        .section-item .name {
            flex: 1;
        }

        .section-item .status {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-left: 10px;
        }

        .section-item .status.active {
            background: #48bb78;
        }

        .section-item .status.inactive {
            background: #cbd5e0;
        }

        .content-area {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8fafc;
        }

        .content-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .content-header h2 {
            font-size: 20px;
            color: #333;
        }

        .content-header button {
            padding: 8px 16px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .data-table {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .data-table table {
            width: 100%;
            border-collapse: collapse;
        }

        .data-table th {
            background: #f7fafc;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #4a5568;
            border-bottom: 2px solid #e2e8f0;
        }

        .data-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
        }

        .data-table tr:hover {
            background: #f7fafc;
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .actions button {
            padding: 4px 8px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }

        .actions .edit {
            background: #4299e1;
            color: white;
        }

        .actions .delete {
            background: #f56565;
            color: white;
        }

        .actions .toggle {
            background: #48bb78;
            color: white;
        }

        .status-badge {
            padding: 4px 8px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
        }

        .status-badge.active {
            background: #c6f6d5;
            color: #22543d;
        }

        .status-badge.inactive {
            background: #fed7d7;
            color: #742a2a;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
        }

        .modal-content {
            position: relative;
            background: white;
            width: 90%;
            max-width: 600px;
            margin: 50px auto;
            padding: 30px;
            border-radius: 10px;
            max-height: 80vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .modal-header h3 {
            font-size: 20px;
            color: #333;
        }

        .modal-header .close {
            font-size: 24px;
            cursor: pointer;
            color: #999;
        }

        .modal-body .form-group {
            margin-bottom: 15px;
        }

        .modal-body label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #4a5568;
        }

        .modal-body input,
        .modal-body textarea,
        .modal-body select {
            width: 100%;
            padding: 10px;
            border: 1px solid #e2e8f0;
            border-radius: 5px;
            font-size: 14px;
        }

        .modal-body textarea {
            min-height: 100px;
            resize: vertical;
        }

        .modal-footer {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .modal-footer button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .modal-footer .cancel {
            background: #e2e8f0;
            color: #4a5568;
        }

        .modal-footer .save {
            background: #667eea;
            color: white;
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .checkbox-group input[type="checkbox"] {
            width: auto;
        }

        .loading {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.8);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }

        .loading.active {
            display: flex;
        }

        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <!-- Login Screen -->
    <div class="login-container" id="loginScreen">
        <div class="login-box">
            <h2>Portfolio Admin Login</h2>
            <div class="error-message" id="loginError"></div>
            <input type="password" id="password" placeholder="Enter admin password" onkeypress="handleKeyPress(event)">
            <button onclick="login()">Login</button>
        </div>
    </div>

    <!-- Admin Dashboard -->
    <div class="admin-container" id="adminDashboard">
        <div class="admin-header">
            <h1>Portfolio Admin Panel</h1>
            <div>
                <button class="save-btn" onclick="saveData()">Save Changes</button>
                <button onclick="logout()">Logout</button>
            </div>
        </div>
        <div class="admin-main">
            <div class="sidebar" id="sidebar"></div>
            <div class="content-area" id="contentArea"></div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal" id="editModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitle">Edit Item</h3>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body" id="modalBody"></div>
            <div class="modal-footer">
                <button class="cancel" onclick="closeModal()">Cancel</button>
                <button class="save" onclick="saveModalItem()">Save</button>
            </div>
        </div>
    </div>

    <!-- Loading Overlay -->
    <div class="loading" id="loading">
        <div class="spinner"></div>
    </div>

    <script>
        // GitHub Configuration
        const GITHUB_CONFIG = {
            owner: 'YOUR_GITHUB_USERNAME',
            repo: 'YOUR_REPO_NAME',
            path: 'portfolio-data.json',
            token: '' // Will be set after login
        };

        let portfolioData = null;
        let currentSection = null;
        let currentEditItem = null;
        let isAuthenticated = false;

        // Login function
        async function login() {
            const password = document.getElementById('password').value;
            document.getElementById('loginError').textContent = '';

            showLoading();

            try {
                // First, fetch the data file
                const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`);
                const data = await response.json();
                
                // Decode content
                const content = atob(data.content);
                portfolioData = JSON.parse(content);

                // Verify password (in production, use proper authentication)
                if (portfolioData.config.admin.password === password) { // In reality, use bcrypt compare
                    isAuthenticated = true;
                    document.getElementById('loginScreen').style.display = 'none';
                    document.getElementById('adminDashboard').style.display = 'block';
                    initializeAdmin();
                } else {
                    document.getElementById('loginError').textContent = 'Invalid password';
                }
            } catch (error) {
                document.getElementById('loginError').textContent = 'Error loading data';
                console.error(error);
            } finally {
                hideLoading();
            }
        }

        // Initialize admin interface
        function initializeAdmin() {
            renderSidebar();
            if (Object.keys(portfolioData.sections).length > 0) {
                loadSection(Object.keys(portfolioData.sections)[0]);
            }
        }

        // Render sidebar with sections
        function renderSidebar() {
            const sidebar = document.getElementById('sidebar');
            let html = '<div class="section-list">';

            Object.entries(portfolioData.sections).forEach(([key, section]) => {
                html += `
                    <div class="section-item" onclick="loadSection('${key}')">
                        <span class="icon">${getIcon(section.icon)}</span>
                        <span class="name">${section.title}</span>
                        <span class="status ${section.isActive ? 'active' : 'inactive'}"></span>
                    </div>
                `;
            });

            html += '</div>';
            sidebar.innerHTML = html;
        }

        // Load section content
        function loadSection(sectionKey) {
            currentSection = sectionKey;
            const section = portfolioData.sections[sectionKey];
            const contentArea = document.getElementById('contentArea');

            // Update active state in sidebar
            document.querySelectorAll('.section-item').forEach(item => {
                item.classList.remove('active');
            });
            event.currentTarget.classList.add('active');

            // Render section content
            let html = `
                <div class="content-header">
                    <h2>${section.title}</h2>
                    <div>
                        <label class="checkbox-group">
                            <input type="checkbox" ${section.isActive ? 'checked' : ''} onchange="toggleSection('${sectionKey}')">
                            Show Section
                        </label>
                        <button onclick="openAddModal('${sectionKey}')">Add New</button>
                    </div>
                </div>
            `;

            if (Array.isArray(section.data)) {
                // Render table for array data
                html += renderDataTable(sectionKey, section.data);
            } else {
                // Render object data
                html += renderObjectData(sectionKey, section.data);
            }

            contentArea.innerHTML = html;
        }

        // Render data table
        function renderDataTable(sectionKey, data) {
            if (!data || data.length === 0) {
                return '<p>No items found. Click "Add New" to create one.</p>';
            }

            // Get headers from first item
            const headers = Object.keys(data[0]).filter(key => 
                !['id', 'isActive', 'displayOrder'].includes(key) && 
                typeof data[0][key] !== 'object'
            );

            let html = '<div class="data-table"><table><thead><tr>';

            // Headers
            headers.forEach(header => {
                html += `<th>${formatHeader(header)}</th>`;
            });
            html += '<th>Status</th><th>Actions</th></tr></thead><tbody>';

            // Data rows
            data.sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999)).forEach(item => {
                html += '<tr>';
                headers.forEach(header => {
                    html += `<td>${item[header] || '-'}</td>`;
                });
                html += `
                    <td>
                        <span class="status-badge ${item.isActive ? 'active' : 'inactive'}">
                            ${item.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td class="actions">
                        <button class="edit" onclick="openEditModal('${sectionKey}', '${item.id}')">Edit</button>
                        <button class="toggle" onclick="toggleItem('${sectionKey}', '${item.id}')">
                            ${item.isActive ? 'Hide' : 'Show'}
                        </button>
                        <button class="delete" onclick="deleteItem('${sectionKey}', '${item.id}')">Delete</button>
                    </td>
                </tr>`;
            });

            html += '</tbody></table></div>';
            return html;
        }

        // Render object data
        function renderObjectData(sectionKey, data) {
            let html = '<div class="data-table"><table><tbody>';

            Object.entries(data).forEach(([key, value]) => {
                if (typeof value !== 'object') {
                    html += `
                        <tr>
                            <td><strong>${formatHeader(key)}</strong></td>
                            <td>${value}</td>
                            <td>
                                <button class="edit" onclick="openEditObjectModal('${sectionKey}', '${key}')">Edit</button>
                            </td>
                        </tr>
                    `;
                }
            });

            html += '</tbody></table></div>';
            return html;
        }

        // Toggle section visibility
        function toggleSection(sectionKey) {
            portfolioData.sections[sectionKey].isActive = !portfolioData.sections[sectionKey].isActive;
            renderSidebar();
        }

        // Toggle item visibility
        function toggleItem(sectionKey, itemId) {
            const section = portfolioData.sections[sectionKey];
            const item = section.data.find(i => i.id === itemId);
            if (item) {
                item.isActive = !item.isActive;
                loadSection(sectionKey);
            }
        }

        // Delete item
        function deleteItem(sectionKey, itemId) {
            if (confirm('Are you sure you want to delete this item?')) {
                const section = portfolioData.sections[sectionKey];
                section.data = section.data.filter(i => i.id !== itemId);
                loadSection(sectionKey);
            }
        }

        // Open add modal
        function openAddModal(sectionKey) {
            currentEditItem = null;
            const section = portfolioData.sections[sectionKey];
            
            let modalBody = '';
            
            if (section.data.length > 0) {
                // Create form based on first item structure
                const template = section.data[0];
                Object.keys(template).forEach(key => {
                    if (key !== 'id') {
                        modalBody += `
                            <div class="form-group">
                                <label>${formatHeader(key)}</label>
                                ${getInputField(key, template[key])}
                            </div>
                        `;
                    }
                });
            }

            document.getElementById('modalTitle').textContent = `Add New ${section.title}`;
            document.getElementById('modalBody').innerHTML = modalBody;
            document.getElementById('editModal').style.display = 'block';
        }

        // Open edit modal
        function openEditModal(sectionKey, itemId) {
            const section = portfolioData.sections[sectionKey];
            const item = section.data.find(i => i.id === itemId);
            currentEditItem = { sectionKey, itemId, item };

            let modalBody = '';
            Object.entries(item).forEach(([key, value]) => {
                if (key !== 'id') {
                    modalBody += `
                        <div class="form-group">
                            <label>${formatHeader(key)}</label>
                            ${getInputField(key, value, true)}
                        </div>
                    `;
                }
            });

            document.getElementById('modalTitle').textContent = `Edit ${section.title}`;
            document.getElementById('modalBody').innerHTML = modalBody;
            document.getElementById('editModal').style.display = 'block';
        }

        // Get input field HTML
        function getInputField(key, value, isEdit = false) {
            if (key === 'isActive') {
                return `
                    <div class="checkbox-group">
                        <input type="checkbox" id="field_${key}" ${value ? 'checked' : ''}>
                    </div>
                `;
            } else if (key === 'description' || key === 'content' || key === 'bio') {
                return `<textarea id="field_${key}">${value || ''}</textarea>`;
            } else if (key === 'technologies' || key === 'tags') {
                return `<input type="text" id="field_${key}" value="${Array.isArray(value) ? value.join(', ') : ''}" placeholder="Comma separated values">`;
            } else {
                return `<input type="text" id="field_${key}" value="${value || ''}">`;
            }
        }

        // Save modal item
        function saveModalItem() {
            const modalBody = document.getElementById('modalBody');
            const inputs = modalBody.querySelectorAll('input, textarea, select');
            
            const newItem = { id: currentEditItem ? currentEditItem.item.id : generateId() };

            inputs.forEach(input => {
                const key = input.id.replace('field_', '');
                let value = input.type === 'checkbox' ? input.checked : input.value;
                
                // Handle arrays
                if (key === 'technologies' || key === 'tags') {
                    value = value.split(',').map(v => v.trim());
                }
                
                newItem[key] = value;
            });

            const section = portfolioData.sections[currentSection];
            
            if (currentEditItem) {
                // Update existing item
                const index = section.data.findIndex(i => i.id === currentEditItem.itemId);
                section.data[index] = { ...section.data[index], ...newItem };
            } else {
                // Add new item
                newItem.displayOrder = section.data.length + 1;
                section.data.push(newItem);
            }

            closeModal();
            loadSection(currentSection);
        }

        // Save all data to GitHub
        async function saveData() {
            showLoading();

            try {
                // Get current file SHA
                const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`);
                const data = await response.json();
                
                // Update content
                const content = btoa(JSON.stringify(portfolioData, null, 2));
                
                // Commit to GitHub
                const commitResponse = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${GITHUB_CONFIG.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Update portfolio data via admin panel',
                        content: content,
                        sha: data.sha
                    })
                });

                if (commitResponse.ok) {
                    alert('Data saved successfully!');
                } else {
                    alert('Error saving data');
                }
            } catch (error) {
                console.error('Save error:', error);
                alert('Error saving data');
            } finally {
                hideLoading();
            }
        }

        // Helper functions
        function getIcon(iconName) {
            const icons = {
                user: '👤',
                share: '🔗',
                code: '💻',
                briefcase: '💼',
                folder: '📁',
                graduation: '🎓',
                certificate: '📜',
                quote: '💬',
                blog: '📝',
                trophy: '🏆',
                service: '⚙️',
                heart: '❤️',
                mail: '📧'
            };
            return icons[iconName] || '📌';
        }

        function formatHeader(header) {
            return header.replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
        }

        function generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        }

        function closeModal() {
            document.getElementById('editModal').style.display = 'none';
            currentEditItem = null;
        }

        function showLoading() {
            document.getElementById('loading').classList.add('active');
        }

        function hideLoading() {
            document.getElementById('loading').classList.remove('active');
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                login();
            }
        }

        function logout() {
            isAuthenticated = false;
            document.getElementById('loginScreen').style.display = 'flex';
            document.getElementById('adminDashboard').style.display = 'none';
            document.getElementById('password').value = '';
        }
    </script>
</body>
</html>