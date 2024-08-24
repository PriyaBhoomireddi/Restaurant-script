function getMenu() {
  fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
    .then(response => response.json())
    .then(data => {
      displayMenuItems(data);
    })
    .catch(error => {
      console.error('Error fetching menu:', error);
    });
}

function displayMenuItems(items) {
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = '';

  items.forEach(item => {
    const menuItem = document.createElement('li');
    menuItem.classList.add('menu-item');
    menuItem.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}" class="menu-image">
      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>
    `;
    menuList.appendChild(menuItem);
  });
}

function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = ['Burger 1', 'Burger 2', 'Burger 3'];
      resolve({ burgers });
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

document.addEventListener('DOMContentLoaded', getMenu);

const orderButton = document.getElementById('order-btn');
orderButton.addEventListener('click', async () => {
  try {
    const order = await TakeOrder();
    console.log('Order placed:', order.burgers);

    const prepStatus = await orderPrep();
    console.log('Order preparation status:', prepStatus);

    const paymentStatus = await payOrder();
    console.log('Payment status:', paymentStatus);

    if (paymentStatus.paid) {
      thankyouFnc();
    }
  } catch (error) {
    console.error('Error processing the order:', error);
  }
});
