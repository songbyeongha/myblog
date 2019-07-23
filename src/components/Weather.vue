<template>
    <div>
        <tr>
            <td><img v-bind:src=imgUrl></td>
            <td class="weatherText">날씨 : {{description}} <br> 온도 : {{temp}}</td>
        </tr>
    </div>
</template>

<script>
import axios from "axios";

export default {
	name : "weather",
	data (){
		return {
			lat : 35,
			lon : 139,
			url : "",
			imgUrl : "",
			description : "test",
			temp : 0
		};
	},
	mounted:function(){
		this.getWeather();
	},
	methods : {
		getWeather:function(){
			navigator.geolocation.getCurrentPosition(position => {
				var position = position.coords;
				this.lat=position["latitude"];
				this.lon=position["longitude"];
				axios({
					method: "GET",
					url : "http://api.openweathermap.org/data/2.5/weather?lat="+this.lat+"&lon="+this.lon+"&lang=kr&appid=fe5db9c3c3d867c810fbc9031ffc655f"
				}).then((response) => {
					this.temp = Math.round(response.data.main.temp-273);
					this.description = response.data.weather[0].description;
					this.imgUrl = "http://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png";
				}).catch((ex)=> {
					console.log("ERR!!!!! : ", ex);
				});
			});
		}
	}
};
</script>

<style>
.weatherText{
    vertical-align: middle;
}
</style>
