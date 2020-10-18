let Btn = document.getElementById('btn');
let MyURL= document.querySelector('.my-url');
let type=document.querySelector('.type');
let server='http://localhost:4000';

Btn.addEventListener('click',()=>{
    if(!MyURL){
        alert('Enter Url');
    }
    else if (type.value =='MP3'){
        dlMp3(MyURL.value);
    }else if(type.value=='MP4'){
        dlMp4(MyURL.value);
    }
});


async function dlMp3(query) {
	const res = await fetch(`${server}/dlmp3?url=${query}`);
	if(res.status == 200) {
		var a = document.createElement('a');
  		a.href = `${server}/dlmp3?url=${query}`;
  		a.setAttribute('download', '');
		a.click();
	} else if(res.status == 400) {
		alert("Invalid url");
	}
}

async function dlMp4(query) {
	const res = await fetch(`${server}/dlmp4?url=${query}`);
	if(res.status == 200) {
		var a = document.createElement('a');
  		a.href = `${server}/dlmp4?url=${query}`;
  		a.setAttribute('download', '');
		a.click();
	} else if(res.status == 400) {
		alert('Invalid url');
	}
}