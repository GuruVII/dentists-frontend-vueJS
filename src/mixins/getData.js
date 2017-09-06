import axios from 'axios';
export default {
    methods: {
        getData: function(oe, offset, maxAvg, type, sortColumn, orderBy){
            //events tells the app that is is currently loading data
            this.$emit('loadingDataEvent', true)
            //there is currently not problem with loading data
            this.$emit('loadingDataErrorEvent', false)
            // http://localhost:3000 or https://front-end.guru/
            axios.get(`https://front-end.guru/dentists/API/V1/${oe}&offset=${offset}&maxAvg=${maxAvg}&type=${type}&${sortColumn}=${orderBy}`, {
            })
            .then(response => {
                this.tempArray = JSON.parse(response.data);
                this.infiniteScroll();
                //this tell the app.vue that the page is no longer loading data.
                this.$emit('loadingDataEvent', false)
            })
            .catch(error => {
                console.log('error happened');
                console.log(error);
                //there is a problem loading data
            this.$emit('loadingDataErrorEvent', true)
            });
        },
    },
};
