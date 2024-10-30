// Yalnızca harf girişine izin veren fonksiyon
function onlyLetters(input) {
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }
  
  // Yalnızca sayı girişine izin veren fonksiyon
  function onlyNumbers(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
  }
  
  // Son kullanma tarihini AA/YY formatına göre biçimlendiren fonksiyon
  function formatExpiry(input) {
    let value = input.value.replace(/\D/g, ''); // Sadece rakamları alır
    if (value.length >= 3) {
      input.value = value.slice(0, 2) + '/' + value.slice(2, 4);
    } else {
      input.value = value;
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const paymentButton = document.querySelector('.payment-button');
    
    paymentButton.addEventListener('click', function(event) {
      event.preventDefault(); // Varsayılan form gönderimini engelle
  
      // Form alanlarını seçin
      const cardName = document.getElementById('cardName');
      const cardNumber = document.getElementById('cardNumber');
      const expiry = document.getElementById('expiry');
      const cvv = document.getElementById('cvv');
      const address = document.getElementById('address');
      const city = document.getElementById('city');
      const zip = document.getElementById('zip');
  
      // Boş alanları kontrol et
      if (!cardName.value.trim() || !cardNumber.value.trim() || !expiry.value.trim() || 
          !cvv.value.trim() || !address.value.trim() || !city.value.trim() || !zip.value.trim()) {
        alert("Lütfen tüm alanları doldurun.");
        return; // Formu göndermeyi durdur
      }
  
      // Kart numarası, son kullanma tarihi ve CVV uzunluklarını kontrol et
      if (cardNumber.value.length < 16 || expiry.value.length < 5 || cvv.value.length < 3) {
        alert("Lütfen geçerli bir kart numarası, son kullanma tarihi ve CVV girin.");
        return; // Formu göndermeyi durdur
      }
  
      // Ödeme başarılı olduğunda sessionStorage'daki bayrağı sıfırla
      sessionStorage.removeItem('paymentShown');
      
      // Başarı mesajı ile anasayfaya yönlendir
      window.location.href = 'index.html?message=success';
    });
  });
  