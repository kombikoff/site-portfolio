// ::: Burger-menu :::
document.querySelector('.menu-burger').addEventListener('click', function() {
	document.querySelector('.menu-burger-btn').classList.toggle('menu-burger-btn--active');
	document.querySelector('.mob-menu').classList.toggle('mob-menu--active');
	document.querySelector('#overlay').classList.toggle('active');
	document.body.classList.toggle('noscroll');
});

// Закрываем мобильное меню при возможном ресайзе экрана
window.addEventListener('resize', function() {
	document.querySelector('.menu-burger-btn').classList.remove('menu-burger-btn--active');
	document.querySelector('.mob-menu').classList.remove('mob-menu--active');
	document.querySelector('#overlay').classList.remove('active');
	document.body.classList.remove('noscroll');
});

// Закрываем мобильное меню при переходе по ссылке
const navLinks = document.querySelectorAll('.mob-menu__list-item a');
navLinks.forEach(function(item) {
	item.addEventListener('click', function() {
		document.querySelector('.menu-burger-btn').classList.remove('menu-burger-btn--active');
		document.querySelector('.mob-menu').classList.remove('mob-menu--active');
		document.querySelector('#overlay').classList.remove('active');
	});
});

// MixIUp - фильтрация карточек в портфолио
let containerEl = document.querySelector('#mix-cards');
let mixer = mixitup(containerEl, {
	classNames: {
		block: ""
	}
});


// ::: Email animation :::
const formItems = document.querySelectorAll('.form-input');


for (let item of formItems) {
	const thisParent = item.closest('.form-item');
	
	const thisPlaceholder = thisParent.querySelector('.fake-placeholder');

	// Если инпут в фокусе:
	item.addEventListener('focus', () => {
		thisPlaceholder.classList.add('fake-placeholder--active');
	});

	// Если инпут теряет фокус:
	item.addEventListener('blur', () => {
		if (item.value.length > 0) {
			thisPlaceholder.classList.add('fake-placeholder--active');
		} else {
			thisPlaceholder.classList.remove('fake-placeholder--active');
		}
	});
}

// ::: Вариант с проверкой выполнения условий ::: 
// if (formItems) {
// 	for (let item of formItems) {
// 		const thisParent = item.closest('.form-item');
// 		if (thisParent) {
// 			const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
	
// 			// Если инпут в фокусе:
// 			item.addEventListener('focus', () => {
// 				thisPlaceholder.classList.add('fake-placeholder--active');
// 			});
		
// 			// Если инпут теряет фокус:
// 			item.addEventListener('blur', () => {
// 				if (item.value.length > 0) {
// 					thisPlaceholder.classList.add('fake-placeholder--active');
// 				} else {
// 					thisPlaceholder.classList.remove('fake-placeholder--active');
// 				}
// 			});
// 		}
		
// 	}
// }

// ::: Backtop button :::
const backTopBtn = document.querySelector('#backtop');

backTopBtn.style.opacity = 0;

document.addEventListener('scroll', function() {
	if (window.pageYOffset > 700) {
		backTopBtn.style.opacity = 1;
	} else {
		backTopBtn.style.opacity = 0;
	}
});

// ::: jQwery :::
$(document).ready(function () {

    //FORM VALIDATE
	$('.form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'Отсутсвует символ @'
			},
			
			message: {
				required: 'Поле не должно быть пустым'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	});

	//*************************************************** */
	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}
});