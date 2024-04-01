const mask = (selector) => {

    let setCursorPosition = (pos, elem) =>{
        elem.focus();

        if(elem.setSelectorRange){
            elem.setSelectorRange(pos, pos);
        }else if(elem.createTextRange){
            let range = elem.createTextRange();

            range.collapse(true);                        //будет объединять гранцы диапозона
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();                             //выделенный кусок сформирован.moveStart и moveEnd
        }

    };
        
    function createMask (event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''), //все не цифры в матрице наменяет на "". Статичное
            val = this.value.replace(/\D/g, ''); //все не цифры внесенные пользователем наменяет на "". Динамичное, что ввел пользователь

        if (def.length >= val.length) { //если кол-во цифр в матрице >=  кол-ву цифр внесенных польз.
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) { //пройдемся по всем симв эл и на каждого сработает функ
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a; //диапозон цифры,поиск каждого симв. и i < кол-ва цифр внесен.польз, то(?) будет сл цифра, если(:) i >= кол-ва цифр внесен.польз,то ""  
        });

        if (event.type === 'blur') { //если польз перестал вносить в инпут
            if (this.value.length == 2) {         //если кол-во цифр внесен.польз =2
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this); //кол-во симв внесен.в инпут, ссылка на эл ктр в работе сейчас
        }

    }

    let inputs = document.querySelectorAll(selector);   //на этот эл использ маску

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;
