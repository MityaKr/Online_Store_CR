//import tovar from './tovar.json';

Vue.prototype.$http = axios;

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
    '      <b-button v-if="!cart" @click="buy(tovar)" :disabled="tovar.onCart>=tovar.value" variant="primary">\n' +
    '          <i class="material-icons">add_shopping_cart</i>\n' +
    '\t\t\t</b-button>\n' +
    '      <button v-if="cart" class="btn btn-success" @click="tovar.onCart++" :disabled="tovar.onCart>=tovar.value">+</button>\n' +
    '      <button v-if="cart" class="btn btn-danger" @click="tovar.onCart--" :disabled="tovar.onCart<=0">-</button>\n' +
    '\t\t\t</div>\n' +
    '        </b-card>\n' +
    '    </b-card-group>',
    methods:{
        buy: function(tovar){
            tovar.onCart++;
        }
    }
};



//tovar.forEach(tovar => { console.log(x.firstname, x.lastname); });

var form = new Vue({
	el: '.app',
	data:{
		tovar: [],
		costSum: 0,
		catShow: false,
		firmShow: false,
		filt: 3,
		onShop: [],
		category: ['Product', 'Technics', 'Furniture', 'Accessories'],
		firm: ['Masung', 'PufCom', 'LG', 'Nokia', 'Kozel'],

	},
    components: {
	  'tov-container' : tovarContainer
    },
	updated: function(){

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
	}


});
