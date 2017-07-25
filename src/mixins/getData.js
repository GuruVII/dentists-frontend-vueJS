
import axios from "axios";
const getData = {
	methods: {
		getData: function(oe, offset, maxAvg,type,sortColumn, orderBy){
			axios.get(`http://localhost:3000/Dentists/${oe}&offset=${offset}&maxAvg=${maxAvg}&type=${type}&${sortColumn}=${orderBy}`, {
				})
				.then(response => {
					console.log(`http://localhost:3000/Dentists/${oe}&offset=${offset}&maxAvg=${maxAvg}&type=${type}&${sortColumn}=${orderBy}`)
					console.log("pushing data");
					let testArray = JSON.parse(response.data)
					this.tempArray = testArray.slice();
					console.log(testArray)
					console.log(this.tempArray)
					this.infiniteScroll();
				})
				.catch(error => {
					console.log("error happened")
					console.log(error);
				});
		}
	}
}

export {getData};
