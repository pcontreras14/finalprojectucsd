var ShoppingCart = (function($) {
  "use strict";

  var productsEl = document.querySelector(".products"),
      cartEl =     document.querySelector(".shopping-cart-list"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".cart-checkout"),
      totalPriceEl = document.querySelector(".total-price");
  
  
  var products = [
    {
      id: 0,
      name: "C&G Engineers A1 Microcontroller",
      description: "This is the C&G Engineers A1 Microcontroller. It runs on an AtMega328 Processor made by Atmel, clocked at 16Mhz. It has 32KB of ROM and 2KB of RAM. It is mostly suitable for smaller projects",
      imageUrl: "./a1.png",
      price: 30
    },
    {
      id: 1,
      name: "C&G Engineers Mega Microcontroller",
      description: "This is the C&G Engineers Mega Microcontroller. It runs on an AtMega2560 Processor made by Atmel, clocked at 16Mhz. It has 512KB of ROM and 32KB of RAM.",
      imageUrl: "./mega.png",
      price: 55,
    },
    {
      id: 2,
      name: "C&G Engineers 5G System On Chip",
      description: "This is the 5G System On Chip. This is designed for mobile phones, this enables phones to be able to use the new 5G technology, with speeds of up to 1GB/S",
      imageUrl: "./5g.png",
      price: 599
    },
    {
      id: 3,
      name: "No Contact IR Thermometer [Anti-CoronaVirus]",
      description: "This thermometer can take temperatures from a distance, just aim it at any part of your body and it will get your temerature. The temperature sensor doesnt need to come in contact with any body part, therfore reducing the chances of sickness and/or coronavirus",
      imageUrl: "./thermometer.jpg",
      price: 69
    },
    {
      id: 4,
      name: "C&G Engineers Foldable Drone with 8K Camera",
      description: "This is a very advanced folding drone with an 8k camera. 1hr battery life, 2km range,gps.",
      imageUrl: "./drone.jpg",
      price: 1299
    },
    {
      id: 5,
      name: "C&G Engineers Drone with 1080p Camera",
      description: "More affordable and smaller than the other drone. 20min battery life and 500m range, FHD camera",
      imageUrl: "./drone2.jpg",
      price: 499
    },
    {
      id: 6,
      name: "Item Coming Soon",
      description: "Coming Soon",
      imageUrl: "N/A",
      price: 0
    },
    {
      id: 7,
      name: "Item Coming Soon:",
      description: "Coming Soon",
      imageUrl: "N/A",
      price: 0
    }
  ],
      productsInCart = [];

      function shippingEstimate(){
        
      }
  
 
  var generateProductList = function() {
    products.forEach(function(item) {
      var productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `<div class="product-image">
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span>Product:</span> ${item.name}</div>
                             <div class="product-description"><span>Description:</span> ${item.description}</div>
                             <div class="product-price"><span>Price:</span> ${item.price} $</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button see-more">More Details</a>
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
                          </div>
`;
                             
productsEl.appendChild(productEl);
    });
  }
  

  var generateCartList = function() {
    
    cartEl.innerHTML = "";
    
    productsInCart.forEach(function(item) {
      var li = document.createElement("li"); 
      li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
      cartEl.appendChild(li);
    });
    
    productQuantityEl.innerHTML = productsInCart.length;
    
    generateCartButtons()
  }
  
  
  
  var generateCartButtons = function() {
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block"
      totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }

  var setupListeners = function() {
    productsEl.addEventListener("click", function(event) {
      var el = event.target;
      if(el.classList.contains("add-to-cart")) {
       var elId = el.dataset.id;
       addToCart(elId);
      }
    });
    
    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("Are you sure?")) {
        productsInCart = [];
      }
      generateCartList();
    });
    cartCheckoutEl.addEventListener("click", function(event) {
      window.open("./securecheckout.html");
       
      
      
    });
  }
  
  // Adds new items or updates existing one in productsInCart array
  var addToCart = function(id) {
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }
  
  

  var productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.price *  item.quantity);
    }, 0);
  }
  
  // This functon starts the whole application
  var init = function() {
    generateProductList();
    setupListeners();
  }
  

  return {
    init: init
  };
  

})(jQuery);

ShoppingCart.init();