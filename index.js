let drinksCount = 1;

const addBtn = document.querySelector('.add-button');
addBtn.addEventListener('click', () => {
    addNewForm();
})

const deleteBtn = document.querySelector('.delete-form-btn');
deleteBtn.addEventListener('click', () => {
    if (drinksCount > 1) {
        drinksCount--;
        deleteBtn.parentElement.parentElement.remove();
    }
})

function addNewForm() {
    const newFieldSet = document.createElement('fieldset');
    newFieldSet.classList.add('beverage');
    newFieldSet.innerHTML = `        <div>
          <h4 class="beverage-count">Напиток №${++drinksCount}</h4>
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
              <input type="radio" name="milk" value="usual" checked />
              <span>обычном молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk" value="no-fat" />
              <span>обезжиренном молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk" value="soy" />
              <span>соевом молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk" value="coconut" />
              <span>кокосовом молоке</span>
            </label>
          </div>
          <div class="field">
            <span class="checkbox-label">Добавьте к напитку:</span>
            <label class="checkbox-field">
              <input type="checkbox" name="options" value="whipped cream" />
              <span>взбитых сливок</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options" value="marshmallow" />
              <span>зефирок</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options" value="chocolate" />
              <span>шоколад</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options" value="cinnamon" />
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
            deleteBtn.parentElement.parentElement.remove();
            drinksCount--;
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

    content.innerHTML = `<p>Вы заказали ${drinkDeclension}</p>
            <table>
              <tr>
                <th>Напиток</th>
                <th>Молоко</th>
                <th>Дополнительно</th>
              </tr>
              <tr>
                <td>Капучино</td>
                <td>обычное</td>
                <td></td>
              </tr>
              <tr>
                <td>Какао</td>
                <td>соевое</td>
                <td>зефирки, шоколад</td>
              </tr>
            </table>`;
    
}

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

form.addEventListener('submit', openModal); 
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);