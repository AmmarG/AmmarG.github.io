var varMap;
var postfix;   
var isInPlayMode=false;
function initVideoJsAR(videoIdName, idPostFix , videoLable, pageCategoryVID) {
	
		varMap = {};
		varMap['isPlayed'+idPostFix]=false;
		varMap['is25Percent'+idPostFix]=false;
		varMap['is50Percent'+idPostFix]=false;
		varMap['is75Percent'+idPostFix]=false;
		varMap['iscompleted'+idPostFix]=false;
		postfix = idPostFix;
		
		var videlement = document.getElementById(videoIdName+idPostFix);
		
		console.log('varMap vidplayer'+idPostFix);
		var isInPlayMode=false;
		var startEvent = 'click';
		var enableAutoPlay=videlement.getAttribute('enableAutoplay')=='1'?true:false;
		var allowControld=videlement.getAttribute('data-control')=='controls'?true:false;
		console.log('videlement autoplay'+enableAutoPlay);
		if (navigator.userAgent.match(/iPhone/i) ||
		    navigator.userAgent.match(/iPad/i) ||
		    navigator.userAgent.match(/Android/i)) {
		   
			startEvent = 'touchend';
		    enableAutoPlay=false;
		
		}
		
			
		varMap['vidplayer'+idPostFix] = videojs(videoIdName+idPostFix, { autoplay:enableAutoPlay, controls:allowControld }, function() {
	
			
			//strategy = new HtmlVideoStrategy(this);
			// Push the strategy constructor to Chartbeat
			if (typeof HtmlVideoStrategy !== "undefined") { 

				window['_cbv_strategies'] = window['_cbv_strategies'] || [];
				window['_cbv_strategies'].push(HtmlVideoStrategy);
			}
			var playertmp = this;
	    	// console.log('vidplayer go '+ videoIdName+idPostFix);
	    	var rnd = Math.floor((Math.random()*100000000000)+1); 
	    	console.log("pageCategoryVID"+pageCategoryVID);
	    	
	    	google.ima.settings.setVpaidAllowed(true);
			
	    	this.ima({ id: videoIdName+idPostFix,
					   vpaidMode: google.ima.ImaSdkSettings.VpaidMode.INSECURE ,
		  		       //adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/7229/alarabiya.net'+pageCategoryVID+'&ciu_szs=300x250,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=' + rnd
		  		       adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/7229/alarabiya.net'+pageCategoryVID+'&description_url=https://www.alarabiya.net&env=vp&impl=s&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x360&ciu_szs=300x250,728x90,320x100,320x50,970x250,970x90,300x600&unviewed_position_start=1&ad_rule=0&cust_params=platform%3Dweb&correlator=' + rnd 
		  		       //contribAdsSettings: { timeout: 3000} 
		  			  });
		
		
		
		
			// Initialize the ad container when the video player is clicked, but
			// only the
			// first time it's clicked.
			
			
			
			
			if(enableAutoPlay){
				this.one('ready', function() {
					console.log(' enableAutoPlay startEvent');
			    	this.ima.initializeAdDisplayContainer();
			    	console.log('enableAutoPlay startEvent initializeAdDisplayContainer');
			    	this.ima.requestAds();
			    	console.log('enableAutoPlay  startEvent requestAds');
			    	
			    
			    	
				});
			}else{
				this.one(startEvent, function() {
					console.log('mob startEvent');
			    	this.ima.initializeAdDisplayContainer();
			    	console.log('startEvent initializeAdDisplayContainer');
			    	this.ima.requestAds();
			    	console.log('mob startEvent requestAds');
			    	
			    	if(!isInPlayMode){				
						playertmp.play();
					}	
			    	
			    	
				});
			}

			this.on('timeupdate', function(){ 
				//console.log('timeupdate');
				calculateDurationPassed(this, idPostFix, videoLable ); 
			
			} );
			
			this.on('adserror',function() {

				console.log("ads error no ad available");
				var imasCon= document.getElementsByClassName("ima-ad-container");
				var i;
				for (i = 0; i < imasCon.length; i++) {
					imasCon[i].style.visibility = 'hidden';
				} 
				if(!isInPlayMode){				
			    	this.play();
				}	
			});
			
			this.on('error',function() {console.log("error no video"+this.error());});
			
			this.on('play',function() { 
				console.log("play start"); 
				isInPlayMode=true;
				if(!varMap['isPlayed'+idPostFix]) 
					{ 
						varMap['isPlayed'+idPostFix]=true; 
						ga_track("video", 'plays', videoLable);
					}
			});
			
			this.on('seeking', function() {
                console.log("seeking...");
				playertmp.play();
            });
			//this.on('ended',function() {  ga_track("video", "completes", videoLable);  });
			
			this.on('canplay',function() { ga_track("video", 'loads', videoLable); });						      

			var _cbv = window._cbv || (window._cbv = []);
	        _cbv.push(playertmp); // push player to chartbeat	 
	        
		});
	}


function ga_track(category, action, lable) {
    console.log("ga_track("+category+" , "+action + "," +lable+") ");
    tlbl=lable;
    if(!lable){
    tlbl=window.location.pathname;
    }

    var dtlayer = {};
    dtlayer['ga_eventCategory'] = category;
    dtlayer['ga_eventAction'] = action;
    dtlayer['ga_eventLabel'] = tlbl;
    dtlayer['ga_isInteractionEvent'] = false;
    dtlayer['event'] = 'ga_event';
    dtlayer['mtr_mediaViews'] = 0;
    if (action == "loads") dtlayer['mtr_mediaViews'] = 1;
   adStat.push(dtlayer);
}

function calculateDurationPassed(player , idPostFix, vLbl){

	dur= player.duration();
	currT = player.currentTime();

	//console.log('calculateDurationPassed currT='+currT + " dur="+dur);
	    if(!varMap['is25Percent'+idPostFix]  && currT/dur>0.25){
	    ga_track("video", "milestone25", vLbl);
	    varMap['is25Percent'+idPostFix]=true;
	    }

	    if(!varMap['is50Percent'+idPostFix]  && currT/dur>0.5){
	    ga_track("video", "milestone50", vLbl);
	    varMap['is50Percent'+idPostFix]=true;
	    }   

	    if(!varMap['is75Percent'+idPostFix]  && currT/dur>0.75){
	    ga_track("video", "milestone75", vLbl);
	    varMap['is75Percent'+idPostFix]=true;
	    }
	    
	    if(!varMap['is95Percent'+idPostFix]  && currT/dur>0.95){
		    ga_track("video", "milestone95+", vLbl);
		    varMap['is95Percent'+idPostFix]=true;
		}
	}
