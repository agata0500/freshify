document.addEventListener('DOMContentLoaded', (event) => {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Initialize the map and set view to user's location
        const map = L.map('map-container').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([lat, lon]).addTo(map)
            .bindPopup('You are here.')
            .openPopup();

        // Farmers data with locations
        const farmers = [
            { name: "Farmer Patricia", distance: "12 km away from you", coords: [lat + 0.1, lon + 0.1] },
            { name: "Farmer Max", distance: "13 km away from you", coords: [lat + 0.2, lon - 0.2] },
            { name: "Farmer Sofia", distance: "15 km away from you", coords: [lat - 0.1, lon + 0.2] }
        ];

        // Add farmers to the map
        farmers.forEach(farmer => {
            L.marker(farmer.coords).addTo(map)
                .bindPopup(`${farmer.name} - ${farmer.distance}`)
                .openPopup();
        });

        // Populate the farmers list
        let farmerList = document.getElementById("farmer-list");
        farmers.forEach(farmer => {
            let li = document.createElement("li");
            li.textContent = `${farmer.name} - ${farmer.distance}`;
            farmerList.appendChild(li);
        });
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }

    // GSAP animations
    gsap.from("header", { duration: 1, y: -100, opacity: 0, ease: "bounce" });
    gsap.from("#map-container", { duration: 1.5, x: -800, opacity: 0, ease: "power2.inOut" });
    gsap.from("#farmers", { duration: 1.5, x: 800, opacity: 0, ease: "power2.inOut" });
    gsap.from("#products", { duration: 1.5, x: -800, opacity: 0, ease: "power2.inOut" });
    gsap.from("#prices", { duration: 1.5, x: 800, opacity: 0, ease: "power2.inOut" });

    // Load farmer images
    const farmerImages = [
        'images/pexels-photo-5529765.webp',
        'images/pexels-photo-7782951.jpg',
        'images/pexels-photo-8540186.jpg'
    ];
    let farmerImagesContainer = document.getElementById('farmer-images');
    farmerImages.forEach(src => {
        let img = document.createElement('img');
        img.src = src;
        farmerImagesContainer.appendChild(img);
    });

    // Load product images
    const productImages = [
        'images/pexels-photo-2694393.jpg',
        'images/pexels-photo-2966150.jpg',
        'images/pexels-photo-3650647.jpg'
    ];
    let productImagesContainer = document.getElementById('product-images');
    productImages.forEach(src => {
        let img = document.createElement('img');
        img.src = src;
        productImagesContainer.appendChild(img);
    });

    // Load prices
    const prices = [
        { product: "Apples from Patricia", price: "$2/kg" },
        { product: "Carrots from Max", price: "$1.5/kg" },
        { product: "Honey from Sofia", price: "$10/l" }
    ];
    let priceTableBody = document.querySelector("#price-table tbody");
    prices.forEach(priceItem => {
        let row = document.createElement("tr");
        let productCell = document.createElement("td");
        productCell.textContent = priceItem.product;
        let priceCell = document.createElement("td");
        priceCell.textContent = priceItem.price;
        row.appendChild(productCell);
        row.appendChild(priceCell);
        priceTableBody.appendChild(row);
    });
});
