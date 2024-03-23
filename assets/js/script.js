
// const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
// "2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

// console.log( txt.split(/[\r\n]+/gm) );

const inputElement = document.querySelector('input[type="file"]');
// console.log(inputElement);

const ulElement = document.querySelector('.excursions');
// console.log(ulElement);

inputElement.addEventListener('change', handleFile);
function handleFile(event) {
    const file = event.target.files[0];
    
    if(file && file.type === 'text/csv') {
        const reader = new FileReader();
        reader.readAsText(file);
        
        reader.onload = function(readerEvent) {
            
            readerEvent.preventDefault();
            const contents = readerEvent.target.result;
            // console.log('contents', readerEvent.target.result); 
            const offers = contents.split(/[\r\n]+/gm);
            // console.log('offers', offers); 

            offers.forEach(function(offer) {
                const excursion = offer.split('\",\"'); // ok TABLICA
                // console.log(excursion); 

                const id = excursion[0]; //stringi do innerText
                const name = excursion[1];
                const description = excursion[2];
                const priceAdult = excursion[3];
                const priceChild = excursion[4];

                const excursionObj = {id, name, description, priceAdult, priceChild}; // każda wycieczka to obiekt
                // console.log(excursionObj);
                
                createPrototype(excursionObj);
                // createBasket(excursionObj) // 2 tablice, w kazdej 1 obiekt
                // placeOrder();
            })
        } 
    }
}

const liElement = document.querySelector('li');
liElement.style.display = 'none';

function createPrototype(obj) { // copyPrototype

    const newLi = document.querySelector('.excursions__item--prototype').cloneNode(true);
    newLi.style.display = 'block';
    newLi.classList.add('excursions__item--trip');
    
    //NAZWA WYCIECZKI
    const newTitle = newLi.querySelector('.excursions__title');
    newTitle.innerText = obj['name'];
    newTitle.dataset.name = obj.name; //ok atrybut data-name = nazwa wycieczki dodany
    const excursionName = obj.name; //NAZWA WYCIECZKI Ogrodzieniec Ojców
    // console.log('excursionName => ', excursionName);
    
    //OPIS WYCIECZKI
    const newDescription = newLi.querySelector('.excursions__description');
    newDescription.innerText = obj['description']; //DZIAŁA
    // console.log('newDescription => ', newDescription);
    
    ulElement.appendChild(newLi);
    
    //2 OBIEKTY - OBIE WYCIECZKI - 2 RAMKI
    const LiList = document.querySelectorAll('.excursions__item--trip');
    // console.log('LiList => ', LiList);

    // CENY WYCIECZEK 
    const priceElements = newLi.querySelectorAll('.excursions__price');
    console.log('priceElements => ', priceElements);
    // CENA RODZIC 
    const priceAdultEl = priceElements[0]; 
    const priceAdult = parseInt(priceAdultEl.innerText); //99 number
    // console.log(priceAdult);
    // CENA DZIECKO
    const priceChild = parseInt(priceElements[1].innerText); // 50 number
    // console.log('priceAdult => ', priceAdult, 'priceChild => ', priceChild);

    //NASŁUCHIWANIE NA FORM
    const form = document.querySelectorAll('form');
    console.log(form);

    form[1].addEventListener('submit', getUserInput);
}

function getUserInput(event) {
    event.preventDefault();
    console.log('ok');
    
    const userInput = event.target; 
    console.log(userInput);

    const arr = Array.from(userInput.querySelectorAll('input'));
    

    const newArr = arr.filter(function(el) {
        if(el.getAttribute('name') && el.value) {
    console.log(el);
    return el;
        }
    }).map(function(el) {
        return el.value;
    })
    console.log(newArr); // zamienić na liczby

    // newArr.forEach(function (el) {
    //     return el.value;
    // });


    // const numberOfChild = parseInt(userInput[1]);
    // const numberOfAdults = parseInt(userInput[0]);
    // console.log('number adults => ', numberOfAdults, 'number childs => ', numberOfChild)

    // // WPISANA PRZEZ UŻYTKOWNIKA ilość dzieci
    // userInputList[1].value;
    // // wpisana ilość rodziców
    // userInputList[0].value;
}

//funkcja nie została wywolana
function getSum(priceAdult, numberOfAdults, priceChild, numberOfChild) {
    const sum = (priceAdult * numberOfAdults) + (priceChild * numberOfChild);
    return sum;
}

//funkcja nie została wywolana
function createSummary(trip, tripName, numberOfAdults, numberOfChild, priceAdult, priceChild) {
    // const basket = [];
    // basket.push(trip);
    const summaryPanel = document.querySelector('.panel__summary');
    const summaryElement = document.querySelector('.summary__item--prototype');
    summaryElement.style.display = 'none';
    
    const newSummaryElement = summaryPanel.cloneNode(true);
    newSummaryElement.style.display = 'block';
    
    summaryPanel.appendChild(newSummaryElement);
    console.log(summaryPanel);

    //DODAJĘ WYCIECZKI DO SUMMARY
    // DODAJĘ TYTUŁ
    const summaryName = newSummaryElement.querySelector('.summary__name');
    summaryName.innerText = tripName;

    //DODAJĘ SUMĘ DO SUMMARY
    const totalPrice = newSummaryElement.querySelector('.summary__total-price');
    totalPrice.innerText = sum + 'PLN'; // czy to się połączy na np. 199PLN?

    // DODAJĘ ILOŚĆ DOROSŁYCH I DZIECI
    const summaryPrice = newSummaryElement.querySelector('.summary__prices');
    summaryPrice.innerText = 'dorośli: ' + numberOfAdults + ' x ' + priceAdult + ' PLN ' + ' , dzieci: ' + numberOfChild + ' x ' + priceChild + 'PLN';

    //DODAJĘ SUMĘ DO PANEL ORDER
    const panelOrder = document.querySelector('.panel__order');
    const orderTotalPriceValue = panelOrder.querySelector('.order__total-price-value');
    orderTotalPriceValue.innerText = totalPrice + 'PLN';
}