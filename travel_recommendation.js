const searchBtn = document.querySelector(".btn-search");
const searchInput = document.querySelector("#searchInput");
const resultsContainer = document.querySelector("#results-container");
const resultsSection = document.querySelector(".results-section");
const clearBtn = document.querySelector(".btn-clear");
const submitBtn = document.querySelector(".btn-submit");

function displayResults(results) {
    // Xóa kết quả tìm kiếm cũ
    resultsContainer.innerHTML = '';
    // Hiển thị khung kết quả
    resultsSection.style.display = 'block';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No destinations found.</p>';
        return;
    }

    results.forEach(result => {
        const resultCard = `
            <div class="result-card">
                <img src="${result.imageUrl}" alt="${result.name}">
                <div class="result-info">
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                    <button class="btn-visit">Visit</button>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += resultCard;
    });
}

function handleSearch () {
    const keyword = searchInput.value.toLowerCase().trim();

    fetch("travel_recommendation_api.json")
        .then(res => res.json())
        .then(data => {
            let results = [];
            if(keyword.includes('beach')) {
                results = data.beaches;
            } else if (keyword.includes('temple')) {
                results = data.temples;
            } else {
                const country = data.countries.find(c => c.name.toLowerCase() === keyword);
                if(country) {
                    results = country.cities;
                }
            }
            displayResults(results)
        })
}
searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

document.addEventListener('click', (event) => {
    const isClickInsideSearchContainer = event.target.closest('.search-container');
    const isClickInsideResults = event.target.closest('.results-section');

    if (!isClickInsideSearchContainer && !isClickInsideResults) {
        resultsSection.style.display = 'none';
    }
});

function handelClear() {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
    resultsSection.style.display = "none";
}

clearBtn.addEventListener("click", handelClear);

const contactForm = document.querySelector('.contact-form');
    
// Chỉ chạy mã này nếu tìm thấy contact form trên trang
if (contactForm) {
    const thankYouMessage = document.querySelector('#thank-you-message');

    contactForm.addEventListener('submit', (event) => {
        // 1. Ngăn trang tải lại
        event.preventDefault();

        // 2. Ẩn form đi
        contactForm.style.display = 'none';

        // 3. Hiện thông báo cảm ơn
        if (thankYouMessage) {
            thankYouMessage.style.display = 'block';
        }
    });
}