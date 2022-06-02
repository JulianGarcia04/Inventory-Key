//transition 
let registerKey = document.getElementById('registerKey');
let showData = document.getElementById('showData');

const showView = () => {
   if (registerKey.classList.contains('displayGrid')) {
       registerKey.classList.remove('displayGrid');
       showData.classList.add('displayFlex');
   } else if(showData.classList.contains('displayFlex')){
        showData.classList.remove('display');
        registerKey.classList.add('displayGrid');
   }    
}
//reload Data
const reloadData = () => {
    let keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key);
        let itemObject = JSON.parse(item);

        keys.push(itemObject);
    };

    return keys;
}

//RegisterKey

class keyValue {
    constructor(imgKey, key, model, price) {
        this.imgKey = imgKey;
        this.key = key;
        this.model = model;
        this.price = price;
    };
}

const keyRegister = () => {
    let Imglink = document.getElementById('keyImg').value;
    let keyImg = Imglink.substring(12);
    let key = document.getElementById('key').value;
    let model = document.getElementById('model').value;
    let price = document.getElementById('price').value;

    let newKey = new keyValue(keyImg, key, model, price);
    reloadData().push(newKey);
    localStorage.setItem(reloadData().length, JSON.stringify(newKey));

    return keyImg;
}

const Data = () => {
    let fragment1 = document.createDocumentFragment();
    for (let elemento of reloadData()) {
        let fragment2 = document.createDocumentFragment();
        let newDiv = document.createElement('div');
        let newP1 = document.createElement('p');
        let newP2 = document.createElement('p');
        let newP3 = document.createElement('p');
        let newImg = document.createElement('img');

        newImg.setAttribute('src', "img/"+elemento.imgKey);
        newImg.setAttribute('alt', 'ImgKey');
        newP1.innerHTML = elemento.key;
        newP2.innerHTML = elemento.model;
        newP3.innerHTML = elemento.price;

        fragment2.appendChild(newImg);
        fragment2.appendChild(newP1);
        fragment2.appendChild(newP2);
        fragment2.appendChild(newP3);

        newDiv.appendChild(fragment2);
        fragment1.appendChild(newDiv);
    };

    document.getElementById('showData').appendChild(fragment1);
}

document.getElementById('title').addEventListener('click', showView);
document.getElementById('btn-newKey').addEventListener('click', keyRegister);
document.addEventListener('load', reloadData());
document.addEventListener('load', Data());