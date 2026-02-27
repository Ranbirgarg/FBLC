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
// Add Business
// ===============================
function addBusiness(name, type, location, coupon) {

    // validation
    if (!name || !type || !location || !coupon) {
        showMessage("Please fill in all fields!", true);
        return;
    }

    db.collection("businesses").add({
        name: name,
        type: type,
        location: location,
        coupon: coupon
    })
    .then(() => {
        showMessage("Business added successfully!");
    })
    .catch((error) => {
        showMessage("Error adding business: " + error, true);
    });
}


// ===============================
// Get All Businesses
// ===============================
function getAllBusinesses() {
    const list = document.getElementById("businessList");
    if (!list) return;

    list.innerHTML = "";

    db.collection("businesses").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data();

                const li = document.createElement("li");
                li.textContent =
                    `${data.name} | ${data.type} | ${data.location} | Coupon: ${data.coupon}`;

                list.appendChild(li);
            });

            showMessage("Businesses loaded!");
        })
        .catch(error => {
            showMessage("Error loading businesses: " + error, true);
        });
}


// ===============================
// Search Businesses By Type
// ===============================
function searchBusinessesByType(type) {

    if (!type) {
        showMessage("Enter a business type to search!", true);
        return;
    }

    const list = document.getElementById("businessList");
    if (!list) return;

    list.innerHTML = "";

    db.collection("businesses")
        .where("type", "==", type)
        .get()
        .then(snapshot => {

            if (snapshot.empty) {
                showMessage("No businesses found.", true);
                return;
            }

            snapshot.forEach(doc => {
                const data = doc.data();

                const li = document.createElement("li");
                li.textContent =
                    `${data.name} | ${data.type} | ${data.location} | Coupon: ${data.coupon}`;

                list.appendChild(li);
            });

            showMessage("Search complete!");
        })
        .catch(error => {
            showMessage("Search error: " + error, true);
        });
}


// ===============================
// Sort Businesses (Alphabetical)
// ===============================
function sortBusinesses() {

    const list = document.getElementById("businessList");
    if (!list) return;

    list.innerHTML = "";

    db.collection("businesses")
        .orderBy("name")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data();

                const li = document.createElement("li");
                li.textContent =
                    `${data.name} | ${data.type} | ${data.location} | Coupon: ${data.coupon}`;

                list.appendChild(li);
            });

            showMessage("Businesses sorted alphabetically!");
        })
        .catch(error => {
            showMessage("Sort error: " + error, true);
        });
}
