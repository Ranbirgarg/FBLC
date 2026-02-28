// ===============================
// Dummy Backend Data
// ===============================
let businesses = [
    { name: "Sunrise Cafe", type: "Food & Beverage", location: "Downtown", coupon: "10% OFF" },
    { name: "Green Thumb Garden", type: "Home & Garden", location: "Uptown", coupon: "Free Plant" },
    { name: "Zen Spa", type: "Beauty & Wellness", location: "Midtown", coupon: "20% OFF" },
    { name: "Techie Retail", type: "Retail", location: "Downtown", coupon: "Buy 1 Get 1" },
    { name: "Crafty Corner", type: "Arts & Crafts", location: "Uptown", coupon: "Free Workshop" },
    { name: "Handy Services", type: "Services", location: "Midtown", coupon: "First Job Free" }
];

// ===============================
// Message Display Function
// ===============================
function showMessage(msg, isError = false) {
    const messageEl = document.getElementById("message");
    if (!messageEl) return;

    messageEl.textContent = msg;
    messageEl.style.color = isError ? "red" : "green";

    setTimeout(() => {
        messageEl.textContent = "";
    }, 3000);
}

// ===============================
// Render Businesses List
// ===============================
function renderBusinessesList(listEl, businessArray) {
    if (!listEl) return;
    listEl.innerHTML = "";

    if (businessArray.length === 0) {
        listEl.innerHTML = `<li>No businesses found.</li>`;
        return;
    }

    businessArray.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `${b.name} | ${b.type} | ${b.location} | Coupon: ${b.coupon}`;
        listEl.appendChild(li);
    });
}

// ===============================
// Add Business
// ===============================
function addBusiness(name, type, location, coupon) {
    if (!name || !type || !location || !coupon) {
        showMessage("Please fill in all fields!", true);
        return;
    }

    businesses.push({ name, type, location, coupon });
    showMessage("Business added successfully!");
    renderBusinesses(); // refresh UI
}

// ===============================
// Get All Businesses
// ===============================
function getAllBusinesses() {
    const list = document.getElementById("businessList");
    renderBusinessesList(list, businesses);
    showMessage("Businesses loaded!");
}

// ===============================
// Search Businesses By Type
// ===============================
function searchBusinessesByType(type) {
    if (!type) {
        showMessage("Enter a business type to search!", true);
        return;
    }

    const filtered = businesses.filter(b => b.type === type);
    const list = document.getElementById("businessList");
    renderBusinessesList(list, filtered);
    showMessage(filtered.length > 0 ? "Search complete!" : "No businesses found.", filtered.length === 0);
}

// ===============================
// Sort Businesses Alphabetically
// ===============================
function sortBusinesses() {
    const sorted = [...businesses].sort((a, b) => a.name.localeCompare(b.name));
    const list = document.getElementById("businessList");
    renderBusinessesList(list, sorted);
    showMessage("Businesses sorted alphabetically!");
}
