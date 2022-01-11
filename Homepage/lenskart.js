let url="http://localhost:4201/Brand";

function getBrands(){
    fetch(url)
    .then((res) => res.json()); console.log('res');
    // .then((data) =>{ 
    //     for(i=0;i<data.length;i++){
    //         let element =document.createElement('option')
    //         let text = document.createTextNode(data[i].Brand_name)
    //         element.appendChild(text)
    //         element.value = data[i]._id
    //         document.getElementById('search').appendChild(element)
    //     }
     
    // })
}