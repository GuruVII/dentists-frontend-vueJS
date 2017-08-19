import _ from 'lodash';

export default {
	methods : { //_.throttle is from lodash and it throttles the eventlisteners from firing on every scroll event

		infiniteScroll: _.throttle(function(){
			//determines how far away you are from the top of the screen. It is written this way becuase none work in every browser.
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; 
			//if the screen is 200px from the edge or if the page jsut started (thus offset is 0), do the code
			if ((window.innerHeight + scrollTop) > (document.body.offsetHeight - 200)){
				let i = 0;
				let index;
				//this loops pushes data from the tempArray to the masterArray, while accounting for how far we've gone though the tempArray
				do {	
					index = this.infiniteScrollPage * this.infiniteScrollPerPage + i
					i++
					//these are the conditions which need to be met if we want another entry pushed into the masterArray. 
					//The part after || is there to catch the occasion when tempArray is shorter than 100 entries
					if ((this.tempArray[index] != undefined && (this.tempArray.length <= 100 && ((this.masterArray.length%100) < this.tempArray.length)))){
						this.masterArray.push(this.tempArray[index])
					}
					else {
						return
					};

				}
				while (i < this.infiniteScrollPerPage)
				window.scrollTo(0,document.body.scrollHeight);
				//checks if the entire tempArray has be traversed, if so gets new data for the temp array
				if ((((this.infiniteScrollPage + 1) * this.infiniteScrollPerPage) % this.infiniteScrollOffset) == 0 ){
					// increase the currentoffset and reset the page and temporaryArray
					this.infiniteScrollCurrentOffset += this.infiniteScrollOffset;
					this.infiniteScrollPage = 0;
					//oe, offset, maxAvg,Dentisttype,sortColumn, orderBy
					this.getData(this.filters.oe, this.infiniteScrollCurrentOffset, 100, this.filters.dentistType, this.filters.sortColumn, this.filters.sortType);
				}
				else {
					this.infiniteScrollPage++
				}
				
			}
			// timeout between events
		}, 500)

	}
}