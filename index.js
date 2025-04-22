let drinksCount = 1;
let usedNums = [1];
const addBtn = document.querySelector('.add-button');
addBtn.addEventListener('click', () => {
    addNewForm();
})

const deleteBtn = document.querySelector('.delete-form-btn');
deleteBtn.addEventListener('click', () => {
    if (drinksCount > 1) {
        const fs = deleteBtn.parentElement.parentElement;

        const match = fs.innerHTML.match(/(?<=№)\d+(?=<)/);

        const num = parseInt(match[0]);
        drinksCount--;
        usedNums = usedNums.filter(x => x != num);
        fs.remove();
    }
})

function addNewForm() {
    const newFieldSet = document.createElement('fieldset');
    newFieldSet.classList.add('beverage');
    let newNum = 1;
    drinksCount++;
    while (usedNums.includes(newNum)) {
        newNum++;
    }
    newFieldSet.id = newNum;
    usedNums.push(newNum);
    newFieldSet.innerHTML = `        <div>
          <h4 class="beverage-count">Напиток №${newNum}</h4>
          <label class="field">
            <span class="label-text">Я буду</span>
            <select>
              <option value="espresso">Эспрессо</option>
              <option value="capuccino" selected>Капучино</option>
              <option value="cacao">Какао</option>
            </select>
          </label>
          <div class="field">
            <span class="checkbox-label">Сделайте напиток на</span>
            <label class="checkbox-field">
              <input type="radio" name="milk${newNum}" value="usual" checked />
              <span>обычном молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk${newNum}" value="no-fat" />
              <span>обезжиренном молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk${newNum}" value="soy" />
              <span>соевом молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk${newNum}" value="coconut" />
              <span>кокосовом молоке</span>
            </label>
          </div>
          <div class="field">
            <span class="checkbox-label">Добавьте к напитку:</span>
            <label class="checkbox-field">
              <input type="checkbox" name="options${newNum}" value="whipped cream" />
              <span>взбитых сливок</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options${newNum}" value="marshmallow" />
              <span>зефирок</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options${newNum}" value="chocolate" />
              <span>шоколад</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options${newNum}" value="cinnamon" />
              <span>корицу</span>
            </label>
          </div>
        </div>
        <div>
          <button type="button" class="delete-form-btn">Удалить</button>
        </div>`
    document.querySelector('.beverage:last-of-type').after(newFieldSet);
    
    const deleteBtn = newFieldSet.querySelector('.delete-form-btn:last-of-type');
    deleteBtn.addEventListener('click', () => {
        if (drinksCount > 1) {
            const fs = deleteBtn.parentElement.parentElement;
    
            const match = fs.innerHTML.match(/(?<=№)\d+(?=<)/);
    
            const num = parseInt(match[0]);
            drinksCount--;
            usedNums = usedNums.filter(x => x != num);
            fs.remove();
        }
    })
}

const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');
const openModalBtn = document.getElementById('submit-button');
const form = document.querySelector('form');
const content = document.querySelector('.modal-content');

function openModal(e) {
    e.preventDefault(); 
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    let drinkDeclension = '';
    if (drinksCount > 9 && drinksCount < 21 || drinksCount % 10 > 4) {
        drinkDeclension = `${drinksCount} напитков`;
    } else if (drinksCount % 10 === 1) {
        drinkDeclension = `${drinksCount} напиток`;
    } else {
        drinkDeclension = `${drinksCount} напитка`;
    }

    let html = `<p>Вы заказали ${drinkDeclension}</p>`;
    html += '<table><tr><th>Напиток</th><th>Молоко</th><th>Дополнительно</th></tr>';
    
    for (const idNum of usedNums) {
        const form = document.getElementById(idNum)
        const drink = form.querySelector('select').value;
        let drinkName = '';
        switch(drink) {
            case 'espresso': drinkName = 'Эспрессо'; break;
            case 'capuccino': drinkName = 'Капучино'; break;
            case 'cacao': drinkName = 'Какао'; break;
        }
        
        const milk = form.querySelector(`input[name="milk${idNum}"]:checked`).value;
        let milkName = '';
        switch(milk) {
            case 'usual': milkName = 'обычное'; break;
            case 'no-fat': milkName = 'обезжиренное'; break;
            case 'soy': milkName = 'соевое'; break;
            case 'coconut': milkName = 'кокосовое'; break;
        }
        
        const options = [];
        form.querySelectorAll(`input[name="options${idNum}"]:checked`).forEach(option => {
            switch(option.value) {
                case 'whipped cream': options.push('взбитые сливки'); break;
                case 'marshmallow': options.push('зефирки'); break;
                case 'chocolate': options.push('шоколад'); break;
                case 'cinnamon': options.push('корица'); break;
            }
        });
        
        html += `<tr>
            <td>${drinkName}</td>
            <td>${milkName}</td>
            <td>${options.join(', ')}</td>
        </tr>`;
    }
    
    html += '</table>';
    content.innerHTML = html;
    
}

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

form.addEventListener('submit', openModal); 
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);