// Список продуктов с их параметрами
const products = [
    { id: 1, name: 'GTA 5', price: 1749, platform: 'PC', genre: 'Action' },
    { id: 2, name: 'Cyberpunk 2077', price: 1949, platform: 'PC', genre: 'RPG' },
    { id: 3, name: 'Minecraft', price: 1999, platform: 'PC', genre: 'Adventure' },
{ id: 4, name: 'FIFA 22', price: 3999, platform: 'PC', genre: 'Adventure' },
{ id: 5, name: 'Forza Horizon 5', price: 2799, platform: 'PC', genre: 'Adventure' },
{ id: 6, name: 'The Legend of Zelda: Breath of the Wild', price: 3499, platform: 'PC', genre: 'Adventure' },
{ id: 7, name: 'Age of Empires IV', price: 1999, platform: 'PC', genre: 'Adventure' },
    // Добавьте другие товары, если необходимо
];

let cartCount = 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Функция для обновления отображения количества товаров в корзине
function updateCartCount() {
    cartCount = cartItems.length;
    document.getElementById('cart-count').innerText = cartCount;
}

// Обработка добавления в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productId = parseInt(this.parentElement.getAttribute('data-id'));
        if (productId) {
            cartItems.push(productId);
            updateCartCount();
            alert('Товар добавлен в корзину!');

            // Сохраняем корзину в Local Storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } else {
            alert('Ошибка: Не удалось найти идентификатор товара.');
        }
    });
});

// Заполнение корзины на странице cart.html
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0; // Сумма всех товаров

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
        return;
    }

    cartItems.forEach((itemID, index) => {
        const product = products.find(product => product.id === itemID); // Найти товар по его ID
        if (product) {
            totalPrice += product.price; // Сумма всех товаров
            
            const productDiv = document.createElement('div');
            productDiv.className = 'cart-item';
            productDiv.innerHTML = `
                <p>Товар: ${product.name}</p>
                <p>Цена: ₽${product.price}</p>
                <button class="remove-from-cart" data-index="${index}">Удалить</button>
            `;
            cartItemsContainer.appendChild(productDiv);
        }
    });

    // Отображаем итоговую сумму
    const totalPriceDiv = document.getElementById('total-price');
    totalPriceDiv.innerText = `Итого: ₽${totalPrice}`;

    // Добавляем обработчики удаления
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function () {
            const itemIndex = this.getAttribute('data-index');
            cartItems.splice(itemIndex, 1); // Удаляем товар из массива
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Обновляем Local Storage
            displayCartItems(); // Обновляем отображение корзины
            updateCartCount();
        });
    });
}

// Вызов функции для отображения товаров в корзине при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCartItems();
});

// Очистка корзины
document.getElementById('clear-cart').addEventListener('click', function () {
    localStorage.removeItem('cartItems');
    cartItems = [];
    updateCartCount();
    displayCartItems();
});

// Обработка регистрации
document.getElementById('register-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    // Сохраняем пользователя в Local Storage
    localStorage.setItem(username, password);
    alert('Регистрация успешна! Теперь вы можете войти.');
    window.location.href = 'login.html'; // Перенаправление на страницу входа
});

// Обработка входа
document.getElementById('login-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Проверяем наличие пользователя в Local Storage
    if (localStorage.getItem(username) === password) {
        alert('Вход успешен!');
        window.location.href = 'index.html'; // Перенаправление на главную страницу
    } else {
        alert('Неверное имя пользователя или пароль!');
    }
});
function changeImage(imageSrc) {
    document.getElementById('main-image').src = imageSrc;
}
