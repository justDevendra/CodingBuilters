let logo = document.querySelector('.navbar-brand')

const logoOver = () => {
    anime({
        targets: logo,
        rotate: 180,
        easing: 'spring(1, 80, 10, 0)'
    })
}

const logoOut = () => {
    anime({
        targets: logo,
        rotate: 360,
        easing: 'spring(1, 80, 10, 0)'
    })
}

logo.addEventListener('mouseover', logoOver)
logo.addEventListener('mouseout', logoOut)


let navToggleCont = 0

const navToggler = (x) => {
    let md = document.querySelector("#menuDiv")
    let mbtn = document.querySelector(".navbar-toggler")

    navToggleCont++
    if(navToggleCont%2==0){
        md.style.opacity = "0"
        document.body.style.overflow = "visible"
    }else{
        md.style.opacity = "1"
        md.style.zIndex = "10"
        mbtn.style.zIndex = "11"
        document.body.style.overflow = "hidden"
    }
    x.classList.toggle("change");
}


let url = 'https://raw.githubusercontent.com/justDevendra/myData/main/CodingBuilterJson/Json/progetti.json'
let cardBtnText = "Guarda ora"
let Index = -1
let anime = ""
let clickedBtnIndex = 0
let arrayCardTitoli=[]
let arrayNumImg=[]
let projectsContainer = document.querySelector(".progettiContainer")
let spinner = document.querySelector(".divSpinner")

fetch(url)
.then(res => res.json())
.then((out) => {
    for (progetto of out) {
        Index++
        arrayNumImg[Index]=progetto.numImg

        if(Index==0){
            anime = "cardAnimetion1"
        }else if(Index==1){
                anime = "cardAnimetion2"
            }else{
                anime = "cardAnimetion2"
            }
        let cardHeader = document.createElement("div")
        cardHeader.setAttribute("class","card-header")
        cardHeader.innerText = progetto.titolo
    
        let cardTitle = document.createElement("h4")
        cardTitle.setAttribute("class","card-title")
        cardTitle.innerText = progetto.semiTitolo
        arrayCardTitoli[Index] = progetto.semiTitolo

        let cardBadge = document.createElement("span")
        if(progetto.difficolta=="Facile"){
            cardBadge.innerText = "Facile"
            cardBadge.setAttribute("class","badge bg-success")
        }else if(progetto.difficolta=="Medio"){
                cardBadge.innerText = "Medio"
                cardBadge.setAttribute("class","badge bg-warning")  
            }else if(progetto.difficolta=="Difficile"){
                    cardBadge.innerText = "Difficile"
                    cardBadge.setAttribute("class","badge bg-danger")  
                }else{
                    cardBadge.innerText = progetto.difficolta
                    cardBadge.setAttribute("class","badge bg-info")  
                }

        cardTitle.appendChild(cardBadge)

        let cardText = document.createElement("p")
        cardText.setAttribute("class","card-text")
        cardText.innerText = progetto.descrizione

        let cardBtn =  document.createElement("button")
        cardBtn.setAttribute("class","btn btn-dark")
        cardBtn.innerText = cardBtnText
        cardBtn.setAttribute("data-bs-toggle","modal")
        cardBtn.setAttribute("data-bs-target","#staticBackdrop")

        let cardBody = document.createElement("div")
        cardBody.setAttribute("class","card-body")
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardText)
        cardBody.appendChild(cardBtn)

        let card = document.createElement("div")
        card.appendChild(cardHeader)
        card.appendChild(cardBody)
        card.classList.add('card',anime)
        projectsContainer.appendChild(card)
        setTimeout("", .1)
    }
    spinner.style.display = "none"

    foot = `    <footer class="text-white text-center text-lg-start" style="background-color: #8498DD;border-top-right-radius: 30px;border-top-left-radius: 30px;">
    <div class="container p-4">
      <div class="row">
        <div class="d-flex flex-column align-items-center col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5>Coding Builters</h5>
          <p>
            progettiamo assieme il nostro futuro...
          </p>
        </div>
        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase text-center text-lg-start">Link Utili</h5>

          <ul class="list-unstyled mb-0">
            <li class="text-center text-lg-start">
              <a href="./progetti.html" class="text-white">Progetti</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-0 text-center text-lg-start">Powered By?</h5>

          <ul class="list-unstyled">
            <li class="text-center text-lg-start">
              <a href="https://github.com/justDevendra" target="_blank" class="text-white">Arvind Pal</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-center p-3" >
      © 2021 Copyright:
      <a class="text-white" href="#">CodingBuilters</a>
    </div>
    </footer>`
  $(".footerCont").append(foot)
})
.catch(err => { throw err });

$(document).on('click','.btn-dark',function(){
    clickedBtnIndex = $('.btn-dark').index(this)
    let modelTitle = document.querySelector('.modal-title')
    let arrayCardHeader = document.querySelectorAll('.card-header')
    let carouselContainer = document.querySelector('.carousel-inner')


    $(".carousel-inner").empty()
    let cont=1

    modelTitle.innerText = arrayCardTitoli[clickedBtnIndex]

    for(let i=0;i<arrayNumImg[clickedBtnIndex];i++){
        carouselItem = document.createElement("div")
        if(i==0){
            carouselItem.setAttribute("class","carousel-item active")
        }else{
            carouselItem.setAttribute("class","carousel-item")
        }
        img = document.createElement("img")
        img.setAttribute("class","d-block w-100")
        img.src = "./img/progetti/" + arrayCardHeader[clickedBtnIndex].innerText + "/" + cont + ".png"
        carouselItem.appendChild(img)
        carouselContainer.appendChild(carouselItem)
        cont++
    }
})