import { postData } from "../services/requests";

const drop = () => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave -- Объект за пределами dropArea
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - когда пользователь отпустил мышку и объект отправлен в dropArea

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefault, false);
        });
    }); // массив событий

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation(); //отмена всплытие
    }
     //доб.идентификатор, чтобы польз. видел над какой областью перетаскивать
    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow"; //item - эл ктр необходимо подсветить
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)"; //closest - ищет блок выше по иерархии 

    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";            
        if(item.closest('.calc_form')){                                                 //если у формы есть этот родитель
            item.closest('.file_upload').style.backgroundColor = "#fff";               //то фон становится белым
        }else{
           item.closest('.file_upload').style.backgroundColor = "#ededed";              //если нет, то фон серый (как в мод окне)
        }

    }

    ['dragenter', 'dragover'].forEach(eventName => { //эти 2 события вызывают подсветку, далее на каждый input вешаем событие и подставляем highlight
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    }); // массив событий

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    }); // массив событий

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {    //когда польз. отпускает файл, 
            input.files = e.dataTransfer.files;    //то этот файл помещается в input.files (dataTransfer - тот объект с файлами, ктр перетаскивается из файловой структуры)
            let dots;                                //будет содержать ... или .
            const arr = input.files[0].name.split('.'); //разбивает назв 1-ого файла до . 
            //название, ктр отражается вместо "Файл не выбран" 
            arr[0].length > 5 ? dots = '...' : dots = '.'; // Если имя файла больше 5 элементов
            const name = arr[0].substring(0, 5) + dots + arr[1]; // Обрезаем и помещаем .../. jpg
            input.previousElementSibling.textContent = name; //в предыд.эл (Файл не выбран) помещаем переменую name

            // postData для блока с загрузкой фото, но без кнопки отправить "Отправить"
            if(input.closest('.mail')){
                let formData = new FormData();
                input.files.forEach(file =>{
                    formData.append('image', file);
                    postData('assets/server.php', formData)
                     .then(res =>console.log(res))
                     .catch (err =>console.log(err)); 
                });

            }
        });
    });
};

export default drop;