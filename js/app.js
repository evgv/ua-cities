function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'cities.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    
    xobj.send(null);
}

function init() {
    loadJSON(function (response) {
        var json = JSON.parse(response);

        document.getElementById("city").addEventListener('keyup', search);

        var resultWrapper = document.getElementById("search-result");

        function search() {

            var query = this.value;

            if (query.length) {
                resultWrapper.innerHTML = '';

                json.cities.forEach(function(element) {
                    var pattern = new RegExp('^' + query, 'i');
                    var result  = pattern.test(element.name);

                    if (result === true) {

                        var div = document.createElement('div');
                            div.innerHTML = '<li><b>' + element.name + '</b> <p>In ' + element.subdivision + ', population is '+ element.population + '</p></li>';

                        while (div.children.length > 0) {
                            resultWrapper.appendChild(div.children[0]);
                        }
                    }
                });
            } else {
                resultWrapper.innerHTML = '';
            }

        }
    });
}

init();