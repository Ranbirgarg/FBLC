// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add a new business
function addBusiness(name, type, location, coupon) {
    db.collection("businesses").add({
        name: name,
        type: type,
        location: location,
        coupon: coupon
    })
    .then(() => console.log("Business added successfully!"))
    .catch(error => console.error("Error adding business: ", error));
}

// Fetch all businesses
function getAllBusinesses(callback) {
    db.collection("businesses").get()
    .then(querySnapshot => {
        const businesses = [];
        querySnapshot.forEach(doc => businesses.push(doc.data()));
        callback(businesses);
    })
    .catch(error => console.error("Error fetching businesses: ", error));
}

// Search businesses by type
function searchBusinessesByType(type, callback) {
    db.collection("businesses").where("type", "==", type).get()
    .then(querySnapshot => {
        const results = [];
        querySnapshot.forEach(doc => results.push(doc.data()));
        callback(results);
    })
    .catch(error => console.error("Error searching businesses: ", error));
}

// Sort businesses by field
function sortBusinesses(field, callback) {
    db.collection("businesses").orderBy(field).get()
    .then(querySnapshot => {
        const sorted = [];
        querySnapshot.forEach(doc => sorted.push(doc.data()));
        callback(sorted);
    })
    .catch(error => console.error("Error sorting businesses: ", error));
}
