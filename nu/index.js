const create = document.querySelector('#create');
const clearall = document.querySelector('#clearall');
const clear = document.querySelector('#clear');
const search = document.querySelector('#search');
const favorites = document.querySelector('#favorites');

const form = document.querySelector('form');
const submit = document.querySelector('#submit');

const name1 = document.querySelector('#name');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const home = document.querySelector('#home');

const addressdiv = document.querySelector('#addressdiv');
const favdiv = document.querySelector('#favdiv');

let parsedObj = JSON.parse(localStorage.getItem('address')) || [];

window.addEventListener('load', (event) => {
    event.preventDefault();
    form.style.display = "none";
})

create.addEventListener('click', (event) => {
    event.preventDefault();
    form.style.display = "block";
})

clearall.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    addressdiv.remove();
    favdiv.remove();
})

submit.addEventListener('click', (event) => {
    event.preventDefault();

    let obj = {
        name: name1.value,
        phone: phone.value,
        email: email.value,
        home: home.value,
    }

    parsedObj.push(obj);
 
    localStorage.setItem('address', JSON.stringify(parsedObj));
    
    parsedObj = JSON.parse(localStorage.getItem('address'));
    addressdiv.innerHTML = '';

    newAddress(parsedObj);
})

function newAddress (array) {
    array.forEach((adressBook, index) => {
        const div = document.createElement('div');
        div.setAttribute('id', index);
        const btndiv = document.createElement('div');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const p4 = document.createElement('p');
        const delbtn = document.createElement('button');

        delbtn.addEventListener('click', (event) => {
            event.preventDefault();
            deletedElementId = event.target.parentElement.id;
            event.target.parentElement.remove();
            const ppp = array.splice(deletedElementId, 1);
            localStorage.setItem('address', JSON.stringify(ppp));
        })

        const favoritebtn = document.createElement('button');
        const selectbtn = document.createElement('button');
        const editbtn = document.createElement('button');

        p1.textContent = `Name: ${adressBook.name}`;
        p2.textContent = `Phone: ${adressBook.phone}`;
        p3.textContent = `Email: ${adressBook.email}`;
        p4.textContent = `Home Address: ${adressBook.home}`;
        delbtn.textContent = 'Del';
        favoritebtn.textContent = 'Add to Favorites';
        selectbtn.textContent = 'Select';
        editbtn.textContent = 'Edit';

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        btndiv.appendChild(delbtn);
        btndiv.appendChild(favoritebtn);
        btndiv.appendChild(selectbtn);
        btndiv.appendChild(editbtn);

        btndiv.style.display = 'flex';
        btndiv.style.flexDirection = "row";

        div.style.backgroundColor = "green";

        favoritebtn.addEventListener('click', (event) => {
            event.preventDefault();

            const div = document.createElement('div');
            div.style.backgroundColor = "blue";
            
            const pName = document.createElement('p');
            const pPhone = document.createElement('p');
            const pMail = document.createElement('p');
            const pHome = document.createElement('p');
            const rmvbtn = document.createElement('button');
        
            pName.textContent = `Name: ${adressBook.value}`;
            pPhone.textContent = `Phone: ${adressBook.value}`;
            pMail.textContent = `Email: ${adressBook.value}`;
            pHome.textContent = `Home Address: ${adressBook.value}`;
            rmvbtn.textContent = 'Remove from favorites';
        
            div.appendChild(pName);
            div.appendChild(pPhone);
            div.appendChild(pMail);
            div.appendChild(pHome);
            div.appendChild(rmvbtn);

        
            favdiv.appendChild(div);
            
            selectedAddress = event.target.parentElement;
           
        })

        addressdiv.appendChild(div);
        addressdiv.appendChild(btndiv);
    })  
}

function createFav () {

}