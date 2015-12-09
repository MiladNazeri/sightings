var helper = {
    _filter(sourceObject, itemInSourceObject, itemInSourceObject2, filterByItem){
        if(arguments.length === 4){
            var sourceObject = sourceObject;
            var itemInSourceObject = itemInSourceObject;
            var itemInSourceObject2 = itemInSourceObject2;
            var filterByItem = arguments[arguments.length-1];
        }
        if(arguments.length === 3){
            var sourceObject = sourceObject;
            var itemInSourceObject = itemInSourceObject;
            var itemInSourceObject2 = null;
            var filterByItem = arguments[arguments.length-1];
        }
        var filterByItem = arguments[arguments.length-1];
        return sourceObject.filter( (item) => {
            if(!itemInSourceObject2)
                return item[itemInSourceObject] === filterByItem
            return item[itemInSourceObject][itemInSourceObject2] === filterByItem
        })
    },
    _matchIdWithName(id){
      for (var i = 0; i < this.state.allAnimalsSelect.length; i++){
        if(this.state.allAnimalsSelect[i].value === id) {
          return this.state.options[i].label
        }
      }
    },
    _sortByUser(){
        var setFilters = this._filter( this.state.allSightings, "userId", auth.getToken() )
        console.log("setFilters user", setFilters)
        this._initMap();
        this._setMarkersOnMap(setFilters);
    },
    _sortByAnimal(){
        var setFilters = this._filter( this.state.allSightings, "animal", "id", this.state.selectedFilterValue)
        console.log("setFilters animal", setFilters)
        this._initMap();
        this._setMarkersOnMap(setFilters)
    },
    _optionMaker(array, value, label){
        return array.map( (item) => {
            return {
                value: item[value],
                label: item[label]
            }
        })
    },
    _findById(objSearch, id){
        var search = objSearch.filter( (item) => {
            return item.id === id || item._id === id
        })
        return search[0]
    }




}


export default helper