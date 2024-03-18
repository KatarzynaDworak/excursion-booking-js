// KOSNULTACJE
//1 podział wiersza - nie wiem czy dobrze, bo w konsoli nie widać
//2 dodanie wycieczek do newLi + dataset + display: none

const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

console.log( txt.split(/[\r\n]+/gm) );

//1. obsługa wybierania pliku przez użytkownika
//2. pobranie zawartości pliku

const inputElement = document.querySelector('input[type="file"]');
console.log(inputElement);

const ulElement = document.querySelector('.excursions');
console.log(ulElement);

// inputElement.addEventListener('change', handleFile);

ulElement.addEventListener('change', handleFile);
function handleFile(event) {
    const file = event.target.files[0];
    
    if(file && file.type.includes('file')) {
        const reader = new FileReader();
        
        // podział tej zawartości na wiersze (wycieczki)
        reader.onload = function(readerEvent) {
            const contents = readerEvent.target.result;
            console.log('contents', readerEvent.target.result); // nic się nie wyświetla
            const offers = contents.split(/[\r\n]+/gm);
            console.log('offers', offers); // nic się nie wyświetla
            //PROBLEM nie wiem czy są offers, bo się nie wyświetlają

            // podział wiersza na poszczególne elementy  (id, nazwa itp.) KOLUMNY
            const id = offers.indexOf['id'];
            const name = offers.indexOf['name'];
            const description = offers.indexOf['description??'];
            const priceAdult = offers.indexOf['??'];
            const priceChild = offers.indexOf['??'];

        }
        
    }
}

// utworzenie odpowiednich elementów HTML 
// wypełnienie ich danymi 


// dodanie ich do drzewa DOM
const newLi = document.querySelector('.excursions__item--prototype').cloneNode(true);
console.log(prototype);

ulElement.appendChild(newLi);
ulElement.appendChild(newLi);
ulElement.appendChild(newLi);
ulElement.appendChild(newLi);
ulElement.appendChild(newLi);

