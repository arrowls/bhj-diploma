/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
    /**
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * Сохраняет переданный элемент и регистрирует события
     * через registerEvents()
     * */
    constructor(element) {
        if (!element) {
            throw new Error(
                'Invalid element (public/ui/forms/AsyncFrom:constructor)'
            );
        }
        this.element = element;
        this.registerEvents();
    }

    /**
     * Необходимо запретить отправку формы и в момент отправки
     * вызывает метод submit()
     * */
    registerEvents() {
        this.element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submit();
        });
    }

    /**
     * Преобразует данные формы в объект вида
     * {
     *  'название поля формы 1': 'значение поля формы 1',
     *  'название поля формы 2': 'значение поля формы 2'
     * }
     * */
    getData() {
        const dataObject = {};
        [...this.element.querySelectorAll('input')].forEach(input => {
            dataObject[input.name] = input.value
        })
        return dataObject;
    }

    onSubmit(options) {}

    /**
     * Вызывает метод onSubmit и передаёт туда
     * данные, полученные из метода getData()
     * */
    submit() {
        this.onSubmit(this.getData());
    }
}
