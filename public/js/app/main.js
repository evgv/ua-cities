define(['../lib/vue'], function (Vue) {
    
    'use strict';
    
    var app = new Vue({
        el: '#app',
        data: {
            pattern: null,
            query: null,
            json: null,
            cities: []
        },
        created: function () {
            fetch("../public/cities.json")
                .then(resonse => resonse.json())
                .then(json => { this.json = json; });
        },
        methods: {
            search: function () {
                
                app.cities = [];
                
                if (this.query.length) {
                    
                    app.pattern = new RegExp('^' + this.query, 'i');
                    
                    app.cities  = app.json.cities.filter(city => app.pattern.test(city.name));
                    app.cities.map(city => (city.url = ('//google.com/search?q=' + city.name)));
                }
            }
        }
    });
    
});