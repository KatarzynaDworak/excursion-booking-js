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
// liElement.style.display = 'none';

function createPrototype(obj) {

    const newLi = document.querySelector('.excursions__item--prototype').cloneNode(true);
    console.log(newLi); //2 newLi
    
    const newTitle = newLi.querySelector('.excursions__title');
    newTitle.innerText = obj['name'];
    newTitle.dataset.name = obj.name; //ok atrybut data-name = nazwa wycieczki dodany
    
    const newDescription = newLi.querySelector('.excursions__description');
    newDescription.innerText = obj['description']; //DZIAŁA
    
    ulElement.appendChild(newLi);
    
    // const newPriceAdult = newLi.querySelector('.'); //KONSULTACJE
    // newPriceAdult.innerText = obj['priceAdult'];
    
    // const newPriceChild = newLi.querySelector('.'); //KONSULTACJE
    // newPriceChild.innerText = obj['priceChild'];
    
    const submitBtn = document.querySelector('li > form > div > input');
    console.log(submitBtn); // KONSULTACJE wyszukuje button w LiElement 
    // KONSULTACJE - jak dostać się do buttonu w nowychLi, aby dodać im dataset?
    // np. mamy data-name="Ogrodzieniec"
    // const submitBtn = document.querySelector([data-name="name"])??
    // if(dataset === name) {

    }
    
    // submitBtn.dataset.submit = obj['??'];
// }

//KOSZYK I DODAWANIE DO NIEGO WYCIECZEK
//1. po kliknięciu w 'dodaj do zamówienia': 

//
//walidujemy: czy wpisano liczbę od 0 w górę
//Jeśli tak to: 
// 2. dodajemy do listy w koszyku [name + suma ceny + przycisk 'X', child ilość + cena, adult ilość + cena]
// 3. powiększamy sumę w KOSZYKU
// 4. przed wysłaniem zamowienia sprawdzamy, czy 'inię + nazwisko + email' nie są puste + email ma @

// function addDataset() {


// }

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