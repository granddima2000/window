const checkTextInputs = (selector) => { //заполнение имени и комм только на рус яз
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(e) { // Если пользователь 
            if (e.key.match(/[^а-яё 0-9]/ig)) { // e.key значение клавиши на которую нажал
                e.preventDefault();
            } 
        });
        input.addEventListener('input', () => { // Если ползователь ввел латиницу с помощью t9
            if (input.value.match(/[a-z]/ig)) {
                input.value = '';
            } 
        });
    });
};

export default checkTextInputs;