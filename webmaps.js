          
             
 function activateFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Whack fullscreen
function deactivateFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

document.addEventListener('fullscreenchange', (event) => {
  if (document.fullscreenElement) {
    console.log('Entered fullscreen:', document.fullscreenElement);
      console.log("lalitha")
  } else {
    console.log('Leaving full-screen mode.');
  }
});

               
             
             var mapboxUrl= 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG11dGh1c3UiLCJhIjoiY2s5OWxrcDFjMXRoZjNpbXlvcnRidnV4aCJ9.k6iha7ExlfFxu9pNG7XwtA'
             var mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
             var grayscale = L.tileLayer(mapboxUrl, {id: "mapbox/dark-v9", tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
             streets   = L.tileLayer(mapboxUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});
             
             var mymap = L.map('mapid',{center:[ 32.326595,-106.775436],
                                        zoom:11,
                                        layers:[grayscale,streets]
                                       });
             var basemaps = {
                            "Grayscale": grayscale,
                            "Streets": streets
                            
                            };
             
             
              var markerslayer= L.control.layers(basemaps);
              markerslayer.addTo(mymap);
             
             function zoomToFeature(e) {
                mymap.fitBounds(e.target.getBounds());
                }
             
             function highlightFeature(e) {
                var layer = e.target;

                 layer.setStyle({
                     weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                 });

                 if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                     layer.bringToFront();
                 }
                }
             
             
             // add the search bar to the map
            var controlSearch = new L.Control.Search({
                position:'topleft',    // where do you want the search bar?
                layer: markerslayer,  // name of the layer
                initial: false,
                zoom: 11,        // set zoom to found location when searched
                marker: false,
                textPlaceholder: 'search...' // placeholder while nothing is searched
            });
        
             mymap.addControl(controlSearch); // add it to the map

            var county_name = "Dona_Ana"
             
             var county = L.geoJSON(neighborhoods_json,{
                 onEachFeature: function(feature, layer){              
                     layer.on({
                         
                         click: function dothese(e){
                            county_name = feature.properties.county_name
                            county_name=county_name.replace(" ","_");
                             console.log(county_name)
                             layer.bindPopup(feature.properties.county_name)
                             myFunction()
                         },
                         mouseover: highlightFeature,
                         mouseout: function resetHighlight(e) {
                            county.resetStyle(e.target);        
                             
                            }                   
                     });
                                          
                 }                 
                 
             });
             
             var basin_name = "Lower_Colorado"
             var s_basins = L.geoJSON(basins, {
                 onEachFeature: function(feature, layer){
                     
                     
                     
                      layer.on({
                         click: function dothese(e){
                            basin_name = feature.properties.NAME
                             basin_name = basin_name.replace(/ /g, "_");
                             console.log(basin_name)
                            layer.bindPopup(feature.properties.NAME)
                             myFunction4()
                         },
                         mouseover: highlightFeature,
                         mouseout: function resetHighlight(e) {
                            s_basins.resetStyle(e.target);
                             
                            }
                     });
                 }
             });
             
            var WPR_name = "Southwest"
             var wpr_NM = L.geoJSON(wpr_json,{
                 
                 onEachFeature: function(feature, layer){
                    
                     
                     layer.on({
                         click: function dothese(e){
                             WPR_name = feature.properties.name
                             WPR_name = WPR_name.replace(/ /g, "_");
                             console.log(WPR_name)
                             layer.bindPopup(feature.properties.name)
                             myFunction3()
                         },
                             
                         mouseover: highlightFeature,
                         mouseout: function resetHighlight(e) {
                            wpr_NM.resetStyle(e.target);
                       
                            }
                     });
                    
                 }
             });


             var new_mex_lyr = L.geoJSON(new_mex, {
                 onEachFeature: function(feature, layer){
                     
                     layer.on('click',function(e){
                         mymap.setZoom(9)
                         layer.bindPopup(feature.properties.NAME00)
                         myFunction2() 
                     })
                     
                    
                 }
             });

// State
function myFunction2() {
               
                $("#chart1").html("");
                $("#chart2").html("");
                
      
                 mymap.removeLayer(county)
                 mymap.removeLayer(s_basins)
                 mymap.removeLayer(wpr_NM)
                 mymap.removeLayer(new_mex_lyr)
               
                 new_mex_lyr.addTo(mymap);
    
      draw("#chart1","data/Historic/State/State_Historic.csv")
      draw("#chart2","data/Historic/State/State_Historic_Uses.csv", 800)

}

//Counties

 function myFunction() {
     
                $("#chart1").html("");
                $("#chart2").html("");
                 mymap.removeLayer(county)
                 mymap.removeLayer(s_basins)
    
                 mymap.removeLayer(wpr_NM)
                 mymap.removeLayer(new_mex_lyr)
                 
                 county.addTo(mymap);

    draw("#chart1","data/Historic/Counties_Data/"+county_name+"_County_Historic.csv")
    draw("#chart2","data/Historic/Counties_Data/Uses/"+county_name+"_County_Historic_Uses.csv", 800)  
     
 }
            
//Water Planning Regions
             
            function myFunction4() {
                 $("#chart1").html("");
                $("#chart2").html("");
                 mymap.removeLayer(county)
                 mymap.removeLayer(s_basins)
                 mymap.removeLayer(wpr_NM)
                 mymap.removeLayer(new_mex_lyr)
                 s_basins.addTo(mymap);
                
     draw("#chart1","data/Historic/RBs/"+basin_name+"_Rbasin_Historic.csv")
    draw("#chart2","data/Historic/RBs/Uses/"+basin_name+"_Rbasin_Historic_Uses.csv", 800) 
                }
             
           function myFunction3() {
                $("#chart1").html("");
                $("#chart2").html("");
                 mymap.removeLayer(county)
                 mymap.removeLayer(s_basins)
                 mymap.removeLayer(wpr_NM)
                 mymap.removeLayer(new_mex_lyr)
                 wpr_NM.addTo(mymap);
    draw("#chart1","data/Historic/WPRs/"+WPR_name+"_WPR_Historic.csv")
    draw("#chart2","data/Historic/WPRs/Uses/"+WPR_name+"_WPR_Historic_Uses.csv", 800)
                }

        function popupfunc(name){
            var popup = L.popup()
            .setContent(name)
            .openOn(mymap);
        }
             
           
             
             
             
            var lc = L.control.locate({
            position: 'topright',
            strings: {
            title: "Show me where I am, yo!"
            }
            }).addTo(mymap);
            
            function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
        }
             
             
 
