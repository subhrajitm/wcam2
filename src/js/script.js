// Enhanced claims data with detailed information
const claimsData = [
    { 
        id: 'CLM001', 
        name: 'John Smith', 
        policy: 'POL-2024-001', 
        type: 'Auto', 
        amount: '$5,200', 
        status: 'approved', 
        date: '2024-01-15',
        details: {
            incidentDate: '2024-01-10',
            reportedDate: '2024-01-12',
            adjuster: 'Michael Johnson',
            phone: '(555) 123-4567',
            email: 'john.smith@email.com',
            description: 'Vehicle collision at intersection of Main St and Oak Ave. Front-end damage to insured vehicle.',
            repairCost: '$4,800',
            deductible: '$500',
            settlement: '$5,200'
        }
    },
    { 
        id: 'CLM002', 
        name: 'Sarah Johnson', 
        policy: 'POL-2024-002', 
        type: 'Health', 
        amount: '$12,500', 
        status: 'pending', 
        date: '2024-01-18',
        details: {
            incidentDate: '2024-01-15',
            reportedDate: '2024-01-16',
            adjuster: 'Lisa Anderson',
            phone: '(555) 234-5678',
            email: 'sarah.johnson@email.com',
            description: 'Emergency surgery for appendicitis. Hospital stay and surgical procedures.',
            repairCost: '$11,200',
            deductible: '$1,000',
            settlement: '$12,500'
        }
    },
    { 
        id: 'CLM003', 
        name: 'Mike Davis', 
        policy: 'POL-2024-003', 
        type: 'Home', 
        amount: '$8,750', 
        status: 'processing', 
        date: '2024-01-20',
        details: {
            incidentDate: '2024-01-18',
            reportedDate: '2024-01-19',
            adjuster: 'Robert Wilson',
            phone: '(555) 345-6789',
            email: 'mike.davis@email.com',
            description: 'Water damage from burst pipe in basement. Flooring and drywall replacement needed.',
            repairCost: '$8,200',
            deductible: '$750',
            settlement: '$8,750'
        }
    },
    { 
        id: 'CLM004', 
        name: 'Emily Brown', 
        policy: 'POL-2024-004', 
        type: 'Life', 
        amount: '$25,000', 
        status: 'approved', 
        date: '2024-01-22',
        details: {
            incidentDate: '2024-01-20',
            reportedDate: '2024-01-21',
            adjuster: 'Jennifer Lee',
            phone: '(555) 456-7890',
            email: 'emily.brown@email.com',
            description: 'Life insurance claim for accidental death benefit.',
            repairCost: 'N/A',
            deductible: '$0',
            settlement: '$25,000'
        }
    },
    { 
        id: 'CLM005', 
        name: 'David Wilson', 
        policy: 'POL-2024-005', 
        type: 'Auto', 
        amount: '$3,200', 
        status: 'rejected', 
        date: '2024-01-25',
        details: {
            incidentDate: '2024-01-22',
            reportedDate: '2024-01-24',
            adjuster: 'Christopher Moore',
            phone: '(555) 567-8901',
            email: 'david.wilson@email.com',
            description: 'Minor fender bender in parking lot. Claim rejected due to policy exclusions.',
            repairCost: '$3,200',
            deductible: '$500',
            settlement: '$0'
        }
    }
];

let currentPage = 1;
const itemsPerPage = 10;
let filteredData = [...claimsData];
let analyticsChart = null;

// Initialize claims table
function initializeClaimsTable() {
    const claimsTableBody = document.getElementById('claimsTableBody');
    if (claimsTableBody) {
        renderClaimsTable();
        renderPagination();
    }
}

// Render claims table
function renderClaimsTable() {
    const tbody = document.getElementById('claimsTableBody');
    if (!tbody) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageData.map(claim => `
        <tr>
            <td><strong>${claim.id}</strong></td>
            <td>
                <div class="customer-info">
                    <div class="customer-avatar">${claim.name.split(' ').map(n => n[0]).join('')}</div>
                    <span>${claim.name}</span>
                </div>
            </td>
            <td>${claim.policy}</td>
            <td>${claim.type}</td>
            <td><strong>${claim.amount}</strong></td>
            <td>
                <span class="status-badge status-${claim.status}">${claim.status}</span>
            </td>
            <td>${new Date(claim.date).toLocaleDateString()}</td>
            <td>
                <button class="action-btn action-view" onclick="viewClaim('${claim.id}')">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="action-btn action-edit" onclick="editClaim('${claim.id}')">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    updatePaginationInfo();
}

// Render pagination
function renderPagination() {
    const pageNumbers = document.getElementById('pageNumbers');
    if (!pageNumbers) return;
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-number ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    
    pageNumbers.innerHTML = paginationHTML;
    
    // Update prev/next buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

// Update pagination info
function updatePaginationInfo() {
    const paginationInfo = document.getElementById('paginationInfo');
    if (!paginationInfo) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);
    const total = filteredData.length;
    
    paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${total} claims`;
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderClaimsTable();
        renderPagination();
    }
}

// Go to specific page
function goToPage(page) {
    currentPage = page;
    renderClaimsTable();
    renderPagination();
}

// Search claims
function searchClaims() {
    const searchTerm = document.getElementById('claimsSearch').value.toLowerCase();
    
    filteredData = claimsData.filter(claim => 
        claim.id.toLowerCase().includes(searchTerm) ||
        claim.name.toLowerCase().includes(searchTerm) ||
        claim.policy.toLowerCase().includes(searchTerm) ||
        claim.type.toLowerCase().includes(searchTerm) ||
        claim.status.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    renderClaimsTable();
    renderPagination();
}

// Back button functionality - only for details view
function goBackToClaims() {
    // Hide details if showing
    document.getElementById('claimsDetails').style.display = 'none';
    document.getElementById('claimsTableSection').style.display = 'block';
    document.querySelector('#claims .metrics-grid').style.display = 'grid';
    
    // Reset search and pagination
    document.getElementById('claimsSearch').value = '';
    filteredData = [...claimsData];
    currentPage = 1;
    renderClaimsTable();
    renderPagination();
}

// Show claim details
function viewClaim(claimId) {
    const claim = claimsData.find(c => c.id === claimId);
    if (!claim) return;
    
    // Hide claims table section and metrics
    document.getElementById('claimsTableSection').style.display = 'none';
    document.querySelector('#claims .metrics-grid').style.display = 'none';
    
    // Show details section
    document.getElementById('claimsDetails').style.display = 'block';
    
    // Populate claim details
    document.getElementById('detailClaimId').textContent = claim.id;
    document.getElementById('detailStatus').innerHTML = `<span class="status-badge status-${claim.status}">${claim.status}</span>`;
    document.getElementById('detailAmount').textContent = claim.amount;
    document.getElementById('detailDate').textContent = new Date(claim.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    // Populate detailed information
    document.getElementById('detailClaimantName').textContent = claim.name;
    document.getElementById('detailPolicyNumber').textContent = claim.policy;
    document.getElementById('detailClaimType').textContent = claim.type + ' Insurance';
    document.getElementById('detailIncidentDate').textContent = new Date(claim.details.incidentDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    document.getElementById('detailReportedDate').textContent = new Date(claim.details.reportedDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    document.getElementById('detailAdjuster').textContent = claim.details.adjuster;
    document.getElementById('detailPhone').textContent = claim.details.phone;
    document.getElementById('detailEmail').textContent = claim.details.email;
    document.getElementById('detailDescription').textContent = claim.details.description;
    document.getElementById('detailRepairCost').textContent = claim.details.repairCost;
    document.getElementById('detailDeductible').textContent = claim.details.deductible;
    document.getElementById('detailSettlement').textContent = claim.details.settlement;
}

// Go back to claims list
function goBackToClaimsList() {
    // Hide details section
    document.getElementById('claimsDetails').style.display = 'none';
    
    // Show claims table section and metrics
    document.getElementById('claimsTableSection').style.display = 'block';
    document.querySelector('#claims .metrics-grid').style.display = 'grid';
}

// Action functions for claim details
function approveClaim() {
    alert('Claim approved successfully!');
}

function editClaimDetails() {
    alert('Edit claim details functionality');
}

function rejectClaim() {
    if (confirm('Are you sure you want to reject this claim?')) {
        alert('Claim rejected');
    }
}

// Enhanced Analytics Chart with fixed height
function initializeAnalyticsChart() {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (analyticsChart) {
        analyticsChart.destroy();
    }
    
    // Create beautiful gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
    gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.2)');
    gradient.addColorStop(1, 'rgba(249, 115, 22, 0.05)');
    
    // Create new chart instance
    analyticsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [3000, 2500, 2800, 2200, 2400, 2600, 3200, 2900, 2700, 3500, 2800, 3400],
                borderColor: '#f97316',
                backgroundColor: gradient,
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 8,
                pointBackgroundColor: '#f97316',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointHoverBackgroundColor: '#ea580c',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#f97316',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 11,
                            family: 'Inter'
                        },
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 11,
                            family: 'Inter'
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!this.dataset.section) return;
            
            // Remove active class from all nav links
            navLinks.forEach(nl => nl.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            // Show target section
            const targetSection = document.getElementById(this.dataset.section);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Initialize analytics chart
    initializeAnalyticsChart();
    
    // Handle window resize to properly resize chart
    window.addEventListener('resize', function() {
        // Destroy existing chart
        if (analyticsChart) {
            analyticsChart.destroy();
        }
        // Reinitialize chart after a short delay
        setTimeout(initializeAnalyticsChart, 100);
    });

    // Initialize claims table
    initializeClaimsTable();
}); 