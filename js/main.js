var localstorage_key = "shadowvisdb";

var defaultModel = [
	{
		shadowX: -2,
        shadowY: -2,
        spread: 0,
        blur: 10,
        shadowInset: false,
        shadowColor: "#fdfdfd"
	},
	{
		shadowX: 2,
        shadowY: 2,
        spread: 0,
        blur: 4,
        shadowInset: false,
        shadowColor: "#686868"
	}
];


var app = new Vue({
    el: "#app",
    data: {
    	shadowModel: defaultModel,
        boxColor: "#F5F5F5",
        bgColor: "#F0F0F0",
        boxRadius: "5",
        saveBtnText: "save"
    },
    methods: {
    	addLayer: function(){
    		this.shadowModel.push({
     	 	  shadowX: 0,
     		   shadowY: 0,
     		   spread: 0,
       		 blur: 0,
      		  shadowInset: false,
      	 	 shadowColor: "#000000"
			});
    	},
    	removeLayer: function(i){
    		if(this.shadowModel.length < 2) return;
    		this.shadowModel.splice(i, 1);
    	},
    	save: function(){
    		var tempObj = {
    			model: this.shadowModel,
    			boxColor: this.boxColor,
     		   boxRadius: this.boxRadius,
     		   bgColor: this.bgColor
    		}
    		localStorage.setItem(localstorage_key, JSON.stringify(tempObj))
    		this.saveBtnText = "saved!";
    		var $this = this;
    		setTimeout(function(){ $this.saveBtnText = "save" }, 2000);
    	}
    },
    mounted: function(){
    	var data = localStorage.getItem(localstorage_key);
    	if(!data) return
    	try{
    		data = JSON.parse(data);
    	}catch(e){
    		return
    	}
    	if((typeof data.model) == "object"){
    		this.shadowModel = data.model;
    	}
    	this.boxColor = data.boxColor || this.boxColor;
    	this.boxRadius = data.boxRadius || this.boxRadius;
   	 this.bgColor = data.bgColor || this.bgColor;
    },
    computed: {
    	shadows: function(){
  	  	var s = "";
    		for(var i = 0; i < this.shadowModel.length; i++){
    			s += this.shadowModel[i].shadowInset? ", inset " : ", ";
    			s += this.shadowModel[i].shadowX + "px " + this.shadowModel[i].shadowY + "px " + this.shadowModel[i].blur + "px " + this.shadowModel[i].spread + "px " + this.shadowModel[i].shadowColor;
    	    }
    		return s.substring(2);
   	}
   }
});
