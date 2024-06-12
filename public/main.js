

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    axios.post('/api/upload', formData)
        .then(res => {
            console.log(res);
        })
});


document.getElementById('downloadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('codeInput').value;

    const res = await fetch(`/api/download/${code}`);
    if (res.ok){
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } else {
        alert('Error');
    }
  
})



setAutoCopyFeatures()



setAutoCopyFeatures()


function setAutoCopyFeatures() {
  onclick_copySelf(); 
  onclick_copyFrom(); 

  function onclick_copySelf() {
    let copy = document.querySelectorAll('.i-copy');
    
    for(let i = 0; i < copy.length; i++) {
      copy[i].addEventListener('click', function() {        
        let targetContent = document.querySelector('.i-copy-target').textContent;
        copyToClipboard(targetContent);
        ui_copyDone(this);
      });
    }
  }
  
  function onclick_copyFrom() {
    let btn = document.querySelectorAll('.i-copy-btn');
    
    for(let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', function() {
        let targetContent = document.querySelector('.i-copy-target').textContent;
        copyToClipboard(targetContent);
        ui_copyDone(this);
      });
    }
  }

  function copyToClipboard(str) {
    var area = document.createElement('textarea');

    document.body.appendChild(area);
    area.value = str;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }

  function ui_copyDone(btn) {
    var contentSaved = btn.innerHTML;


    btn.classList.add('copied');

    setTimeout(function() {
      btn.innerHTML = contentSaved;
      btn.classList.remove('copied');
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setAutoCopyFeatures();
});







const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');


dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
    }
});


fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        
    }
});














const codeInput = document.getElementById('codeInput');


document.addEventListener('keydown', function(event) {
    if (event.keyCode === 116) { 
        codeInput.value = ''; 
    }
});

const uploadBtn = document.querySelector('.uploadBtm');

uploadBtn.addEventListener('click', function() {
    codeInput.value = ''; 
});







function changeTheme(isChecked) {
  if (isChecked) {
    document.body.setAttribute('dark', '');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.removeAttribute('dark');
    localStorage.setItem('theme', 'light');
  }
}


document.addEventListener("DOMContentLoaded", function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.getElementById('themeSwitch').checked = true;
    document.body.setAttribute('dark', '');
  }
});







function changeLanguage(language) {
  const languageElements = {
      'en': {
          'File': 'File',
          'Whiz': 'Whiz',
          'Upload a File': 'Upload a File',
          'Download a File': 'Download a File',
          'Download': 'Download',
          'Key': 'Key'
      },
      'uk': {
          'File': 'Файл',
          'Whiz': 'Вжик',
          'Upload a File': 'Загрузити файл',
          'Upload File': 'Загрузити',
          'Download a File': 'Завантажити файл',
          'Download': 'Завантажити',
          'Key': 'Ключ'
      },
      'de': {
          'File': 'Datei',
          'Whiz': 'Zisch',
          'Upload a File': 'Datei hochladen',
          'Download a File': 'Datei herunterladen',
          'Download': 'Herunterladen',
          'Key': 'Schlüssel'
      }
  };


  const elementsToTranslate = document.querySelectorAll('.translate','.downloadBtm');


  elementsToTranslate.forEach(element => {
      const key = element.getAttribute('data-key');
      if (languageElements[language] && languageElements[language][key]) {
          element.textContent = languageElements[language][key];
      }
  });


  localStorage.setItem('selectedLanguage', language);
}


document.getElementById('language_select').addEventListener('change', function () {
  const selectedLanguage = this.value;
  changeLanguage(selectedLanguage);
});


const savedLanguage = localStorage.getItem('selectedLanguage');
if (savedLanguage) {
  document.getElementById('language_select').value = savedLanguage;
  changeLanguage(savedLanguage);
}













$(document).ready(function() {
  $.ajax({
      url: '/api/fileRoutes',
      method: 'GET',
      success: function(data) {
          $('#fileCount').text(data.count); 
      },
      error: function(err) {
          console.error('Error:', err);
      }
  });
});
