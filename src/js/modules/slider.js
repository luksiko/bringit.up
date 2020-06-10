export default class Slider {
	constructor(page, btns, popup) {
		this.page = document.querySelector(page);
		this.slides = this.page.children;
		this.buttons = document.querySelectorAll(btns);
		this.slideIndex = 1;
		try {// переменная для всплывающего окна
			this.hanson = document.querySelector(popup);
		} catch (e) {}
	}

	showSlides(n) {
		// вернуть слайдер в самое начало если закончились
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}
		// если клик на кнопку назад
		if (n < 1) {
			this.slideIndex = this.slides.length;
		}
		// Анимация popup на 3 странице
		try {
			this.hanson.style.opacity = '0';

			if (n === 3) {
				this.hanson.classList.add('animated');
				setTimeout(() => {
					this.hanson.style.opacity = '1';
					this.hanson.classList.add('slideInUp');
				}, 3000);
			} else {
				this.hanson.classList.remove('slideInUp');
			}
		} catch (e) {}

		this.slides.forEach((slide) => {
			slide.style.display = 'none';
		});

		this.slides[this.slideIndex - 1].style.display = 'block';
	}
	// увеличиваем слайдиндекс и листаем слайд
	plusSlides(n) {
		this.showSlides((this.slideIndex += n));
	}

	render() {
		this.buttons.forEach((item) => {
			item.addEventListener('click', () => {
				this.plusSlides(1);
			});
			// нажимая на логотип перемещаемся к 1 слайду. ищем его через родителей
			item.parentNode.previousElementSibling.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});

		this.showSlides(this.slideIndex);
	}
}
