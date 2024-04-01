const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

// console.log( txt.split(/[\r\n]+/gm) );

const inputElement = document.querySelector('input[type="file"]');

const ulElement = document.querySelector('.excursions');

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

            const offers = contents.split(/[\r\n]+/gm);

            offers.forEach(function(offer) {
                const excursion = offer.split('\",\"'); 

                const id = excursion[0]; 
                const name = excursion[1];
                const description = excursion[2];
                const priceAdult = excursion[3];
                const priceChild = excursion[4];

                const excursionObj = {id, name, description, priceAdult, priceChild};                 
                copyPrototype(excursionObj);
            })
        } 
    }
}

const liElement = document.querySelector('li');
liElement.style.display = 'none';

function copyPrototype(obj) { 

    const newLi = document.querySelector('.excursions__item--prototype').cloneNode(true);

    newLi.style.display = 'block';
    newLi.classList.add('excursions__item--trip');
    
    ulElement.appendChild(newLi);
    
    const LiList = document.querySelectorAll('.excursions__item--trip');
    
    const forms = Array.from(document.querySelectorAll('.excursions__item--trip form'));
    
    forms.map(function(form) {
        form.addEventListener('submit', handleSubmit);
    })
}

function handleSubmit(event) {
    event.preventDefault();
    console.log(event, event.target);

    const formElement = event.target;
    const adult = parseInt(formElement.elements[0].value);
    const child = parseInt(formElement.elements[1].value);

    const prices = formElement.querySelectorAll('.excursions__price');
    const adultPrice = parseInt(prices[0].innerText);
    const childPrice = parseInt(prices[1].innerText);

    const sum = (adult * adultPrice) + (child * childPrice);

    const tripName = event.target.previousElementSibling.querySelector('h2').innerText; 
    console.log( 'nazwa=> ', tripName); 

    createSummaryItem(adult, child, adultPrice, childPrice, tripName, sum);

    const orderTotalPrice = document.querySelector('.order__total-price');
    const finalChart = orderTotalPrice.querySelector('.order__total-price-value');
    finalChart.style.display = 'none';
    
    const newFinalChart = finalChart.cloneNode(true); // BŁĄD: DODAJĄ SIĘ KLONY KAZDEJ WYCIECZKI
    newFinalChart.innerText = '';
    newFinalChart.innerText += sum + 'PLN'; // BŁĄD: KADA SUMA WYCIECZKI DODAJE SIĘ W OSOBNYM KLONIE - BRAK CAŁKOWITEJ SUMY
    orderTotalPrice.appendChild(newFinalChart);
    newFinalChart.style.display = 'block';

    const totalPrice = document.querySelector('.order__total-price-value').innerText += sum;
    // newFinalChart.querySelector('.order__total-price-value').innerText = sum + 'PLN';
}

function createSummaryItem(adult, child, adultPrice, childPrice, tripName, sum) {
    const summaryPanel = document.querySelector('.panel__summary');
    const summaryElement = document.querySelector('.summary__item--prototype');
    summaryElement.style.display = 'none';
    
    const newSummaryElement = summaryElement.cloneNode(true);
    newSummaryElement.style.display = 'block';
    newSummaryElement.querySelector('.summary__prices').innerText = 'dorośli: ' + adult +' x ' + adultPrice + 'PLN,' + 'dzieci: ' + child + ' x ' + childPrice + 'PLN';

    newSummaryElement.querySelector('.summary__name').innerText = tripName;
    
    //wpisuję sumę do realizacji zamówienia - nie usuwa się obecna kwota 199PLN, pozostałe kwoty dodają się jak stringi
    const totalPrice = newSummaryElement.querySelector('.summary__total-price').innerText = sum;

    //wyliczamy sumę z wycieczek - BłĄD
    // const orderTotalPrice = sum;
    // document.querySelector('.order__total-price-value').innerText = orderTotalPrice + 'PLN';
    // const orderTotalPrice = document.querySelector('.order__total-price-value').innerText = sum + 'PLN';

    summaryPanel.appendChild(newSummaryElement);
    console.log(summaryPanel);
}