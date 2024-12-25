function getChartTypes() {
    const uppercase = document.querySelector('#includeUppercase').checked;
    const lowercase = document.querySelector('#includeLowercase').checked;
    const number = document.querySelector('#includeNumber').checked;
    const specialCharacter = document.querySelector('#includeSpecialCharacter').checked;

    const charTypes = [];

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }

    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz')
    }

    if (number) {
        charTypes.push('0123456789')
    }

    if (specialCharacter) {
        charTypes.push('!@#$%"&*+_-/|\\?:;><^~´`{}[]()')
    }

    return charTypes;
};

function getPasswordSize() {
    const size = document.querySelector('#size').value;
    if(isNaN(size) || size < 4 || size > 70){
        massage('Tamanho inválido, digite um número entre 4 e 70!', '#dc2626');
        return null;
    }

    return size;
};

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);

    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
};

function generatePassword(size, charTypes) {
    let passwordGenerated = '';

    while (passwordGenerated.length < size){
        passwordGenerated += randomCharType(charTypes)
    }

    return passwordGenerated;
};

function massage(text, background) {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: background,
            boxShadow: 'none'
        }
    }).showToast();
};

document.querySelector('#generate').addEventListener('click', function() {
    const size = getPasswordSize();
    const charTypes = getChartTypes();

    if(!size) {
        return;
    }

    if(!charTypes.length) {
        massage('Selecione pelo menos UM tipo de caractere!', '#dc2626');
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector('#passwordContainer').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

document.querySelector('#copy').addEventListener('click', function() {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    massage('Senha copiada com sucesso!', '#84cc16');
});
