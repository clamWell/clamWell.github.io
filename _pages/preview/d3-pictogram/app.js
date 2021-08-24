$(function(){

	var screenWidth = $(window).width(),
		screenHeight = $(window).height();
	var randomRange = function(n1, n2) {
		return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
	};
	
	function makePictogram(){

		

		var chart_svg = d3.select("#CHART");
		var width = 800,
			height= 600
		var picSize = 25;
		var picMargin = 5; 
		var yearBoxHeight = picSize * 5;
		var lineMaxNum = Math.round(width / ( picSize +picMargin));

		var data = accData; // json 배열 데이터 가져옴
		var dataByyear = d3
		  .nest()
		  .key(function(d){return d.year})
		  .entries(data)
		console.log(dataByyear);

		var makeXcor = function(i) {
			return (i % lineMaxNum) * (picSize +picMargin);
		};
		var makeYcor = function(i) {
			return parseInt(i / lineMaxNum) * (picSize +picMargin)
		};
		
		dataByyear.forEach(function(v,i,a){
			var eachYear = v;
			eachYear.values.forEach(function(v,i,a){
				v.xPos = makeXcor(i);
				v.yPos = makeYcor(i);
			});
		});

		chart_svg.attr("width", width +"px" )
			.attr("height", height +"px");

		var chart_holder = chart_svg.append("g")
			.attr("class","chart-holder");

		var yearGroups = chart_holder.selectAll("g")
							.data(dataByyear)
							.enter()
							.append("g")
							.attr("class", "group-by-year")
		yearGroups.attr("transform", function(d,i){
			return "translate(0, "+ (yearBoxHeight+30)*i +")";
		});
		
		var yearLabel = yearGroups.append("text")
				.attr("x", -10)
				.attr("y", -25 )
				.attr("text-anchor", "start")
				.attr("font-size", 13)
				.attr("fill", "#444")
				.attr("font-weight", "bold")
				.text(function(d){ return d.key +" / "+ d.values.length+" 건"});


		var pic_container = yearGroups.append("g")
								.attr("class", "pic-holder")
		var pic_cell = pic_container.selectAll("g")
						.data(function(d){
							return d.values;
						}).enter()
						.append("g")
						.attr("class", function(d){
							var type;
							var assil;
							if(d.type=="성희롱"){
								type="haras";
							}else if(d.type=="성추행"){
								type="assault";
							}else if(d.type=="성폭행"){
								type="r";
							}

							if(d.assiliant == "교수"){
								assil="prof";
							}else if(d.assiliant == "조교, 강사"){
								assil="ta";
							}else if(d.assiliant == "직원"){
								assil="staff";
							}
							return "each-pic pic-type-"+type+" pic-assiliant-"+assil;
						});

		
		pic_cell.attr("transform", function(d,i){
			/*
			var x = (i % lineMaxNum) * (picSize +picMargin);
			var y = parseInt(i / lineMaxNum) * (picSize +picMargin);*/
			var x = randomRange(-screenWidth, screenWidth*1.5);
			var y = randomRange(-screenHeight,screenHeight*1.5);
			
			return "translate("+x+","+y+")";
		});
		pic_cell.style("opacity","0.2");

		pic_cell.append("circle").attr("cx","0")
			.attr("cy","0")
			.attr("r", picSize/2);

		pic_cell.append("path")
			.attr("d", function(d) {
				var path_d;
				if(d.assiliant == "교수"){
					path_d = pathArr[0];
				}else if(d.assiliant == "조교, 강사"){
					path_d = pathArr[1];
				}else if(d.assiliant == "직원"){
					path_d = pathArr[2];
				}
				return path_d;
			 
			})


		pic_cell.on("mouseover", function(d) {
			d3.select(this).select("circle")
				.style("stroke", "#fff")
				.style("stroke-width", "2px")
		}).on("mouseout", function(d){
			d3.select(this).select("circle")
				.style("stroke-width", "0px")
		});

		var makeAnimation = function() {
			pic_cell.transition()
			  .duration(function() {
				return Math.floor(Math.random() * 2000) + 1500
			  })
			  .attr("transform", function(d, i) {
				return "translate(" + d.xPos + "," + d.yPos + ")";
			  }).style("opacity","1")
		 };

		console.log("픽토그램 chart를 성공적으로 그렸습니다");
		makeAnimation();

	};

	makePictogram();

	$(".btn-acc-type li").on("click", function(){
		if($(this).hasClass("on")){
			$(".btn-acc-type li").removeClass("on");
			$(".each-pic").css({"opacity":"1"});
		}else{
			var type = $(this).attr("data-id");
			$(".btn-acc-type li").removeClass("on");
			$(this).addClass("on");
			$(".each-pic").css({"opacity":"0.2"});
			if(type=="type01"){
				$(".pic-type-haras").css({"opacity":"1"});
			}else if(type=="type02"){
				$(".pic-type-assault").css({"opacity":"1"});
			}else{
				$(".pic-type-r").css({"opacity":"1"});
			}
		}
	});

	$(".btn-acc-assil li").on("click", function(){
		if($(this).hasClass("on")){
			$(".btn-acc-assil li").removeClass("on");
			$(".each-pic").css({"opacity":"1"});
		}else{
			var type = $(this).attr("data-id");
			$(".btn-acc-assil li").removeClass("on");
			$(this).addClass("on");
			$(".each-pic").css({"opacity":"0.2"});
			if(type=="prof"){
				$(".pic-assiliant-prof").css({"opacity":"1"});
			}else if(type=="ta"){
				$(".pic-assiliant-ta").css({"opacity":"1"});
			}else{
				$(".pic-assiliant-staff").css({"opacity":"1"});
			}
		}
	});

});