// Banner Slider

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Cambia cada 3 segundos
});

// seccion de pedidos

document.addEventListener('DOMContentLoaded', () => {
    const quantityControls = document.querySelectorAll('.quantity button');
    quantityControls.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            const checkbox = this.parentNode.parentNode.previousElementSibling;
            let value = parseInt(input.value);
            if (this.classList.contains('plus')) {
                input.value = value + 1;
                checkbox.checked = true;
            } else if (this.classList.contains('minus') && value > 0) {
                input.value = value - 1;
                if (input.value == 0) {
                    checkbox.checked = false;
                }
            }
        });
    });

    document.getElementById('sendOrder').addEventListener('click', function() {
        const checkedBoxes = document.querySelectorAll('#menu input[type="checkbox"]:checked');
        let order = [];
        let totalPrice = 0;
        
        checkedBoxes.forEach(checkbox => {
            const foodItem = checkbox.value;
            const label = checkbox.nextElementSibling;
            const quantity = parseInt(label.querySelector('.quantity input').value);
            const price = parseFloat(label.querySelector('.price').textContent.replace('$', ''));
            if (quantity > 0) {
                order.push(`${quantity} x ${foodItem} ($${(price * quantity).toFixed(2)})`);
                totalPrice += price * quantity;
            }
        });

        if (order.length > 0) {
            const message = `Hola, me gustaría pedir:\n${order.join('\n')}\nTotal: $${totalPrice.toFixed(2)}`;
            const phoneNumber = '543704058731'; 
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            alert('Por favor, selecciona al menos una comida y especifica la cantidad.');
        }
    });
});


// boton flotante de whatsapp

popupWhatsApp = () => {
  
    let btnClosePopup = document.querySelector('.closePopup');
    let btnOpenPopup = document.querySelector('.whatsapp-button');
    let popup = document.querySelector('.popup-whatsapp');
    let sendBtn = document.getElementById('send-btn');
  
    btnClosePopup.addEventListener("click",  () => {
      popup.classList.toggle('is-active-whatsapp-popup')
    })
    
    btnOpenPopup.addEventListener("click",  () => {
      popup.classList.toggle('is-active-whatsapp-popup')
       popup.style.animation = "fadeIn .6s 0.0s both";
    })
    
    sendBtn.addEventListener("click", () => {
    let msg = document.getElementById('whats-in').value;
    let relmsg = msg.replace(/ /g,"%20");
     window.open('https://wa.me/+543704058731?text='+relmsg, '_blank'); 
    
    });
  
    //setTimeout(() => {
    // popup.classList.toggle('is-active-whatsapp-popup');
    //}, 3000);
  }
  
  popupWhatsApp();
  