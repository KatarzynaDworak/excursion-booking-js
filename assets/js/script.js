// BŁĘDY:
// 1. BŁĄD pobiera się 2x Ogrodzieniec, a nie pobiera się Ojców
// 2. BŁĄD funkcja getSum() (wpisałam tymczasowo sum = 20 aby pracować dalej, ale funkcja nie przelicza, 
// poniewaz potrzebuje danych z getUserInput & getPrice, a uruchamiając je wyskakują błędy z preventDefault)
// 3. gdzie wywołać funkcję createSummary? Potrzebuję pobrać nazwę, pobrać ilość osób, policzyć sumę 
// i wykorzystać ją w summary. To wszystko się dzieję po evencie 'submit' 'dodaj do zamówienia'

const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

// console.log( txt.split(/[\r\n]+/gm) );

const inputElement = document.querySelector('input[type="file"]');
// console.log(inputElement);

const ulElement = document.querySelector('.excursions');
// console.log(ulElement);

// POBIERAMY I WCZYTUJEMY PLIK - DZIAŁA
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
                
                copyPrototype(excursionObj);
            })
        } 
    }
}

const liElement = document.querySelector('li');
liElement.style.display = 'none';

//TWORZYMY KOPIĘ PROTOTYPU WYCIECZKI I DODAJEMY DO NIEJ WCZYTANE WYCIECZKI
function copyPrototype(obj) { 
    // console.log(obj);

    const newLi = document.querySelector('.excursions__item--prototype').cloneNode(true);
    // console.log(newLi);
    newLi.style.display = 'block';
    newLi.classList.add('excursions__item--trip');
    
    // POBIERAMY CENY
    getPrice(newLi);
    
    ulElement.appendChild(newLi);
    
    //2 OBIEKTY - OBIE WYCIECZKI - 2 RAMKI
    const LiList = document.querySelectorAll('.excursions__item--trip');
    // console.log('LiList => ', LiList);
    
    //NASŁUCHIWANIE NA FORM
    const forms = Array.from(document.querySelectorAll('.excursions__item--trip form'));
    // console.log(forms); // 
    
    forms.map(function(form) {
        form.addEventListener('submit', getUserInput);
        form.addEventListener('submit', getName);
        // form.addEventListener('submit', getSum);
        // form.addEventListener('submit', createSummary);
    })
}

//funkcja POBIERAMY WPISANE PRZEZ UŻYTKOWNIKA ILOŚCI RODZICÓW I DZIECI
function getUserInput(event) {
    event.preventDefault();

    const userInput = event.target; 
    // console.log(userInput); 

    const arr = Array.from(userInput.querySelectorAll('input'));
    
    const newArr = arr.filter(function(el) {
        if(el.getAttribute('name') && el.value) {
    // console.log(el);
    return el; 
        }
    }).map(function(el) {
        return parseInt(el.value);
    })
    // console.log(newArr); // 1 2

    // WPISANA PRZEZ UŻYTKOWNIKA ilość dzieci
    const numberOfChild = newArr[1]; //1
    // wpisana ilość rodziców
    const numberOfAdults = newArr[0]; //2

    console.log('number adults => ', numberOfAdults, 'number childs => ', numberOfChild) // 1 2
    getSum(event);
    
    return [numberOfAdults, numberOfChild];
}

// funkcja POBIERAMY NAZWĘ WYBRANEJ WYCIECZKI
function getName(event) {
    event.preventDefault();
    
    let tripName = event.target.previousElementSibling.querySelector('h2').innerText; 
    // console.log( 'nazwa=> ', tripName); 
    
    return tripName;
}

// funkcja POBIERAMY CENĘ WYBRANEJ WYCIECZKI
function getPrice(newLi) {
    const priceElements = newLi.querySelectorAll('.excursions__price');
    // console.log('priceElements => ', priceElements);
    // CENA RODZIC 
    const priceAdultEl = priceElements[0]; 
    const priceAdult = parseInt(priceAdultEl.innerText); //99 number
    // console.log(priceAdult);
    // CENA DZIECKO
    const priceChild = parseInt(priceElements[1].innerText); // 50 number
    console.log('priceAdult => ', priceAdult, 'priceChild => ', priceChild);
    
    return [priceAdult, priceChild];
}

// funkcja OBLICZAMY SUMĘ KOSZTOW DLA WYBRANEJ WYCIECZKI - BŁĄD
function getSum() { // wpisać event
    // event.preventDefault();
    // let [numberOfAdults, numberOfChild] = getUserInput(event);
    // let [priceAdult, priceChild] = getPrice(event);
    // const sum = (priceAdult * numberOfAdults) + (priceChild * numberOfChild);
    const sum = 20;
    console.log(sum);
    return sum;
}

//funkcja TWORZYMY NOWE SUMMARY
function createSummary(event) {
    // getUserInput(event);
    // getName(event);

    copySummary();
    let sum = getSum();
    let tripName = getName();
    addTrips(tripName);
    addSum(sum);
    addValuesToSummary()
    addSumFinalization();
}

// funkcja TWORZYMY KOPIĘ PROTOTYPU SUMMARY
function copySummary() {
    const summaryPanel = document.querySelector('.panel__summary');
    const summaryElement = document.querySelector('.summary__item--prototype');
    summaryElement.style.display = 'none';
    
    const newSummaryElement = summaryPanel.cloneNode(true);
    newSummaryElement.style.display = 'block';
    
    summaryPanel.appendChild(newSummaryElement);
    console.log(summaryPanel);
}

//funkcja DODAJEMY WYCIECZKI DO SUMMARY
function addTrips(tripName) {
    // DODAJĘ TYTUŁ
    const summaryName = newSummaryElement.querySelector('.summary__name');
    summaryName.innerText = tripName;
}

//funkcja DODAJEMY SUMĘ DO SUMMARY
function addSum(sum) {
    const totalPrice = newSummaryElement.querySelector('.summary__total-price');
    totalPrice.innerText = sum + 'PLN'; // czy to się połączy na np. 199PLN?
    return totalPrice;
}

// funkcja DODAJEMY SUMĘ DO REALIZACJI ZAMOWIENIA
function addSumFinalization() {
    let totalPrice = addSum();
    //DODAJĘ SUMĘ DO PANEL ORDER
    const panelOrder = document.querySelector('.panel__order');
    const orderTotalPriceValue = panelOrder.querySelector('.order__total-price-value');
    orderTotalPriceValue.innerText = totalPrice + 'PLN';
}


// NIE JEST POTRZEBNA, BO TWORZYMY KOPIĘ
// function addValuesToSummary(numberOfAdults, priceAdult, numberOfChild, priceChild) {
//     // TWORZĘ SUMMARY
//     const summaryPrice = newSummaryElement.querySelector('.summary__prices');
//     summaryPrice.innerText = 'dorośli: ' + numberOfAdults + ' x ' + priceAdult + ' PLN ' + ' , dzieci: ' + numberOfChild + ' x ' + priceChild + 'PLN';
// }