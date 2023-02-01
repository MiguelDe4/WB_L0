
let firstCard = true
let cardSum

function renderCard(card){
    document.getElementById('payment__content').innerHTML = '<img src="'+ card.card +'" alt="система оплаты"/>' + '<span>'+ card.number +'</span>'
    cardSum = document.getElementById('payment__content').innerHTML
    renderPaymentSum()
}

function renderCardList(){
    deleteButtonCard()
    let modul = document.getElementById('popUpPayment')
    let card = document.createElement('form')
    card.classList = 'popup-window-addresses'
    card.id = 'card'
    getCardList(card);
    modul.append(card)
    if (firstCard){
        document.getElementById('card-0').checked = true;
        firstCard = false;
    }
    renderButtonCard()
}

function getCardList(block){
    let i = 0;
    person.cards.forEach( elem => {
        let input = document.createElement('input');
        input.type = 'radio';
        input.id = 'card-'+i;
        input.name = 'card'
        let label = document.createElement('label');
        label.setAttribute('for', `card-`+i);
        label.innerHTML = '<img src="'+ elem.card +'" alt="система оплаты"/>' + elem.number
        let div = document.createElement('div');
        div.classList = 'address-list'
        div.innerHTML = '<div class="form_radio">' + input.outerHTML + label.outerHTML
        block.append(div)
        i++
    })
}

function renderButtonCard(){
    let modul = document.getElementById('popUpPayment')
    let button = document.createElement('button')
    button.classList = 'popup-window__button';
    button.innerHTML = 'Выбрать'
    button.id = 'choice__button-card'
    modul.append(button);
    button.addEventListener('click', takeCard)
}

function deleteButtonCard(){
    if (document.getElementById('choice__button-card')){
        document.getElementById('choice__button-card').remove()
    }
}

function takeCard(){
    let arr = document.getElementById('popUpPayment').children[1]
    for ( let i = 0; i < arr.childElementCount; i++){
        let arrCheck = arr.children[i].firstElementChild.firstElementChild;
        if (arrCheck.checked){
            renderCard(person.cards[i])
        }
    }
    closeBlock('popUpPayment')
}

renderCardList()
renderCard(person.cards[0])