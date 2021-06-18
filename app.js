window.addEventListener('load', () => {
    
            const api = 'https://ipapi.co/json/'
            fetch(api)
                .then(response =>{  
                    return response.json()
                }).then(data1 =>{
                    console.log(data1)
                    ip = data1.ip
                    return fetch(`http://api.ipstack.com/${ip}?access_key=1ab4430c66e0745bd475f2d893897051`)
                }).then(response => {
                    return response.json()
                }).then(data2 =>{
                    console.log(data2.city)
                    city = data2.city
                    const splitCity = city.split(' ')
                    var location
                    if(splitCity[0] == city){
                        location = city
                    }
                    else {
                        var first = splitCity[0]
                        for(i = 1; i<splitCity.length; i++)
                       location = first += "+" + splitCity[i]
                       console.log(location)
                    }
                    document.getElementById('city').innerHTML = location
                    return fetch(`http://api.weatherapi.com/v1/current.json?key=3006c5a9471f48a9a5c183404211606&q=${location}&aqi=no`)
                }).then(response =>{
                    return response.json()
                }).then(data3 =>{
                    if(data3.current.condition.code == 1000){
                        document.getElementById('icon').src = 'day/113.png'
                    }
                    else if(data3.current.condition.code == 1003){
                        document.getElementById('icon').src = 'day/116.png'
                    }
                    else if(data3.curren.condition.code == 1006){
                        document.getElementById('icon').src = 'day/119.png'
                    }
                    document.getElementById('temp').innerHTML = data3.current.temp_f + " " + "F"
                    console.log(data3.current.temp_f)
                })
})

function convert(){
    var temp = document.getElementById('temp').innerHTML
    var split = temp.split(' ')
    console.log(split[1])
    if(split[1] === 'F'){
        var convert = (Number(split[0])-32) * (5/9)
        document.getElementById('temp').innerHTML = convert + " " + "C"
    }
    else if(split[1]=== 'C'){
        var convert2 = (Number(split[0])*(9/5))+32
        document.getElementById('temp').innerHTML = convert2 + " " + "F"
        console.log(convert2)
    }
}