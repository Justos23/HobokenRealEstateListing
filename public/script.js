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

/* if(!req.session.user){
    console.log("You need to be logged in to add to favorites")
}else{
    try{
        const userCollection = await users();
        const favProperty = await PropertyData.ReadPropertyById(_id);
        const updateInfo = await userCollection.updateOne({ username: req.session.user.username},{$push: { 'Favorites': favProperty} });
    if (updateInfo.modifiedCount === 0) {
        throw `Could not add property to favorites successfully`;
    }
        
    }catch (e){
        console.log(e)
    }
}  */
