
import axios from "axios";
export default {
	methods: {
		getData: function(oe, offset, maxAvg,type,sortColumn, orderBy){
			// http://localhost:3000 or https://front-end.guru/
			axios.get(`https://front-end.guru/dentists/API/V1/${oe}&offset=${offset}&maxAvg=${maxAvg}&type=${type}&${sortColumn}=${orderBy}`, {
				})
				.then(response => {
					this.tempArray = JSON.parse(response.data)
					this.infiniteScroll();
				})
				.catch(error => {
					console.log("error happened")
					console.log(error);
				});
		}
	}
}

