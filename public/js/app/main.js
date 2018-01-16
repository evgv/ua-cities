define(['json'], function (json) {
    
    json.load(function (response) {

        var json = JSON.parse(response),
            resultWrapper = document.getElementById("search-result");

        document.getElementById("city").addEventListener('keyup', function() {
            var query = this.value;
            if (query.length) {
                resultWrapper.innerHTML = '';

                json.cities.forEach(function(element) {
                    var pattern = new RegExp('^' + query, 'i');
                    var result  = pattern.test(element.name);

                    if (result === true) {

                        var div = document.createElement('div');
                            div.innerHTML = '<li class="city-wrap"><a href="//google.com/search?q=' + element.name + '" target="_blank" class="city-name"><b>' + element.name + '</b></a> <p>In ' + element.subdivision + ', population is '+ element.population + '"</p></li>';

                        while (div.children.length > 0) {
                            resultWrapper.appendChild(div.children[0]);
                        }
                    }
                });
            } else {
                resultWrapper.innerHTML = '';
            }
        });
    });
});

console.log(2);