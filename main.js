//import tovar from './tovar.json';

Vue.prototype.$http = axios;

class tovarPush {
    constructor(name, value, cost, category, firm, img){
        this.name=name;
        this.value=value;
        this.cost=cost;
        this.onCart=0;
        this.category=category;
        this.firm=firm;
        this.img=img;
    }
}

var tovarContainer = {
    props: ['tovar', 'cart'],
    template: '<b-card-group class="tovContainer">\n' +
    '        <b-card :header="\'©\'+tovar.firm"\n' +
    '                header-tag="header"\n' +
    '                :footer="tovar.cost+\'$\'+\'\'"\n' +
    '                footer-tag="footer"\n' +
    '                :title=\'tovar.name\'>\n' +
    '            <p class="card-text"><img :src=tovar.img></p>\n' +
    '\t\t\t<div class="btnNval">\n' +
    '\t\t\t<h5>{{ tovar.onCart }}/{{ tovar.value }}</h5>\n' +
    '      <b-button v-if="!cart&&!form.admin" @click="buy(tovar)" :disabled="tovar.onCart>=tovar.value" variant="primary">\n' +
    '          <i class="material-icons">add_shopping_cart</i>\n' +
    '\t\t\t</b-button>\n' +
    '      <button v-if="cart" class="btn btn-success" @click="tovar.onCart++" :disabled="tovar.onCart>=tovar.value">+</button>\n' +
    '      <button v-if="cart" class="btn btn-danger" @click="tovar.onCart--" :disabled="tovar.onCart<=0">-</button>\n' +

    '      <button v-if="form.admin" class="btn btn-danger" @click="tovar.pop"><i class="material-icons">\n' +
    'remove_circle_outline\n' +
    '</i></button>\n' +
    '      <button v-if="form.admin" class="btn btn-warning" @click=""><i class="material-icons">\n' +
    'edit\n' +
    '</i></button>\n' +
    '\t\t\t</div>\n' +
    '        </b-card>\n' +
    '    </b-card-group>',
    methods:{
        buy: function(tovar){
            tovar.onCart++;
        }
    }
};



var form = new Vue({
	el: '.app',
	data:{
		tovar: [],
        lang: [],
        search: '',
        ifind: 0,
        L: 0,
		costSum: 0,
		filt: 3,
        searchCount: false,
		onShop: [],
        pass: '',
        admin: false
	},
    methods:{
        share: function () {
            /*var dt = JSON.stringify({"tovars": this.tovar});
            var request = axios.post('http://localhost:3000/tovars', {dt}).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });*/
        }
    },
    components: {
	  'tov-container' : tovarContainer
    },
	updated: function(){
	    if(this.pass=='admin'){
	        this.admin=true;
        } else

	    if(this.search!="") this.filt=0;
        else if((this.search=="")&&this.searchCount)this.filt=3;

		this.costSum = this.tovar.reduce((a, b) => {
				return Number(a) + Number(b.cost) * Number(b.onCart);
		}, 0);

    },
    created : function(){
        this.$http
            .get("http://localhost:3000/tovars")
            .then(function(response) {
                form.tovar = response.data;
            });
        this.$http
            .get("http://localhost:3000/languages")
            .then(function(response) {
                form.lang = response.data;
            });
	},
    computed: function () {
    }


});
