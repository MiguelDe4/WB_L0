let deliveryCost, destinationSum, firstDaySum

let ratingIcon = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919L6.69769 1.14922ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922" fill="#FF970D"/>\n' +
    '</svg>\n';
let firstElement = true;
let firstAddress = person.PVZ[0];
let type;
let deliveryProducts = [];
let now = new Date();
let monthNames = [
    "января", "февраля", "мара", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
]

function showBlock(id) {

    let darkLayer = document.createElement('div');
    darkLayer.id = 'shadow';
    document.body.appendChild(darkLayer);

    let modalWin = document.getElementById(id);
    modalWin.style.display = 'block';

    let cross = document.getElementById(id+'-close')

    darkLayer.onclick = function () {
        closeBlock(id)
    };

    const screen = document.documentElement.clientWidth

    cross.onclick = function () {
        closeBlock(id)
    };

    if (screen > 699){
        modalWin.scrollIntoView({block: "center", behavior: "smooth"});
    }else {
        modalWin.scrollIntoView({block: "center"});
    }
    let body = document.body
    body.style.overflow = 'hidden'
}

function closeBlock(id){
    let darkLayer = document.getElementById('shadow')
    let modalWin = document.getElementById(id);
    darkLayer.parentNode.removeChild(darkLayer);
    modalWin.style.display = 'none';
    let body = document.body
    body.style.overflow = 'unset'
    return false;
}

function renderDelivery(destination){
    let deliveryInfo = document.getElementById('delivery__content')
    if (type === 'courier'){
        deliveryInfo.firstElementChild.firstElementChild.firstElementChild.innerHTML = 'Адрес доставки'
        deliveryInfo.firstElementChild.firstElementChild.lastElementChild.innerHTML = destination;
        destinationSum = destination
    }
    if (type === 'PVZ'){
        deliveryInfo.firstElementChild.firstElementChild.firstElementChild.innerHTML = 'Пункт выдачи'
        deliveryInfo.firstElementChild.firstElementChild.lastElementChild.innerHTML = destination.address + '<br>' + ratingIcon + '<span> '+destination.grade+'</span> <span>'+destination.working_hours+'</span>'
        destinationSum = destination.address
    }
    if (person["delivery-cost"] === 'free'){
        deliveryInfo.children[0].children[1].children[1].innerHTML = 'Бесплатно';
        deliveryCost = 'Беслатно'
        renderSubscription();
    }
}

function renderSubscription(){
    let sub = document.getElementById('delivery__subscription');
    sub.innerHTML = '<div class="icon-green"><div><img src="img/Swoosh_green.svg" alt="галочка" style="width: 11px"></div></div><div style="display: inline-block"> Обратная доставка товаров на склад при отказе — <span id="free" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">бесплатно</span></div>' +
        '<div class="info__content" id="free-content" style="width: 290px; left: 260px"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>'
}

function renderPVZList(){
    deleteButton()
    type = 'PVZ';
    let modul = document.getElementById('popUpDelivery')
    modul.children[1].children[0].style.border = '2px solid #CB11AB';
    modul.children[1].children[1].style.border = '2px solid rgba(203, 17, 171, 0.15)';
    let PVZ = document.createElement('form')
    PVZ.classList = 'popup-window-addresses'
    PVZ.id = 'PVZ'
    getPVZList(PVZ);
    modul.append(PVZ)
    for (let i = 0; i < person.PVZ.length; i++){
        addTrashDel(i, type);
    }
    if (firstElement){
        document.getElementById('radio-0').checked = true;
        firstElement = false;
    }
    renderButton()
}

function getPVZList(block){
    let i = 0;
    person.PVZ.forEach( elem => {
        let input = document.createElement('input');
        input.type = 'radio';
        input.id = 'radio-'+i;
        input.name = 'PVZcheck'
        let label = document.createElement('label');
        label.setAttribute('for', `radio-`+i);
        label.innerHTML = elem.address + '<br>' + ratingIcon + '<span> '+elem.grade+'</span> <span style="color: #A0A0A4">'+elem.working_hours+'</span>'
        let div = document.createElement('div');
        div.classList = 'address-list'
        div.innerHTML = '<div class="form_radio">' + input.outerHTML + label.outerHTML+ '</div><div class="address-list-trash">' + trash + '</div>';
        block.append(div)
        i++
    })
}

function renderAddressList(){
    deleteButton()
    type = 'courier'
    let modul = document.getElementById('popUpDelivery')
    modul.children[1].children[1].style.border = '2px solid #CB11AB';
    modul.children[1].children[0].style.border = '2px solid rgba(203, 17, 171, 0.15)';
    let address = document.createElement('form')
    address.classList = 'popup-window-addresses'
    address.id = 'address'
    getAddressList(address);
    modul.append(address)
    for (let i = 0; i < person.addresses.length; i++){
        addTrashDel(i, type);
    }
    if (firstElement){
        document.getElementById('radio-0').checked = true;
        firstElement = false;
    }
    renderButton()
}

function  getAddressList(block){
    let i = 0;
    person.addresses.forEach( elem => {
        let input = document.createElement('input');
        input.type = 'radio';
        input.id = 'radio-'+i;
        input.name = 'addressCheck'
        let label = document.createElement('label');
        label.setAttribute('for', `radio-`+i);
        label.innerHTML = elem
        let div = document.createElement('div');
        div.classList = 'address-list'
        div.innerHTML = '<div class="form_radio">' + input.outerHTML + label.outerHTML+ '</div><div class="address-list-trash">' + trash + '</div>';
        block.append(div)
        i++
    })
}

function addTrashDel(id, type){
    let addTrash = document.getElementById('radio-'+id).parentNode.nextSibling.firstChild
    addTrash.addEventListener('click', ()=> deleteFromDelivery(id, type))
}

function deleteFromDelivery(id, type){
    document.getElementById('choice__button').remove()
    if (type === 'PVZ') {
        document.getElementById('PVZ').remove()
        person.PVZ.splice(id, 1)
        firstElement = true
        renderPVZList()
    }
    if (type === 'courier'){
        document.getElementById('address').remove()
        person.addresses.splice(id, 1)
        firstElement = true
        renderAddressList()
    }
}

function renderButton(){
    let modul = document.getElementById('popUpDelivery')
    let button = document.createElement('button')
    button.classList = 'popup-window__button';
    button.innerHTML = 'Выбрать'
    button.id = 'choice__button'
    modul.append(button);
    button.addEventListener('click', takeAddress)
}

function takeAddress(){
    let arr = document.getElementById('popUpDelivery').children[3]
    for ( let i = 0; i < arr.childElementCount; i++){
        let arrCheck = arr.children[i].firstElementChild.firstElementChild;
        if (arrCheck.checked){
            if (type === 'courier'){
                renderDelivery(person.addresses[i])
            }
            if (type === 'PVZ'){
                renderDelivery(person.PVZ[i])
            }
        }
    }
    closeBlock('popUpDelivery')
    renderDeliverySum()
}

function deleteButton(){
    if (document.getElementById('choice__button')){
        document.getElementById('choice__button').remove()
    }
}

function getDeliveryProducts(){
    deliveryProducts = []
    sumProducts.forEach(elem =>{
        if (elem.checked){
            deliveryProducts.push({
                id: elem.id,
                distance: returnDistance(elem.id),
                quant: elem.quant
            })
        }
    })
    renderDeliveryProducts()
}

function renderDeliveryProducts(){
    clearDelivery()
    let dist = returnDistArr()
    dist.forEach(el =>{
        let tr = document.createElement('tr')
        let date = now.addDays(el+1)
        let dateDev = date.addDays(1)
        tr.innerHTML = '<th>'+ getDate(date, dateDev) +'</th>' +
            '<td>'+ getProducts(el) +'</td>'
        firstDaySum = getDate(date, dateDev);
        document.getElementById('delivery__content').firstElementChild.append(tr);
    })

}

function getProducts(n){
    let content = '';
    deliveryProducts.forEach(el =>{
        if (el.distance === n){
            let img;
            let alt;
            products.forEach(elem =>{
                if (el.id === elem.id){
                    img = elem.photo
                    alt = elem.name
                }
            })
            content += '<div class="delivery__content-products"><img src="'+ img +'" alt="'+ alt +'"><div>'+ el.quant +'</div></div>'
        }
    })
    return content
}

function clearDelivery(){
    let block = document.getElementById('delivery__content').firstElementChild;
    let n = block.childElementCount
    for (let i = 2; i < n; i++) {
        block.children[2].remove()
    }
}

function getDate(firstDate, secondDate){
    let content;
    let firstMonth = monthNames[firstDate.getMonth()];
    let firstDay = firstDate.getUTCDate();
    let secondMonth = monthNames[secondDate.getMonth()];
    let secondDay = secondDate.getUTCDate();
    if (firstMonth === secondMonth){
        content = firstDay + ' - ' + secondDay + ' ' + firstMonth
    } else {
        content = firstDay + ' ' + firstMonth + ' -<br>' + secondDay + ' ' + secondMonth
    }
    return content
}

function returnDistArr(){
    let arr = []
    deliveryProducts.forEach(elem =>{
        arr.push(elem.distance)
    })
    return new Set(arr)
}

function returnDistance(id){
    let n;
    products.forEach(elem =>{
        if (elem.id === id){
            n = elem.distance
        }
    })
    return n;
}

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


renderPVZList()
renderDelivery(firstAddress)
