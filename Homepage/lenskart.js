let url="http://localhost:3000/Brand";

function getBrand(){
fetch(url)
    .then((res) => res.json())
    .then((data) => {
for(i=0;i<data.length;i++){
    let element =document.createElement('option')
    let text = document.createTextNode(data[i].name)
    element.appendChild(text)
    element.value =data[i]._id
    document.getElementById('Brand').appendChild(element)
}
    })
}

function changeMode(){
    var mybody = document.body;
    // if body have class mydark than remove else add
    mybody.classList.toggle("mydark")
}

function closeDiv(){
        document.getElementById('coupon').style.visibility="hidden"
    }
    
    function test(){
        document.getElementById('coupon').style.visibility="visible"
    }