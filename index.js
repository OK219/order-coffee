let drinksCount = 1;

const addBtn = document.querySelector('.add-button');
addBtn.addEventListener('click', () => {
    addNewForm();
})

const deleteBtn = document.querySelector('.delete-form-btn');
deleteBtn.addEventListener('click', () => {
    if (drinksCount === 1) {
        return;
    }
    drinksCount--;
    deleteBtn.parentElement.parentElement.parentElement.remove();
})

function addNewForm() {
    const newForm = document.createElement('form');
    newForm.innerHTML = `      <fieldset class="beverage">
        <div>
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
          <button class="delete-form-btn">Удалить</button>
        </div>
      </fieldset>
      <div>
        <button type="button" class="add-button">+ Добавить напиток</button>
      </div>
      <div style="margin-top: 30px">
        <button type="submit" class="submit-button">Готово</button>
      </div>`
    document.querySelector('form').after(newForm);
    
    const addBtns = document.querySelectorAll('.add-button');
    addBtns[addBtns.length - 1].addEventListener('click', () => addNewForm());

    const deleteBtns = document.querySelectorAll('.delete-form-btn');
    const lastDeleteBtn = deleteBtns[deleteBtns.length - 1];
    lastDeleteBtn.addEventListener('click', () => {
        if (drinksCount >= 1) {
            lastDeleteBtn.parentElement.parentElement.parentElement.remove();
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
    if (count > 9 && count < 21 || count % 10 > 4) {
        drinkDeclension = `${drinksCount} напитков`;
    } else if (count % 10 === 1) {
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