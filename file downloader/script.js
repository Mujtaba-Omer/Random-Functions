const fileInput = document.querySelector('input'),
downloadBtn = document.querySelector('button');

downloadBtn.addEventListener("click", function(){
    fetchFile(fileInput.value);
    downloadBtn.innerText = 'Downloading File...'
})

function fetchFile(url){
    fetch(url).then(res => res.blob()). then(file => {
        console.log(file);
        let tempURL = URL.createObjectURL(file);
        let aTag = document.createElement('a');
        aTag.href = tempURL;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        downloadBtn.innerText('Download File');
        URL.revokeObjectURL(tempURL);
    }).catch(()=> {
        downloadBtn.innerText = 'Download File';
        alert('Failed to download file');
    })
}