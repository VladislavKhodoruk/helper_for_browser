// <<<------------------1------------------>>>
// Removes wikipedia links in square brackets
// Hello, world![1] => Hello, world!

function removeWikipediaLinks(text){
  let newStr = '';
  let flag = false;
  for(let i = 0; i < text.length; i++){
    if(text[i] === '['){
      flag = true;
      continue;
    }
    if(text[i] === ']'){
      flag = false;
      continue;
    }
    if(!flag){
      newStr += text[i];
    }
  }
  copyToClipboard(newStr);
}

//shortcut
let rwl = removeWikipediaLinks;

//Automated version. Enabled by default
//Select the text, click 'c' and formatted text will be copied to the clipboard
textSelectionTemplate(removeWikipediaLinks, 'cс');



// <<<------------------2------------------>>>
// Lowercase the string
// 'QweRty' => 'qwerty'

function stringToLowerCase(text) {
  copyToClipboard(text.toLowerCase());
}

//shortcut
let stlc = stringToLowerCase;

//Automated version. Enabled by default
//Select the text, click 'l' and text in lower case will be copied to the clipboard
textSelectionTemplate(stringToLowerCase, 'lд');



// <<<------------------3------------------>>>
// Removes element from the DOM tree
// Hover your mouse on element and click 'Backspace'

function removeElement() {
  let hoveredElement = null;
  document.addEventListener('mouseover', function(event) {
    event.stopPropagation();
    hoveredElement = event.target;
  });
  document.addEventListener('mouseout', function() {
    hoveredElement = null;
  });
  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'Delete' && hoveredElement) {
      hoveredElement.remove();
    }
  });
}

//Enabled by default
removeElement();



// <<<------------------4------------------>>>
// Same as №3 but also highlights hovered element

function removeElementWithHighlight() {
  let hoveredElement = null;
  document.addEventListener('mouseover', function(event) {
    event.stopPropagation();
    hoveredElement = event.target;
    hoveredElement.style.border = '2px solid powderblue';
  });
  document.addEventListener('mouseout', function() {
    hoveredElement.style.border = 'none';
    hoveredElement = null;
  });
  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'Delete' && hoveredElement) {
      hoveredElement.remove();
    }
  });
}

//shortcut
let rewh = removeElementWithHighlight;
//Disabled by default


// <<<------------DEPENDENCIES------------>>>

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function textSelectionTemplate(userFunc, keys){
  let selectedText;
  document.addEventListener('mouseup', function() {
    selectedText = window.getSelection().toString();
  });

  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (keys.includes(key.toLowerCase()) && selectedText !== '') {
      userFunc(selectedText);
    }
  });
}

function highlightHoveredElement() {
  const elements = document.querySelectorAll('*');

  elements.forEach(function(element) {
    element.addEventListener('mouseover', function(event) {
      event.stopPropagation();
      element.style.border = '2px solid powderblue';
    });

    element.addEventListener('mouseout', function(event) {
      event.stopPropagation();
      element.style.border = 'none';
    });
  });
}
