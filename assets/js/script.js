// KONSULTACJE

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
                createBasket(excursionObj) // 2 tablice, w kazdej 1 obiekt
                placeOrder();
            })
        } 
    }
}

// KONSULTACJE: jak UKRYĆ pierwsze <li>?
const liElement = document.querySelector('li');
liElement.style.display = 'none';

function createPrototype(obj) {

    const newLi = document.querySelector('.excursions__item--prototype').cloneNode(true);
    newLi.style.display = '';
    // console.log(newLi); //2 newLi
    
    const newTitle = newLi.querySelector('.excursions__title');
    newTitle.innerText = obj['name'];
    newTitle.dataset.name = obj.name; //ok atrybut data-name = nazwa wycieczki dodany
    const excursionName = obj.name; //NAME
    
    const newDescription = newLi.querySelector('.excursions__description');
    newDescription.innerText = obj['description']; //DZIAŁA
    
    ulElement.appendChild(newLi);
    
    const newElements = document.querySelectorAll('.excursions__price');
    // console.log(newElements);

    const newPriceAdult = newElements[0];
    
    const newPriceChild = newElements[1]; 

    // console.log('adult =>', newPriceAdult, 'child=>', newPriceChild);
    
    const submitBtn = document.querySelector('li > form > div > input');
    // console.log(submitBtn); 

    //ETAPY:
    // 1. co potrzebne? 
    const summaryElement = document.querySelector('.summary__item--prototype').cloneNode(true);
    console.log(summaryElement);
    // nazwa wycieczki
    const summaryName = summaryElement.querySelector('.summary__name');
    // console.log(summaryName);
    //dodaję nazwę wycieczki wybranej w klonie w summary
    summaryName.innerText = excursionName;
    // dodaję ilości osób w wybranej wycieczce w klonie w summary
    const summaryPricePerPerson = summaryElement.querySelector('.summary__prices');
    // console.log(summaryPricePerPerson);
    //pobieram ilość osób wpisanych w formularzu
    //pobranie userInput z obu inputów
    const userInputList = newLi.querySelectorAll('.excursions__field-input');
    console.log(userInputList);
    // wpisana ilość dzieci
    userInputList[1].value;
    // wpisana ilość rodziców
    userInputList[0].value;
    // submit
    const submitToAdd = userInputList[2];
    //nasłuchiwanie na formularz 'dodaj do zamówienia'
    submitToAdd.addEventListener('submit', addToSummary);

    // wyliczamy sumę = ilość dorosłych x cena dorosły, ilość dzieci [nasłuchiwanie na submit + to co wpisał uzytkownik e.target.value] x cena dziecko newElements[1]

    const addToChartBtn = document.querySelectorAll('.excursions__field-input');
    console.log(addToChartBtn);
}

function addToSummary(event) {
    const numberOfPersonsList = event.target.value;
    console.log(numberOfPersonsList);
    if('kliknął w 1') {
        //wylicz sumę
        //dodaj pozycję do koszyka
    } else if('kliknął w 2') {
        //wylicz sumę
        //dodaj pozycję do koszyka
    }
    console.log('tu ma być funkcja, która dodaje wycieczkę do koszyka')
}


function createBasket(obj) {

    const basket = [];
    basket.push(obj);

    const excursionAddBtn = document.querySelector('.excursions__field-input--submit') 
    console.log(excursionAddBtn); //btn liElement

}

function placeOrder() {
    const submitBtn = document.querySelector('.order__field-submit'); //ok
    console.log(submitBtn);

    submitBtn.addEventListener('submit', function() {
        alert('Dziękujemy za złożenie zamówienia. Potwierdzenie zamówienia zostanie wysłanie mailem.')
    })

}