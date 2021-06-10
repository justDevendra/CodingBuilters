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

let bg2Img = document.querySelector(".imgBg2")
let bg2Title = document.querySelector(".titleBg2")
let bg2Desc = document.querySelector(".descBg2")

let arrayBg2Img = ['Creativita','Leadership','Disciplina',]
let arrayBg2Desc = [
    'Il pensiero fuori dagli schemi è la chiave per la trasformazione organizzativa e genera innovazione. Un team che risolve problemi in maniera creativa è vincente perché fatto di persone che non hanno avuto paura di condividere il loro pensiero, anche se non convenzionale, unite a persone che sono state capaci di accogliere nuove idee.',
    'Il leader è colui che è di ispirazione  per gli altri; è colui che aggrega intorno a sé i consensi, che convoglia le energie degli altri in un’unica direzione, che fa da collante nei momenti difficili. Senza una leadership il gruppo difficilmente fa il salto di qualità per diventare squadra.',
    'Lavorare in team richiede regole, organizzazione e disciplina. Le regole, infatti, non bastano: bisogna che tutti le seguano. E meglio ancora è se tutti le seguono perché le condividono e sanno che rispettarle è nell’interesse comune.'
]
let count = 1
let elem = document.getElementById("myBar");
let width = 0;

const wait1 = async () =>  {
    await sleep(500);
    anime({
        targets: bg2Desc,
        translateY: 0,
        opacity: ['0%','100%']
    });
    anime({
        targets: bg2Title,
        translateY: 0,
        delay:200,
        opacity: ['0%','100%']
    });
    width = 0;
    elem.style.width = "0%"
}

  
const wait2 = async () => {
    await sleep(500);
    if(count==3){
        count=0
    }
    bg2Img.src = "./img/home/" + arrayBg2Img[count] +  ".svg"
    bg2Title.innerText = arrayBg2Img[count]
    bg2Desc.innerText = arrayBg2Desc[count]
    count++
    anime({
        targets: bg2Img,
        translateX: 0,
        translateY: 0,
        opacity: ['0%','100%']
    });
}

const bg2ContentFunction = () => {
    anime({
        targets: bg2Img,
        translateX: -200,
        translateY: -200,
        opacity: ['100%','0%']
    });
    anime({
        targets: bg2Desc,
        translateY: 150,
        opacity: ['100%','0%']
    });
    anime({
        targets: bg2Title,
        translateY: 100,
        delay:200,
        opacity: ['100%','0%']
    });
    wait2()
    wait1()
}

timerBg2Content = setInterval(bg2ContentFunction, 11000);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const progressBarFunction = () => {
    if(width<100){
        width++;
        elem.style.width = width + "%";
    }
}

timerProgressBar = setInterval(progressBarFunction, 100);

let bg3MainDiv = document.querySelector(".bg3MainContainer")
let movingObjsDiv = document.querySelector(".movingObjsContainer")
let movingObjs = document.querySelectorAll(".movingObj")

let arrayRandomXY = []

const randomPositon = () => {
    ranPosX =  Math.random() * (bg3MainDiv.clientWidth - 100);
    ranPosY =  Math.random() * (bg3MainDiv.clientHeight - 100);

    return [ranPosX,ranPosY]
}

for(let i=0;i<movingObjs.length;i++){
    arrayRandomXY = randomPositon()
    movingObjs[i].style.left =  arrayRandomXY[0] + "px"
    movingObjs[i].style.top =  arrayRandomXY[1] + "px"
}

for(let i=0;i<movingObjs.length;i++){
    arrayRandomXY = randomPositon()
    anime({
        targets: movingObjs[i],
        left: arrayRandomXY[0],
        top: arrayRandomXY[1],
        easing: 'linear',
        duration: 30000,
    });
} 


setInterval(() => {
    for(let i=0;i<movingObjs.length;i++){
        arrayRandomXY = randomPositon()
        anime({
            targets: movingObjs[i],
            left: arrayRandomXY[0],
            top: arrayRandomXY[1],
            easing: 'linear',
            duration: 30000,
        });
    } 
},30000)


let countLock = 0
let timeFixer = 0
let lock = document.querySelector(".lock")

const callBg2Interval = () =>{
    timerBg2Content = setInterval(bg2ContentFunction, 11000)
} 

document.querySelector(".lock").addEventListener("click",()=>{
    if(countLock%2==0){
        lock.setAttribute("class","lock")
        clearInterval(timerProgressBar)
        clearInterval(timerBg2Content)
        timeFixer = Number(width+"00")
    }else{
        lock.setAttribute("class","lock greyScale")
        timerProgressBar = setInterval(progressBarFunction, 100);
        timerBg2Content = setTimeout(() => {
            bg2ContentFunction()
            callBg2Interval()
        }, 11000-timeFixer);
        timeFixer = 0
    }
    countLock++
})


let teamDivsContainer = document.querySelector(".containerTeamDiv")
let teamDivs = document.querySelectorAll(".teamDiv")
let tmName = document.querySelector(".teamateName")
let combTeam = [[0,1,2],[1,2,0],[2,0,1]]
let tranlateVal = [[-180,310,-135,-135],[-360,135,-310,135],[-520,-0,-0,-0]]
let countTeam = 0
let avatarNum = 3
let avatarNumMax = 6
let teamMatesName = ["Aleksandra Venezia","Arvind Pal","Matteo Seimandi","Sara Roasio","Alberto Boaglio","Giulio Dajani"]
let activeTeamMate = 1


const waitTeam = async () => {
    await sleep(300);
    countTeam++
    if(countTeam==3){
        countTeam=0
    }
}

const wait3 = async (x,val) => {
    await sleep(200);
    if(avatarNum==avatarNumMax){
        avatarNum=0
    }
    if(activeTeamMate==5){
        activeTeamMate=-1
    }
    avatarNum++
    activeTeamMate++
    teamDivs[x].src = "././img/home/teamAvatars/avatar" + avatarNum +".svg"
    tmName.innerText = teamMatesName[activeTeamMate]
    anime({
        targets: teamDivs[x],
        translateX: val,
        height: "110px",
        width: "110px",
        opacity: ["0%","50%"],
        easing: 'spring(1, 80, 10, 0)'
    });
}


setInterval(() => {
    anime({
        targets: teamDivs[combTeam[countTeam][0]],
        translateX: tranlateVal[countTeam][0],
        opacity: ["50%","0%"],
        easing: 'spring(1, 80, 10, 0)'
    });
    wait3(combTeam[countTeam][0],tranlateVal[countTeam][1])
    anime({
        targets: teamDivs[combTeam[countTeam][1]],
        translateX: tranlateVal[countTeam][2],
        height: "110px",
        width: "110px",
        opacity: ["100%","50%"],
        easing: 'spring(1, 80, 10, 0)'
    });
    anime({
        targets: teamDivs[combTeam[countTeam][2]],
        translateX: tranlateVal[countTeam][3],
        height: "150px",
        width: "150px",
        opacity: ["50%","100%"],
        easing: 'spring(1, 80, 10, 0)'
    });
    waitTeam()
},3000)