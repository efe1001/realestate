const header = document.querySelector('.headerbar')
fetch('/header.html')
.then(res=>res.text())
.then(data=>{
    header.innerHTML=data
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    eval(doc.querySelector('script').textContent)
})




