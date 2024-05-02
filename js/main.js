// FUNCIONALIDAD DEL SLIDER
const wrapper = document.querySelector('.wrapper')
const carrusel = document.querySelector('.carrusel')
const firstCardWidth = carrusel.querySelector('.card').offsetWidth
const carruselChildrens = [...carrusel.children]

let isDragging = false, starX, starScrollLeft,  timeoutId

let cardPerView = Math.round(carrusel.offsetWidth / firstCardWidth)

carruselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carrusel.insertAdjacentHTML('afterbegin', card.outerHTML)
})

carruselChildrens.slice(0, cardPerView).forEach(card => {
    carrusel.insertAdjacentHTML('beforeend', card.outerHTML)
})


const dragStart = (e) =>{
    isDragging = true
    carrusel.classList.add('dragging')
    starX = e.pageX
    starScrollLeft = carrusel.scrollLeft
}

const dragging = (e) => {
    if(!isDragging) return
    carrusel.scrollLeft = starScrollLeft - (e.pageX - starX)
}

const dragStop = () =>{
    isDragging = false
    carrusel.classList.remove('dragging')
}

const autoPlay = () => {
    if(window.innerWidth < 1300) return
    timeoutId = setTimeout(() => carrusel.scrollLeft += firstCardWidth, 2500)
}
autoPlay()

const infiniteScroll = () => {
    if(carrusel.scrollLeft === 0) {
        carrusel.classList.add('no-transition')
        carrusel.scrollLeft = carrusel.scrollWidth - ( 2 * carrusel.offsetWidth)
        carrusel.classList.remove('no-transition')
    } else if(Math.ceil(carrusel.scrollLeft) === carrusel.scrollWidth - carrusel.offsetWidth){
        carrusel.classList.add('no-transition')
        carrusel.scrollLeft = carrusel.offsetWidth
        carrusel.classList.remove('no-transition')
    }

    clearTimeout(timeoutId)
    if(!wrapper.matches(':hover')) autoPlay()
}

carrusel.addEventListener('mousedown', dragStart)
carrusel.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
carrusel.addEventListener('scroll', infiniteScroll)

// BOTON DEL FORMULARIO

const input = document.getElementById('miInput')
const input2 = document.getElementById('miInput2')
const maxtxt = document.getElementById('max')
const maxtxt2 = document.getElementById('max2')

maxtxt.style.color = "#E53935"
maxtxt2.style.color = "#E53935"

input.addEventListener('input', e =>{
    if (input.value.length < 12){
        maxtxt.innerText = ''
    } else{
        maxtxt.innerText = 'Maximo de caracteres'
        input.value = input.value.substring(0, 12)
    }
})  

input2.addEventListener('input', e =>{
    if (input2.value.length < 100){
        maxtxt2.innerText = ''
    } else{
        maxtxt2.innerText = 'Maximo de caracteres'
        input2.value = input2.value.substring(0, 100)
    }
})  