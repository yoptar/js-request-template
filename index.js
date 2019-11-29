
function escapeHTML(text) {
    let div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

function send(url, payload){
    return Vue.http.post(self.url, payload);
}

let hash = window.location.hash.replace('#', '');
let browserLang = (navigator.language || navigator.userLanguage).substr(0, 2);

let vue = new Vue({
    el: '#app',
    data: {
        message: 'fuck!',
        response: '15'
    },
    methods: {
        send(){
            const that = this;
            $('#pleaseWaitDialog').modal({backdrop: 'static', keyboard: false, show: true});
            const minWait = new Promise(resolve => setTimeout(resolve, 200));

            Vue.http.get('request-dummy.json', {params: {data: this.message}}).then(function(response){
                console.dir(response);
                that.response = JSON.stringify(response.body);
                return Vue.nextTick();
            }).then(function(){
                return minWait;
            }).then(function(){
                $('#pleaseWaitDialog').modal('hide');
                return Vue.nextTick();
            })
        }
    }
});

$('#app').css('visibility', 'visible');