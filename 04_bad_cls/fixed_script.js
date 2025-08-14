const productList = [
    {
        id: 1,
        name: "Keychron K8 Pro Mechanical Keyboard",
        price: 199,
        originalPrice: 239,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        description: "Wireless mechanical keyboard with hot-swappable switches",
        rating: 4.8
    },
    {
        id: 2,
        name: "LG UltraWide 34WN80C Monitor",
        price: 799,
        originalPrice: 899,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        description: "34-inch curved monitor perfect for coding",
        rating: 4.9
    },
    {
        id: 3,
        name: "Sony WH-1000XM5 Headphones",
        price: 349,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "Noise-cancelling headphones for focused coding",
        rating: 4.7
    },
    {
        id: 4,
        name: "Framework Laptop 13",
        price: 1299,
        originalPrice: 1449,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        description: "Modular laptop designed by developers for developers",
        rating: 4.6
    },
    {
        id: 5,
        name: "Herman Miller Aeron Chair",
        price: 1195,
        originalPrice: 1395,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        description: "Ergonomic chair for long coding sessions",
        rating: 4.8
    },
    {
        id: 6,
        name: "Logitech MX Master 3S Mouse",
        price: 89,
        originalPrice: 109,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        description: "Precision mouse with customizable buttons",
        rating: 4.9
    },
    {
        id: 7,
        name: "Steam Deck 512GB",
        price: 649,
        originalPrice: 699,
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop",
        description: "Portable gaming for dev downtime",
        rating: 4.5
    },
    {
        id: 8,
        name: "Elgato Stream Deck",
        price: 149,
        originalPrice: 179,
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
        description: "Customizable control deck for productivity",
        rating: 4.7
    }
];

async function fakeProductFetch() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productList);
        }, 2000); // Same delay as bad example for comparison
    });
}

function createProductCard(product) {
    return `
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Save $${product.originalPrice - product.price}
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                
                <div class="flex items-center mb-3">
                    <div class="flex text-yellow-400">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span class="ml-2 text-sm text-gray-600">(${product.rating})</span>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span class="text-2xl font-bold text-green-600">$${product.price}</span>
                        <span class="text-sm text-gray-500 line-through">$${product.originalPrice}</span>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-200">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function loadProducts() {
    const productListContainer1 = document.getElementById("product_list_1");
    const productListContainer2 = document.getElementById("product_list_2");
    
    // Get skeleton cards (to replace them)
    const skeletonCards1 = productListContainer1.querySelectorAll('.skeleton-card');
    const skeletonCards2 = productListContainer2.querySelectorAll('.skeleton-card');
    
    fakeProductFetch().then((products) => {
        // Split products into two sections
        const hotDeals = products.slice(0, 4); // First 4 products
        const premiumCollection = products.slice(4); // Remaining products
        
        // Replace skeleton cards in first section with real products
        // This happens all at once to avoid any layout shift
        hotDeals.forEach((product, index) => {
            if (skeletonCards1[index]) {
                skeletonCards1[index].outerHTML = createProductCard(product);
            }
        });
        
        // Replace skeleton cards in second section with real products
        // Also happens all at once - no staggered loading
        premiumCollection.forEach((product, index) => {
            if (skeletonCards2[index]) {
                skeletonCards2[index].outerHTML = createProductCard(product);
            }
        });
    });
}

// Initial load
loadProducts();

// Add reload functionality
document.addEventListener('DOMContentLoaded', () => {
    const reloadBtn = document.getElementById('reload_btn');
    reloadBtn.addEventListener('click', () => {
        // Reset skeleton loaders
        location.reload(); // Simple reload to reset skeletons
    });
});
