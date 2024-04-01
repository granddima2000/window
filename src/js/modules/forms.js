import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    // Оповещаем пользователя
    const message = { 
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };
    
    //перебираем каждый инпут с аттрибутом name=upload
    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.'); // массив с 2 элементами
            arr[0].length > 5 ? dots = '...' : dots = '.'; // Если имя файла больше 5 элементов
            const name = arr[0].substring(0, 5) + dots + arr[1]; // Обрезаем и помещаем .../. jpg
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage); // Доп блок помещаем в родителя формы

            item.classList.add('animated', 'fadeOutUp'); // animateCSS
            setTimeout(() => {
                item.style.display = 'none';
            }, 400); // скроем прозрачную форму через 4 мс

            let statusImg = document.createElement('img'); //img ктр будет всплывает после отправки формы
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div'); //добавим к изобр. текстовое сообщение
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item); // FormData это объект, ктр соберет все содержание в инпутах и помещает в перемен formData
            // FormData это объект, ктр соберет все содержание в инпутах и поместить в перемен formData
            let api; // динамический путь куда все будет отпр
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question; // Метод попробует найти опр.блок по опр.селектору
            console.log(api);

            postData(api, formData) // отправляем запрос на сервер
            .then(res => {
                console.log(res);
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success;
            })
            .catch(() => {
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent = message.failure;
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                }, 5000);
            });
        });
    });
};

export default forms;
