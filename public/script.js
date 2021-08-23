let favbtn = document.getElementById("favbtn")

favbtn.addEventListener('click', () =>{
    if (favbtn.className == 'addtofav'){
        favbtn.className = 'removefromfav';
        favbtn.innerText ='Remove from favorites';
    }else{
        favbtn.className = 'addtofav';
        favbtn.innerText ='Add to favorites';
    }
    
});


