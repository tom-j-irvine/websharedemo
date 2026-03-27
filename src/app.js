const shareButton = document.querySelector('#share-button');

shareButton.addEventListener('click', event => {

    const filename = 'Horn_of_the_Metolius_v1.1.gpx';
    const text = 'Horn of the Metolius';

    tryShareFile(filename, text);    

});

const tryShareFile = (filename, text) => {
    
    fetch(filename)
        .then(function (response) {
            return response.blob();
        })
        .then(function (blob) {
            // try to share
            const file = new File([blob], filename, { type: blob.type });     
            
            if (navigator.canShare && navigator.canShare({ files: [file] })) {            
                navigator.share({ 
                    files: [file], 
                    title: 'Share GPX File',
                    text: text ,                    
                })
                .then(() => {})
                .catch(err => {
                    // not supported, download
                    downloadFile(blob, filename);
                });
            } else {
                // share not supported, download
                downloadFile(blob, filename);
            }            
        });  
}

const downloadFile = (blob, name) => {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);
    document.querySelector('a').click();
};