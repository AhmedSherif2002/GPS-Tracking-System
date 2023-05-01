const myBtn = document.getElementById("cbtn");
//const textArea = document.getElementById("gps-data");


// if("serial" in navigator){
//     console.log("Serial");
// }



var stxt="";

myBtn.addEventListener("click" , async ()=>{
    const port = await navigator.serial.requestPort();
    await port.open({baudRate:9600});

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();
    
try{
    while(true){
        const {value, done} = await reader.read();
        if(done){
            reader.releaseLock();
            break;
        }else{
            stxt+=value;
            //textArea.innerHTML = stxt;
        }
    }
    
}catch(e){
    console.log("Error" + e);
}
})

const coords = document.getElementsByClassName('loc-span');

setInterval(()=>{    
    console.log(stxt);    
    console.log(stxt.indexOf('$GPGLL') + " " + stxt.indexOf("N") + " " + stxt.indexOf('E'));
    indxf = stxt.indexOf('GPGLL');
    lat = stxt.substring(stxt.indexOf('GPGLL')+6, stxt.indexOf('N', stxt.indexOf('GPGLL'))-1);
    long = stxt.substring(stxt.indexOf('N', indxf)+2, stxt.indexOf('E' , indxf)-1);
    lat = lat;
    long = long;
    if(parseFloat(lat) !== NaN || parseFloat(long) !== NaN){
        coords[0].innerHTML=lat;
        coords[1].innerHTML=long;
    }
    console.log("slat:" + lat + " slong:" + long);
    stxt='';
},2000);