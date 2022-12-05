
const avail = document.getElementById('available_list')
const bucket = document.getElementById('bucket-counter')

let sumProducts = [];
let bucketCount = 0;

function drop() {
    document.getElementById("available_list").classList.toggle("hide");
    document.getElementById("dropbtn-avail").classList.toggle("close")
}

(function() {
    products.forEach(product => {
        if (product.amount > 0){
            renderAvailable(product);
            sumProducts.push({id: product.id,
                                price: product.price,
                                discount: product.discount,
                                quant: 1})
            renderPrice(product, sumProducts);
            bucketCount++;
        } else {
            renderNotAvailable(product);
        }
        });
    bucketCounter(bucketCount);
})();

function bucketCounter(n){
    if (n > 0){
        bucket.style.display = 'block';
        bucket.innerHTML = n
    } else {
        bucket.style.display = 'none';
        bucket.innerHTML = "";
    }
}


function fuckTwo() {
    console.log('like')
}

function renderAvailable(product){
    let seller = renderSeller(product.seller);
    let div = document.createElement('div');
    div.className = "product__panel";
    div.id = product.id;
    div.innerHTML = '<div class="product__panel-card">' +
        '               <div class="product__panel-check">' +
        '                   <input type="checkbox" id="'+product.id+'-check">' +
        '                   <label for="'+product.id+'-check"></label>' +
        '               </div>' +
        '               <img src="'+ product.photo +'" alt="'+product.name+'">' +
        '               <div class="product__panel-description">' +
        '                   <h3>'+ product.name + '</h3>' +
        '                   <div id="'+product.id+'-description" class="product__panel-description__add"></div>' +
        '                   <div class="dropdown">' +
        '                       <span>'+product.location+'</span>' +
        '                       <br>' +
        '                       <span>'+product.seller+'</span>' +
        '                       <span class="info" id="'+product.id+'-seller-info" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">i</span>' +
        '                       <div class="info__content" id="'+product.id+'-seller-info-content">' +
        '                           <span><b>'+seller+'</b></span><br>' +
        '                           <span>ОГРН: '+product.OGRN+'</span>' +
        '                           <p>'+product.address+'</p>' +
        '                       </div>' +
        '                   </div>' +
        '               </div>' +
        '           </div>';
    avail.append(div)
    addDescription(product);
}

function renderPrice(product){
    let quant = 0;
    let price = 0;
    let disprice = 0;
    sumProducts.forEach(elem => {
        if (elem.id === product.id){
            quant = elem.quant;
            price = quant * elem.price;
            disprice = (price * (100 - (elem.discount + person.discount)))/100;
        }
    })
    let divPrice = document.getElementById(product.id);
    let div = document.createElement('div');
    div.className = "product__panel-price";
    div.id = product.id+'-price'
    div.innerHTML = '<div class="product__panel-price__manage">' +
        '   <div class="count">' +
        '       <span id="'+product.id+'-minus" onmousedown="minus(id);" onmouseup="clearTimers()" onmouseout="clearTimers()" >-</span> <span>'+quant+'</span> <span id="'+product.id+'-plus" onmousedown="plus(id) " onmouseup="clearTimers()" onmouseout="clearTimers()">+</span>' +
        '   </div>' +
        '   <div class="price__icons" id="'+product.id+'-price-icons">' +
        '   </div>' +
        '</div>'+
        '<div class="price__block">' +
        '   <span id="'+product.id+'-sum" class="price__block-disprice">'+parseInt(disprice).toLocaleString()+'</span><span class="price__block-curr"> сом</span><br>' +
        '   <div id="'+product.id+'-price-info" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">' +
        '       <span style="font-weight: 400; font-size: 13px">'+parseInt(price).toLocaleString()+'</span><span style="font-weight: 400; font-size: 13px"> сом</span>' +
        '   </div>' +
        '   <div class="info__content" id="'+product.id+'-price-info-content">' +
        '       <div class="discount"><span>Скидка '+product.discount+'%</span><span>-'+(product.price * (product.discount / 100)).toFixed(0)+' сом</span></div>' +
        '       <div class="discount"><span>Скидка покупателя '+person.discount+'%</span><span>-'+(product.price * (person.discount / 100)).toFixed(0)+' сом</span></div>' +
        '   </div>' +
        '</div>';
    divPrice.append(div);
    if (quant === product.amount){
        document.getElementById(product.id+'-plus').style.color = 'rgba(0, 0, 0, 0.2)'
        document.getElementById(product.id+'-plus').style.cursor = 'default'
    }
    if (quant === 1){
        document.getElementById(product.id+'-minus').style.color = 'rgba(0, 0, 0, 0.2)'
        document.getElementById(product.id+'-minus').style.cursor = 'default'
    }
    quantCheck(product.amount, product.id);
    sizeCheck(product.id, disprice);
}

function renderNotAvailable(product){

}

function addDescription(product){
    const description = document.getElementById(product.id+'-description')
    let spanColor = document.createElement('span');
    let spanSize = document.createElement('span');
    if (product.color){
        spanColor.innerHTML = 'Цвет: '+ product.color;
        description.append(spanColor);
    }
    if (product.size){
        spanSize.innerHTML = 'Размер: '+ product.size;
        description.append(spanSize);
    }
}

function popupInfo(id){
    document.getElementById(id+'-content').classList.toggle("show");

}

function renderSeller(n){
    let arr = n.split(' ');
    let seller = "";
    const el = '"';
    if (arr[0] === "ООО"){
        for (let i=1; i<arr.length; i++){
            arr[i] = arr[i].toUpperCase();
        }
        arr.splice(1, 0, el);
        arr.push(el)
    }
    for (let i=0; i<arr.length; i++){
        if (arr[i] !== el && i < arr.length - 2){
            seller += arr[i] + " ";
        } else {
            seller += arr[i];
        }
    }
    return seller;
}

let timeout, interval;

function clearTimers(){
    clearTimeout(timeout);
    clearInterval(interval);
}

function minus(idMinus){
    let id = Number(idMinus.replace(/[^\d]/g, ''));
    let productMinus;
    products.forEach(product =>{
        if (product.id === id){
            productMinus = product;
        }
    });
    sumProducts.forEach(elem => {
        if (elem.id === id && elem.quant !== 1){
            elem.quant--
            let divPrice = document.getElementById(productMinus.id);
            let div = document.getElementById(productMinus.id + '-price');
            divPrice.removeChild(div);
            renderPrice(productMinus);
            timeout = setTimeout(()=>{
                interval = setInterval(()=>{
                    elem.quant--
                    let divPrice = document.getElementById(productMinus.id);
                    let div = document.getElementById(productMinus.id + '-price');
                    divPrice.removeChild(div);
                    renderPrice(productMinus);
                    if (elem.quant === 1){
                        clearTimers();
                    }
                },100)
            },200)
        }
    })
}

function plus(idPlus){
    let id = Number(idPlus.replace(/[^\d]/g, ''));
    let productPlus;
    let amount;
    products.forEach(product =>{
        if (product.id === id){
            productPlus = product;
            amount = product.amount;
        }
    });
    sumProducts.forEach(elem => {
        if (elem.id === id && elem.quant < amount){
            elem.quant++
            let divPrice = document.getElementById(productPlus.id);
            let div = document.getElementById(productPlus.id+'-price');
            divPrice.removeChild(div);
            renderPrice(productPlus);
            timeout = setTimeout(()=>{
                interval = setInterval(()=>{
                    elem.quant++
                    let divPrice = document.getElementById(productPlus.id);
                    let div = document.getElementById(productPlus.id + '-price');
                    divPrice.removeChild(div);
                    renderPrice(productPlus);
                },100)
            },200)
            if (elem.quant >= productPlus.amount){
                clearTimers();
            }
        }
    });
}

function deleteFromBucket(id){
    console.log(id);
}

function quantCheck(amount, id){
    if (amount <= 10){
        let span = document.createElement('span');
        span.innerHTML = 'Осталось '+ amount +' шт.'
        span.style.color = '#FF3B30'
        span.style.paddingLeft = '2px'
        document.getElementById(id+'-price').childNodes[0].childNodes[1].after(span);
    }
}

function sizeCheck(id, price){
    let sum = document.getElementById(id+'-sum');
    let arr = String(price).split('');
    if (arr.length > 6){
        sum.style.fontSize = '16px'
    } else {
        sum.style.fontSize = '20px'
        sum.style.lineHeight = '28px'
    }
}

function createLike(id){
    let like = document.createElement('div')
    like.id = id+'-like';
    like.innerHTML = '<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 2.05857C2.26589 2.75224 1.76684 3.83284 1.99493 5.42928C2.22332 7.02783 3.26494 8.68522 4.80436 10.3478C6.25865 11.9184 8.10962 13.4437 9.99996 14.874C11.8903 13.4437 13.7413 11.9184 15.1956 10.3478C16.735 8.68521 17.7766 7.02783 18.005 5.4293C18.233 3.83285 17.734 2.75224 16.9659 2.05856C16.1766 1.34572 15.055 1 14 1C12.1319 1 11.0923 2.08479 10.5177 2.68443C10.4581 2.7466 10.4035 2.80356 10.3535 2.85355C10.1582 3.04882 9.84166 3.04882 9.6464 2.85355C9.59641 2.80356 9.54182 2.7466 9.48224 2.68443C8.90757 2.08479 7.86797 1 5.99995 1C4.94495 1 3.82325 1.34573 3.03396 2.05857ZM2.36371 1.31643C3.37369 0.404274 4.75202 0 5.99995 0C8.07123 0 9.34539 1.11257 9.99996 1.77862C10.6545 1.11257 11.9287 0 14 0C15.2479 0 16.6262 0.404275 17.6362 1.31644C18.6674 2.24776 19.2668 3.66715 18.9949 5.5707C18.7233 7.47217 17.5149 9.31479 15.9294 11.0272C14.3355 12.7486 12.3064 14.3952 10.3 15.9C10.1222 16.0333 9.87773 16.0333 9.69995 15.9C7.69353 14.3952 5.66443 12.7485 4.0706 11.0272C2.48503 9.31478 1.27665 7.47217 1.00498 5.57072C0.733012 3.66716 1.33249 2.24776 2.36371 1.31643Z"/>\n' +
        '</svg>'
}

function createTrash(id){
    let trash = document.createElement('div')
    trash.id = id+'-trash';
    trash.innerHTML = '<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 2.05857C2.26589 2.75224 1.76684 3.83284 1.99493 5.42928C2.22332 7.02783 3.26494 8.68522 4.80436 10.3478C6.25865 11.9184 8.10962 13.4437 9.99996 14.874C11.8903 13.4437 13.7413 11.9184 15.1956 10.3478C16.735 8.68521 17.7766 7.02783 18.005 5.4293C18.233 3.83285 17.734 2.75224 16.9659 2.05856C16.1766 1.34572 15.055 1 14 1C12.1319 1 11.0923 2.08479 10.5177 2.68443C10.4581 2.7466 10.4035 2.80356 10.3535 2.85355C10.1582 3.04882 9.84166 3.04882 9.6464 2.85355C9.59641 2.80356 9.54182 2.7466 9.48224 2.68443C8.90757 2.08479 7.86797 1 5.99995 1C4.94495 1 3.82325 1.34573 3.03396 2.05857ZM2.36371 1.31643C3.37369 0.404274 4.75202 0 5.99995 0C8.07123 0 9.34539 1.11257 9.99996 1.77862C10.6545 1.11257 11.9287 0 14 0C15.2479 0 16.6262 0.404275 17.6362 1.31644C18.6674 2.24776 19.2668 3.66715 18.9949 5.5707C18.7233 7.47217 17.5149 9.31479 15.9294 11.0272C14.3355 12.7486 12.3064 14.3952 10.3 15.9C10.1222 16.0333 9.87773 16.0333 9.69995 15.9C7.69353 14.3952 5.66443 12.7485 4.0706 11.0272C2.48503 9.31478 1.27665 7.47217 1.00498 5.57072C0.733012 3.66716 1.33249 2.24776 2.36371 1.31643Z"/>\n' +
        '</svg>'

}