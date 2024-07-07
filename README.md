# Thanks for viewing my Project ✨

![ a main page screenshot](./assets/img/scree.png)
<br />

## :star: Demonstration of the Project: ([Excursion Booking JS]((https://katarzynadworak.github.io/excursion-booking-js/)))
<br />

## Main goal of my work was to:

**1. CSV File Parsing**: implement functionality to read and parse CSV files to dynamically generate content on a web page.
Dynamic Content Generation:

**2. Automatically create and display excursion details** from parsed data, enhancing user experience with dynamic content rendering.

**3. Interactive Booking System**: develop an interactive booking form that allows users to select excursions, input the number of participants, and view a summary of their selections.

**4. Real-Time Price Calculation**: calculate and display the total price of selected excursions in real-time, ensuring users have clear and accurate pricing information.

**5 Form Validation and Order Processing**: implement form validation to ensure required fields are completed correctly and provide a confirmation message upon successful submission of the order.

<br />

## Solutions provided in the project
**1. CSV File Parsing and Dynamic Content Generation** 
The project parses a CSV file and dynamically generates a list of excursions:

            const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec...","99PLN","50PLN"
            "2","Ojców","wieś w województwie małopolskim...","40PLN","15PLN"`;
            
            // Function to handle file input
            const inputElement = document.querySelector('input[type="file"]');
            inputElement.addEventListener('change', handleFile);
            
            function handleFile(event) {
                const file = event.target.files[0];
                if (file && file.type === 'text/csv') {
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = function(readerEvent) {
                        const contents = readerEvent.target.result;
                        const offers = contents.split(/[\r\n]+/gm);
                        offers.forEach(function(offer) {
                            const excursion = offer.split('\",\"'); 
                            const excursionObj = {
                                id: excursion[0], 
                                name: excursion[1], 
                                description: excursion[2], 
                                priceAdult: excursion[3], 
                                priceChild: excursion[4]
                            };                 
                            copyPrototype(excursionObj);
                        });
                    };
                }
            }
            
            // Function to create and append excursion elements
            function copyPrototype(obj) { 
                const newLi = document.querySelector('.excursions__item--prototype').cloneNode(true);
                newLi.style.display = 'block';
                newLi.classList.add('excursions__item--trip');
            
                const title = newLi.querySelector('.excursions__title');
                const description = newLi.querySelector('.excursions__description');
                const priceAdult = newLi.querySelector('.excursions__price');
                title.innerText = obj.name;
                description.innerText = obj.description;
                priceAdult.innerText = obj.priceAdult;
            
                const ulElement = document.querySelector('.excursions');
                ulElement.appendChild(newLi);
            
                const forms = Array.from(document.querySelectorAll('.excursions__item--trip form'));
                forms.map(function(form) {
                    form.addEventListener('submit', handleSubmit);
                });
            }
**2. Interactive Booking System and Real-Time Price Calculation**
Users can select excursions and the total price is calculated in real-time:

            let totalSum = 0;
            
            function calculateTotalPrice() {
                const totalElement = document.querySelector('.order__total-price-value');
                totalElement.innerText = totalSum + 'PLN';
            }
            
            function handleSubmit(event) {
                event.preventDefault();
                const formElement = event.target;
                const adult = parseInt(formElement.elements[0].value);
                const child = parseInt(formElement.elements[1].value);
            
                const prices = formElement.querySelectorAll('.excursions__price');
                const adultPrice = parseInt(prices[0].innerText);
                const childPrice = parseInt(prices[1].innerText);
            
                const sum = (adult * adultPrice) + (child * childPrice);
                const tripName = event.target.previousElementSibling.querySelector('h2').innerText;
            
                createSummaryItem(adult, child, adultPrice, childPrice, tripName, sum);
            
                totalSum += sum;
                calculateTotalPrice();
            }
            
            function createSummaryItem(adult, child, adultPrice, childPrice, tripName, sum) {
                const summaryPanel = document.querySelector('.panel__summary');
                const summaryElement = document.querySelector('.summary__item--prototype').cloneNode(true);
                summaryElement.style.display = 'block';
            
                summaryElement.querySelector('.summary__prices').innerText = `dorośli: ${adult} x ${adultPrice}PLN, dzieci: ${child} x ${childPrice}PLN`;
                summaryElement.querySelector('.summary__name').innerText = tripName;
                summaryElement.querySelector('.summary__total-price').innerText = sum + 'PLN';
            
                const removeBtn = summaryElement.querySelector('.summary__btn-remove');
                removeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const totalPrice = parseInt(summaryElement.querySelector('.summary__total-price').innerText);
                    totalSum -= totalPrice;
                    calculateTotalPrice();
                    summaryElement.remove();
                });
            
                summaryPanel.appendChild(summaryElement);
            }
**3. Form Validation and Order Processing**
Ensuring all fields are filled correctly and providing order confirmation:

            const orderForm = document.querySelector('.order');
            orderForm.addEventListener('submit', function(event) {
                event.preventDefault();
            
                const nameInput = document.querySelector('input[name="name"]');
                const emailInput = document.querySelector('input[name="email"]');
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
            
                if (name === '' || email === '' || !email.includes('@')) {
                    const errorElement = document.createElement('p');
                    errorElement.innerText = 'Proszę uzupełnić poprawnie wymagane pola';
                    orderForm.appendChild(errorElement);
                } else {
                    const totalPrice = document.querySelector('.order__total-price-value').innerText;
                    alert(`Dziękujemy za złożenie zamówienia o wartości ${totalPrice}. Szczegóły zamówienia zostały wysłane na adres e-mail: ${email}.`);
            
                    nameInput.value = '';
                    emailInput.value = '';
            
                    const summaryList = document.querySelector('.panel__summary');
                    summaryList.innerHTML = '';
            
                    totalSum = 0;
                    calculateTotalPrice();
                }
            });

<br />
<br />

## 🛠️ Languages and Tools used: 

<img align="left" alt="JavaScript" width="50px" src="https://raw.githubusercontent.com/github/explore/379d8d145b878a5b7a1c2a5b5800b1d82d5c8c8f/topics/javascript/javascript.png" />

<img align="left" alt="HTML5" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />

<img align="left" alt="CSS3" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />

<img align="left" alt="Git" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />

<img align="left" alt="GitHub" width="50px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />

<img align="left" alt="Terminal" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" />

<img align="left" alt="Visual Studio Code" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />

<br />
<br />
<br />
<br />

## :blue_heart:  You can find me on:
<br/>

[<img align="left" alt="Katarzyna Dworak LinkedIn" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />](https://www.linkedin.com/in/katarzynadworakk/)

 
<br />

### Thanks
To my Mentor - devmentor.pl – for creating the task and for the code review.
