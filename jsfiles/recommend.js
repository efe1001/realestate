const itemsPerPage = 10;
let currentPage = 1;
const maxVisiblePages = 5;
const propertyCards = Array.from(document.querySelectorAll('.property-card'));

function filterProperties() {
    const locationFilter = document.getElementById("location").value.toLowerCase();
    const typeFilter = document.getElementById("propertyType").value.toLowerCase();
    const roomsFilter = document.getElementById("rooms").value;
    const transactionFilter = document.getElementById("transactionType").value.toLowerCase();

    const filteredProperties = propertyCards.filter(card => {
        const detailsText = card.querySelector(".property-details").innerText.toLowerCase();
        const matchesLocation = detailsText.includes(locationFilter);
        const matchesType = detailsText.includes(`type: ${typeFilter}`);
        const matchesRooms = detailsText.includes(`rooms: ${roomsFilter === '4' ? '' : roomsFilter}`);
        const matchesTransaction = detailsText.includes(`transaction: ${transactionFilter}`);

        return (!locationFilter || matchesLocation) &&
               (!typeFilter || matchesType) &&
               (!roomsFilter || matchesRooms) &&
               (!transactionFilter || matchesTransaction);
    });

    currentPage = 1;
    displayProperties(filteredProperties);
    updatePagination(filteredProperties);
}

function displayProperties(properties) {
    const propertyList = document.getElementById('propertyList');
    propertyList.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    properties.slice(startIndex, endIndex).forEach(card => propertyList.appendChild(card));
}

function updatePagination(properties) {
    const totalPages = Math.ceil(properties.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.onclick = () => {
            currentPage--;
            displayProperties(properties);
            updatePagination(properties);
        };
        pagination.appendChild(prevButton);
    }

    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.toggle('active', i === currentPage);
        button.onclick = () => {
            currentPage = i;
            displayProperties(properties);
            updatePagination(properties);
        };
        pagination.appendChild(button);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.onclick = () => {
            currentPage++;
            displayProperties(properties);
            updatePagination(properties);
        };
        pagination.appendChild(nextButton);
    }
}

function resetFilters() {
    // Reset all filter fields
    document.getElementById("location").value = '';
    document.getElementById("propertyType").value = '';
    document.getElementById("rooms").value = '';
    document.getElementById("transactionType").value = '';

    // Display all properties
    currentPage = 1;
    filterProperties();
}

filterProperties();
