let cards = ['ciri.png', 'geralt.png', 'jaskier.png', 'jaskier.png', 'iorweth.png', 'triss.png', 'geralt.png', 'yen.png', 'ciri.png', 'triss.png', 'yen.png', 'iorweth.png'];


function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

const shuffledCards = shuffleCards(cards);
//console.log(shuffledCards);


let newDiv = "";
  
for (i = 0; i <= 11; i++) {
    newDiv = newDiv + "<div class='card' id='c" + i + "'></div>";
  
}    
//console.log(newDiv);


$('.board').html(newDiv);               
$('.score').html('Turn counter: 0 ');


let c0 = document.getElementById('c0');
let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');
let c3 = document.getElementById('c3');

let c4 = document.getElementById('c4');
let c5 = document.getElementById('c5');
let c6 = document.getElementById('c6');
let c7 = document.getElementById('c7');

let c8 = document.getElementById('c8');
let c9 = document.getElementById('c9');
let c10 = document.getElementById('c10');
let c11 = document.getElementById('c11');


c0.addEventListener('click', function() {revealCard(0);})
c1.addEventListener('click', function() {revealCard(1);})
c2.addEventListener('click', function() {revealCard(2);})
c3.addEventListener('click', function() {revealCard(3);})

c4.addEventListener('click', function() {revealCard(4);})
c5.addEventListener('click', function() {revealCard(5);})
c6.addEventListener('click', function() {revealCard(6);})
c7.addEventListener('click', function() {revealCard(7);})

c8.addEventListener('click', function() {revealCard(8);})
c9.addEventListener('click', function() {revealCard(9);})
c10.addEventListener('click', function() {revealCard(10);})
c11.addEventListener('click', function() {revealCard(11);})

let oneVisible = false;
let turnCounter = 0;
let visible_nr; //pierwsza odkrta karta
let lock = false; 
pairsLeft = 6;
let yes = new Audio('snd/yes.wav');   
let no = new Audio('snd/no.wav');    
let win = new Audio('snd/win.mp3');  


function revealCard(nr) {

    
    //alert(nr);

    let opacityValue = $('#c' + nr).css('opacity');

    if (opacityValue != 0 && lock == false) {

                //alert('Opacity: ' + opacityValue);

                lock = true;

                let obraz = "url(img/" + cards[nr] + ")";

                $('#c' + nr).css('background-image', obraz); //odsłonięcie karty jquery
                $('#c' + nr).addClass('cardA', obraz); //nowa klasa, dodanie 100%brigthness, złotego obramowania i usunięcie cursor pointer dla odsłoniętego obrazka


                //$('#c' + nr).removeClass('cardA', obraz);

                if (oneVisible == false) {
                    
                    //first card

                    oneVisible = true;
                    visible_nr = nr;
                    lock = false;
                }
                else {
                    
                    //second card

                    if (cards[visible_nr] == cards[nr]) {

                        //alert('Para');

                        setTimeout(function() {hide2Cards(nr, visible_nr)}, 700); 
                        //schowanie 2 odkrytych kart z opóźnieniem czasowym
                    }
                    else {

                        //alert('Pudło');
                        
                        setTimeout(function() {restore2Cards(nr, visible_nr)}, 1000);
                        //przywrócenie nietrafionych kart do stanu początkowego
                    }

                    
                    
                        turnCounter++
                        $('.score').html('Turn counter: ' + turnCounter);
                        console.log('licznik rund: ' + turnCounter);
                        oneVisible = false;
                    }

                }
    else {

    }


}



function hide2Cards(nr1, nr2) {
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');

    yes.play();

    pairsLeft --;
    if (pairsLeft == 0) {
        //alert('Koniec gry!');
        $('.board').html('<h2><br /><br /><br />You Win!<br />Done in ' + turnCounter + ' turns!</h2><br /><span style="color: #209781; cursor: pointer" onclick="location.reload()">Wanna play again?</span>');
        $('.board').addClass('koniec');
        win.play();
        $('.score').html('');
    }

    lock = false;
}

function restore2Cards(nr1, nr2) {
    $('#c' + nr1).css( 'background-image', 'url(img/karta.png)');
    $('#c' + nr1).removeClass('cardA');
    $('#c' + nr2).css( 'background-image', 'url(img/karta.png)');
    $('#c' + nr2).removeClass('cardA');

    no.play();

    lock = false;
}

