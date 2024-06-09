// <<<------------------1------------------>>>
// Removes wikipedia links in square brackets
// Hello, world![1] => Hello, world!

function removeWikipediaLinks(text){
  event.preventDefault();
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
//let rwl = removeWikipediaLinks;

//Automated version. Enabled by default
//Select the text, click ctrl + 'c' and formatted text will be copied to the clipboard
textSelectionTemplate(removeWikipediaLinks, 'cс');



// <<<------------------2------------------>>>
// Lowercase the string
// 'QweRty' => 'qwerty'

function stringToLowerCase(text) {
  event.preventDefault();
  copyToClipboard(text.toLowerCase());
}

//shortcut
let stlc = stringToLowerCase;

//Automated version. Enabled by default
//Select the text, click ctrl + 'l' and text in lower case will be copied to the clipboard
textSelectionTemplate(stringToLowerCase, 'lд');



// <<<------------------3------------------>>>
// Removes element from the DOM tree
// Hover your mouse on element and click 'Delete'

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



// <<<------------------5------------------>>>
// Highlights selected text

function highlightSelectedText(style){
  var userSelection = window.getSelection().getRangeAt(0);
  var safeRanges = getSafeRanges(userSelection);
  for (var i = 0; i < safeRanges.length; i++) {
    highlightRange(safeRanges[i]);
  }

  function highlightRange(range) {
    var newNode = document.createElement("div");
    newNode.setAttribute(
      "style",
      style
    );
   newNode.setAttribute(
      "class",
      "highlighted-div"
    );
    range.surroundContents(newNode);
  }
  
  function getSafeRanges(dangerous) {
    var a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    var s = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a) {
      for (var i = dangerous.startContainer; i != a; i = i.parentNode) {
        s.push(i);
      }
    }
    if (s.length > 0) {
      for (var i = 0; i < s.length; i++) {
        var xs = document.createRange();
        if (i) {
          xs.setStartAfter(s[i - 1]);
          xs.setEndAfter(s[i].lastChild);
        } else {
          xs.setStart(s[i], dangerous.startOffset);
          xs.setEndAfter((s[i].nodeType == Node.TEXT_NODE) ? s[i] : s[i].lastChild);
        }
        rs.push(xs);
      }
    }
  
    // Ends -- basically the same code reversed
    var e = new Array(0), re = new Array(0);
    if (dangerous.endContainer != a) {
      for (var i = dangerous.endContainer; i != a; i = i.parentNode) {
        e.push(i);
      }
    }
    if (e.length > 0) {
      for (var i = 0; i < e.length; i++) {
        var xe = document.createRange();
        if (i) {
          xe.setStartBefore(e[i].firstChild);
          xe.setEndBefore(e[i - 1]);
        } else {
          xe.setStartBefore((e[i].nodeType == Node.TEXT_NODE) ? e[i] : e[i].firstChild);
          xe.setEnd(e[i], dangerous.endOffset);
        }
        re.unshift(xe);
      }
    }
  
    // Middle -- the uncaptured middle
    if ((s.length > 0) && (e.length > 0)) {
      var xm = document.createRange();
      xm.setStartAfter(s[s.length - 1]);
      xm.setEndBefore(e[e.length - 1]);
    } else {
      return [dangerous];
    }
  
    // Concat
    rs.push(xm);
    console.log('RS');
    for(let i  = 0; i < rs.length; i++ ){
     console.log(rs[i]);
    }
    response = rs.concat(re);
    console.log('RESPONSE');
    for(let i  = 0; i < rs.length; i++ ){
     console.log(response[i]);
    }
  
    // Send to Console
    return response;
  }

}

function toggleHighlightedDivsAuto(keysForHighlight, keysForUnhighlight){
  let selectedText;
  let timer;
  
  document.addEventListener('keydown', function(event) {
    const key = event.key;
    const isCtrlPressed = event.ctrlKey;
    if(isCtrlPressed){
      if (keysForHighlight.includes(key)) {
        event.preventDefault();
        highlightSelectedText("background-color: aqua; display: inline;");
      }

      if (keysForUnhighlight.includes(key)) {
        event.preventDefault();
        if (timer) {
          clearTimeout(timer);
          timer = null;
          const highlightedDivs = document.getElementsByClassName("highlighted-div");
          const arr = Array.prototype.slice.call(highlightedDivs);
          for (var i = 0; i < arr.length; i++) {
            arr[i].setAttribute(
              "style",
              "display: inline;"
            );
          }
        } else {
          timer = setTimeout(function() {
            timer = null;
          }, 500);
        }
      } 
    }
  });
}

//Automated version. Enabled by default
// Select text and click ctrl + 'h' to highlight
// Click ctrl + 'u' to cancel for previous highlighted text (NOT IMPLEMENTED YET!!!)
// Click ctrl + double click 'u' to cancel for all highlighted text
toggleHighlightedDivsAuto('hр', 'uг');



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
    const isCtrlPressed = event.ctrlKey;
    if (keys.includes(key.toLowerCase()) && selectedText !== '' && isCtrlPressed) {
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
