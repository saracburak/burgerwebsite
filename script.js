document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(function(card) {
      const decreaseBtn = card.querySelector('.decrease-btn');
      const increaseBtn = card.querySelector('.increase-btn');
      const quantityInput = card.querySelector('.quantity-input');

      decreaseBtn.addEventListener('click', function() {
          let quantity = parseInt(quantityInput.value);
          if (quantity > 1) {
              quantity--;
              quantityInput.value = quantity;
          }
      });

      increaseBtn.addEventListener('click', function() {
          let quantity = parseInt(quantityInput.value);
          quantity++;
          quantityInput.value = quantity;
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const cartIcon = document.querySelector('#cart-icon');
  const cartDropdown = document.querySelector('#cart-dropdown');
  const cartBadge = document.querySelector('.cart-badge');
  let cart = []; // Sepet verilerini tutacak dizi
  let totalItems = 0; // Sepetteki toplam ürün sayısı

  // Sepete Ekle butonlarını seç
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  // Her Sepete Ekle butonuna tıklama olayı ekle
  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const card = button.closest('.card');
      const productName = card.querySelector('h2').textContent;
      const productImage = card.querySelector('img').src;
      const quantityToAdd = parseInt(card.querySelector('.quantity-input').value); // Eklenen miktar
      
      // Ürün sepette zaten var mı diye kontrol et
      const existingProduct = cart.find(item => item.name === productName);
      
      if (existingProduct) {
        // Ürün zaten varsa doğrudan yeni miktar olarak ayarla
        existingProduct.quantity = quantityToAdd;
      } else {
        // Yeni ürün sepete ekle
        cart.push({
          name: productName,
          image: productImage,
          quantity: quantityToAdd
        });
      }
      
      // Toplam ürün sayısını güncelle
      totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalItems; // Sepet simgesindeki sayaç güncelle
      cartBadge.style.display = 'block'; // Sepet sayacını göster
      
      // Sepet açılır menüsünü güncelle
      updateCartDropdown();
    });
  });

  // Sepet menüsünü günceller
  function updateCartDropdown() {
    const cartItemsList = document.querySelector('#cart-items');

    // Sepet boşsa
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li>Sepetiniz boş.</li>';
    } else {
      // Sepetteki ürünleri göster
      cartItemsList.innerHTML = ''; // Önce listeyi temizle
      cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <span>${item.name} - ${item.quantity} adet</span>
        `;
        cartItemsList.appendChild(li);
      });
    }
  }

  // Sepet ikonuna tıklayınca sepet açılır menüsünü göster/gizle
  cartIcon.addEventListener('click', function(event) {
    event.preventDefault();
    cartDropdown.classList.toggle('open'); // Açılır menüyü aç/kapat
  });

  // Başka bir yere tıklayınca açılır menüyü kapat
  document.addEventListener('click', function(event) {
    if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
      cartDropdown.classList.remove('open'); // Sepet menüsünü kapat
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');

  if (message === 'success' && !sessionStorage.getItem('paymentShown')) {
    // Başarı bildirimi öğesini oluştur
    const successNotification = document.createElement('div');
    successNotification.classList.add('success-notification');
    successNotification.textContent = 'Ödemeniz başarıyla gerçekleşti';

    // Bildirimi sayfaya ekle
    document.body.appendChild(successNotification);

    // Bildirimi birkaç saniye sonra gizle
    setTimeout(() => {
      successNotification.classList.add('hide');
    }, 4000); // 4 saniye sonra kaybolur

    // Bildirimin gösterildiğini kaydet
    sessionStorage.setItem('paymentShown', 'true');
  }
});
