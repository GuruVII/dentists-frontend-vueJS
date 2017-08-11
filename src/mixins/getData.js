
import axios from "axios";
export default {
	methods: {
		getData: function(oe, offset, maxAvg,type,sortColumn, orderBy){
			axios.get(`https://dentist-backend.herokuapp.com/Dentists/${oe}&offset=${offset}&maxAvg=${maxAvg}&type=${type}&${sortColumn}=${orderBy}`, {
				})
				.then(response => {
					console.log(`http://localhost:3000/Dentists/${oe}&offset=${offset}&maxAvg=${maxAvg}&type=${type}&${sortColumn}=${orderBy}`)
					console.log("pushing data");
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

