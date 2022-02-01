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

    function getWeather(){
        let city = $('.cities')[0].value;
        //document.getElementsByClassName('cities')[0].value
        const weatherurl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
        $.ajax({
            url:weatherurl,
            type:'GET',
            datatype:'json',
            success:function(data){
                console.log(data)
                $('#cityName')[0].innerText= data.city.name;
                $('#weather').empty();
    
                for(i=0;i<data.list.length;i++){
                    $('#weather').append(
                        "<div class='card col-md-2'><div class='row'>"+
                        "<img class='card-img-top' src='https://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png' alt='weather'/>"+
                        "<span class='topTemp'>"+data.list[i].temp.day+"°C</span></div><div class='card-body'>"+
                        "<span class='max'>"+data.list[i].temp.max+"</span>/<span class='min'>"+data.list[i].temp.min+"°C</span><h4 class='card-title'>"+data.list[i].weather[0].main+"</h4><p class='card-text'>"+
                        "<p class='day'>"+Date(data.list[i].dt)+"</p><p>Humidity:"+data.list[i].humidity+"</p></p></div></div>"
                    )
                }
            }
        })
    }

    var x = document.getElementById("out")
    var y = document.getElementById("address")
    var z =  document.getElementById('icon')
    function geolocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition)
        }else{
            x.innerText="Geo Not Supported"
        }
    }

    function showPosition(data){
        console.log(data)
        x.innerText=`Latitude is ${data.coords.latitude}, longitude is ${data.coords.longitude}`
        let lat = data.coords.latitude;
        let long = data.coords.longitude
        var url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=1&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
        /*var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.coords.latitude},${data.coords.longitude}&key=`;
        */
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)                 
            /*data.list.map((item) => {
                console.log(item.temp.day)
                y.innerText=`${item.temp.day}°C and ${item.weather[0].description}`
                z.innerHTML=`<img class='card-img-top' src='https://openweathermap.org/img/w/${item.weather[0].icon}.png' alt='weather'/>`
            })*/
            
        })
    }