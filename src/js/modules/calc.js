import { getResource } from "../services/requests";

const calc = async (size, material, options, promocode, result) => {
  const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

  let sum = 0;
  let data;
  await getResource('assets/dbCalc.json')
    .then(res => {
      data = res;
    })
    .catch(() =>{
      console.log('Ошибка');
    });

  const updateSelectOptions = (selectElement, optionsData) => {
    // let option = document.createElement('option');
    selectElement.innerHTML = optionsData.map(option => `<option value="${option.value}">${option.description}</option>`).join('');
  };

  updateSelectOptions(sizeBlock, data.sizes);
  updateSelectOptions(materialBlock, data.materials);
  updateSelectOptions(optionsBlock, data.options);

  const calcFunc = () => {
    sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
    console.log(+sizeBlock.value)
    if(sizeBlock.value == '' || materialBlock.value == '') {
      resultBlock.textContent = 'Необходимо выбрать размер картины и материал картины';
    } else if(promocodeBlock.value === 'IWANTPOPART') {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else if (sum != 0) {
      resultBlock.textContent = sum;
    }
  };

  sizeBlock.addEventListener('change', calcFunc);
  materialBlock.addEventListener('change', calcFunc);
  optionsBlock.addEventListener('change', calcFunc);
  promocodeBlock.addEventListener('input', calcFunc);
};
export default calc;
