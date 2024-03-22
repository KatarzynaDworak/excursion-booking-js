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
    const newElements = document.querySelectorAll('.excursions__price');
    // console.log('newElements => ', newElements);
    // CENA RODZIC 
    const newPriceAdult = newElements[2].innerText;
    // CENA DZIECKO
    const newPriceChild = newElements[3].innerText; 
    // console.log('FirstAdult => ', newPriceAdult, 'FirstChild => ', newPriceChild);
    
    // 2 PRZYCISKI - DODAJ DO ZAMÓWIENIA
    const submitBtn = newLi.querySelector('.excursions__field-input--submit');
    // console.log('submitBtn', submitBtn);

    // ROZRÓŻNIAMY PRZYCISKI - DODAJ DO ZAMÓWIENIA - DLA WYCIECZEK Z PLIKU
    const trips = [];
    trips.push(excursionName);
    // console.log(trips); // 2 TABLICE KAZDA ZAWIERA 1 POZYCJĘ NAZWĘ WYCIECZKI
    //dla rozróżnienia wycieczek zostały dodane atrybuty data-name='nazwa wycieczki'
    submitBtn.setAttribute('data-name', trips[0]);
    // console.log(submitBtn);
    
    //nasłuchiwanie na formularz 'dodaj do zamówienia'
    //formularz 1
    const submitFormName1 = newLi.querySelector('input[data-name="Ogrodzieniec"]');
    console.log('przycisk dodaj do zamówienia Ogrodzieniec => ', submitFormName1);
    //formularz 2
    const submitFormName2 = newLi.querySelector('input[data-name="Ojców"]');
    console.log('przycisk dodaj do zamówienia Ojców => ', submitFormName1);
    
    if(submitFormName1) {
        submitFormName1.addEventListener('submit', addToSummary);
    } 
    if(submitFormName2) {
        submitFormName2.addEventListener('submit', addToSummary);
    }
   
    // // WPISANA PRZEZ UŻYTKOWNIKA ilość dzieci
    // userInputList[1].value;
    // // wpisana ilość rodziców
    // userInputList[0].value;
    


    //PROTOTYP SUMMARY
    const summaryElement = document.querySelector('.summary__item--prototype').cloneNode(true);
    // console.log(summaryElement);
    
    //KOLEJNE ETAPY + POTRZEBNE DANE:

    // NAZWA WYCIECZKI DO SUMMARY
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
    // console.log(userInputList);
    // submit
    const submitToAdd = userInputList[2];

    // wyliczamy sumę = ilość dorosłych x cena dorosły, ilość dzieci [nasłuchiwanie na submit + to co wpisał uzytkownik e.target.value] x cena dziecko newElements[1]

    const addToChartBtn = document.querySelectorAll('.excursions__field-input');
    // console.log(addToChartBtn);
}

function addToSummary(event, priceAdult, priceChild) {
    event.preventDefault();
    const numberOfAdults = event.target.value;
    console.log(event.target.value);
    const numberOfChild = event.target.value;
    console.log(numberOfAdults);
    //wylicz sumę
    const sum = (priceAdult * numberOfAdults) + (priceChild * numberOfChild);
    //dodaj pozycję do koszyka

    // console.log('tu ma być funkcja, która dodaje wycieczkę do koszyka')
}


function createBasket(obj) {

    const basket = [];
    basket.push(obj);

    const excursionAddBtn = document.querySelector('.excursions__field-input--submit') 
    // console.log(excursionAddBtn); //btn liElement

}

function placeOrder() {
    const submitBtn = document.querySelector('.order__field-submit'); //ok
    console.log(submitBtn);

    submitBtn.addEventListener('submit', function() {
        alert('Dziękujemy za złożenie zamówienia. Potwierdzenie zamówienia zostanie wysłanie mailem.')
    })

}