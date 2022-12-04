let sum;

function calculate(){
    let block = document.getElementById('sum')
    let words_arr = ['товар', 'товара', 'товаров'];
    let disSum = 0;
    let priceSum = 0;
    let quantSum = 0;
    sumProducts.forEach(el =>{
        if (el.checked){
            let quant = el.quant;
            let price = quant * el.price;
            let disprice = (price * (100 - (el.discount + person.discount)))/100;
            priceSum += price
            quantSum += quant
            disSum += disprice
        }
    })
    let discountSum = priceSum - disSum
    sum = disSum
    let count = normalizeCountForm(quantSum, words_arr)
    block.children[0].innerHTML = '<span>Итого</span><span>'+parseInt(disSum).toLocaleString()+' сом</span>'
    block.children[1].innerHTML = '<span>'+ quantSum + ' ' + count +'</span><span>'+parseInt(priceSum).toLocaleString()+' сом</span>'
    block.children[2].innerHTML = '<span>Скидка</span><span>-'+parseInt(discountSum).toLocaleString()+' сом</span>'
    block.children[3].innerHTML = '<span>Доставка</span><span>'+ deliveryCost +'</span>'
    renderDeliverySum()
    renderButtonSum()
}

function renderDeliverySum(){
    let block = document.getElementById('sum-delivery')
    block.innerHTML = '<div class="block__header">' +
        '   <span class="block__header-title">'+ deliveryType() +'</span> <img src="img/Pencil.svg" alt="" onclick="showBlock(\'popUpDelivery\')">' +
        '</div>' +
        '<p>'+ destinationSum +'</p>' +
        '<span class="time">'+ getTimeDeliveryTime() +'</span>' +
        '<div class="delivery-price-block">' +
        '   <div class="icon-green-sum"><div><img src="img/Swoosh_green.svg" alt="галочка" style="width: 11px"></div></div><div> Обратная доставка товаров на склад при отказе — <span id="free-sum" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">бесплатно</span></div>' +
        '        <div class="info__content" id="free-sum-content" style="width: 290px; right: 40px; margin-top: 40px"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>' +
        '</div>'
    renderPaymentSum()
}

function renderPaymentSum(){
    let block = document.getElementById('sum-payment')
    block.innerHTML = '<div class="block__header">' +
        '   <span class="block__header-title">Оплата картой</span><img src="img/Pencil.svg" alt="" onclick="showBlock(\'popUpPayment\')">' +
        '</div>' +
        '<div class="card-sum">'+ cardSum +'</div>'
}

function getTimeDeliveryTime(){
    let content
    if (firstDaySum){
        let time = firstDaySum.split(' ')
        let month = time[3].substring(0,3)
        content = time[0] + time[1] + time[2] + ' ' + month
    } else {
        content = ''
    }
    return content
}

function deliveryType(){
    let content
    if (type === 'courier'){
        content = 'Доставка по адресу'
    }
    if (type === 'PVZ'){
        content = 'Доставка в пункт выдачи'
    }
    return content
}

function checkPay(){
    document.getElementById('payment__content').nextElementSibling.classList.toggle('hide')
    document.getElementById('sum-check').children[3].classList.toggle('hide')
    renderButtonSum()
}

function renderButtonSum(){
    let check = document.getElementById('sum-check').firstElementChild
    let button = document.getElementById('sum-button')
    if (sum > 0 && check.checked){
        button.innerHTML = 'Оплатить ' + parseInt(sum).toLocaleString() + ' сом'
        } else {
        button.innerHTML = 'Заказать'
    }
}

calculate()
