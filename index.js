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


const textArea = document.querySelector('.sevenArea textarea');
const comArea = document.querySelector('.sevenArea p')


const highlightRegex = /(^|[^А-Яа-яёЁA-Za-z0-9_])(срочно|быстрее|побыстрее|скорее|поскорее|очень нужно)(?=$|[^А-Яа-яёЁA-Za-z0-9_])/gi;

textArea.addEventListener('input', event => {
  const txt = event.target.value;
  const highlighted = txt.replace(highlightRegex, (match, prefix, word) =>
    prefix + '<b>' + word + '</b>'
  );
  comArea.innerHTML = highlighted;
});


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
          <div class="sevenArea">
            <label>И еще вот что<br/>
              <textarea></textarea>
              <p></p>
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

    const textArea = newFieldSet.querySelector('.sevenArea textarea');
    const comArea = newFieldSet.querySelector('.sevenArea p')


    const highlightRegex = /(^|[^А-Яа-яёЁA-Za-z0-9_])(срочно|быстрее|побыстрее|скорее|поскорее|очень нужно)(?=$|[^А-Яа-яёЁA-Za-z0-9_])/gi;

    textArea.addEventListener('input', event => {
    const txt = event.target.value;
    const highlighted = txt.replace(highlightRegex, (match, prefix, word) =>
        prefix + '<b>' + word + '</b>'
    );
        comArea.innerHTML = highlighted;
    });
}

const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');
const openModalBtn = document.getElementById('submit-button');
const form = document.querySelector('form');
const content = document.querySelector('.modal-content');
const confBtn = document.getElementById("timeBtn");

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
    html += '<table><tr><th>Напиток</th><th>Молоко</th><th>Дополнительно</th><th>Пожелания</th></tr>';
    
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
        
        const posh = form.querySelector('.sevenArea textarea').value;
        html += `<tr>
            <td>${drinkName}</td>
            <td>${milkName}</td>
            <td>${options.join(', ')}</td>
            <td>${posh}</td>
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

function confirm() {
    const timeInput = document.getElementById("timeInput");
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    if (!timeInput.value) return false; 
    const [inputHours, inputMinutes] = timeInput.value.split(':').map(Number);
    if (currentHours < inputHours) {
        closeModal();
        return;
    } else if (currentHours === inputHours && currentMinutes < inputMinutes) {
        closeModal();
        return;
    }
    alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
}

form.addEventListener('submit', openModal); 
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
confBtn.addEventListener('click', confirm)