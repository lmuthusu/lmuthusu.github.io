          
             
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
             satLayer =  L.tileLayer(mapboxUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});
             
             var mymap = L.map('mapid',{center:[ 32.326595,-106.775436],
                                        zoom:11,
                                    
                                        layers:[grayscale,streets]
                                       });
             var basemaps = {
                            "Grayscale": grayscale,
                            "Streets": streets,
                            "Satellite":satLayer,
                            
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

            //Adding County layer       
            var county_name = "Dona_Ana"
            var layerRef = ""
             
             var county = L.geoJSON(neighborhoods_json,{
                 
                 onEachFeature: function(feature, layer){
                     layer.on({
                        
                         click: function dothese(e){
                            county_name = feature.properties.county_name
                            county_name=county_name.replace(" ","_");
                             console.log(county_name)
                             layer.bindPopup(feature.properties.county_name)
                             if ($("#selectbox :selected").val() == "_1"){
                             myFunction()
                             }
                             else{
                                 myFunction_Future()
                             }
                         },
                         mouseover: highlightFeature,
                         mouseout: function resetHighlight(e) {
                            county.resetStyle(e.target);        
                             
                            }
                         
                     });
                                          
                 }                 
                 
             });
             
            // Adding River Basins
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
             
            // Add Water Planning Regions here
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

            // Add State Geojson Layer
             var new_mex_lyr = L.geoJSON(new_mex, {
                 onEachFeature: function(feature, layer){
                     
                     layer.on('click',function(e){
                     
                         mymap.setZoom(9)
                         layer.bindPopup(feature.properties.NAME00)

                            myFunction2()
                         
                      
                         
                     })
                     
                     
                     
                    
                 }
             });

//Event Change on Drop Down List Box

selectbox.onchange = onChangeFunc;
if($("#selectbox :selected").val() == "_1"){
   disable()
   }


var val_CM ="_GFDL";
$('#ClimateModel').change(function(){
   val_CM = $(this).val();
    if(layerRef=="State"){
    myFunction2_Future()
    }
    if(layerRef=="County"){
    myFunction_Future()
    }
    if(layerRef=="Basin"){
    myFunction4_Future()
    }
    if(layerRef=="WPR"){
    myFunction3_Future()
    }
})

var val_CM ="";
$('#AgLand').change(function(){
   val_AL = $(this).val();
    if(layerRef=="State"){
    myFunction2_Future()
    }
    if(layerRef=="County"){
    myFunction_Future()
    }
    if(layerRef=="Basin"){
    myFunction4_Future()
    }
    if(layerRef=="WPR"){
    myFunction3_Future()
    }
})

var val_Eff ="";
$('#Efficiency').change(function(){
   val_Eff = $(this).val();
    if(layerRef=="State"){
    myFunction2_Future()
    }
    if(layerRef=="County"){
    myFunction_Future()
    }
    if(layerRef=="Basin"){
    myFunction4_Future()
    }
    if(layerRef=="WPR"){
    myFunction3_Future()
    }
})

var val_PGR ="";
$('#PopGrowthRate').change(function(){
   val_PGR = $(this).val();
    if(layerRef=="State"){
    myFunction2_Future()
    }
    if(layerRef=="County"){
    myFunction2_Future()
    }
    if(layerRef=="Basin"){
    myFunction2_Future()
    }
    if(layerRef=="WPR"){
    myFunction2_Future()
    }
})



function onChangeFunc(){
                            console.log(layerRef)
                            if($("#selectbox :selected").val() == "_2"){
                            enable()
                            }
                            else if($("#selectbox :selected").val() == "_1"){
                                disable()
                                }
                            //For Historic and State layer on 
                             if(($("#selectbox :selected").val() == "_1") && (layerRef=="State")){
                            myFunction2() 
                                
                         }
                            // For Historic and County Layer on
                            else if (($("#selectbox :selected").val() == "_1") && (layerRef=="County")){
                                myFunction()
                               disable()
                            }
    
                            // For Historic and Basins layer on
                            else if (($("#selectbox :selected").val() == "_1") && (layerRef=="Basin")){
                                myFunction4()
                               disable()
                            }
    
                            // For Historic and WPR layer on
                            else if (($("#selectbox :selected").val() == "_1") && (layerRef=="WPR")){
                             myFunction3()
                            disable()
                            }
                            
                            // For Future and State layer on
                            else if(($("#selectbox :selected").val() == "_2") && (layerRef=="State")){
                            myFunction2_Future()
                            enable()
                            
                         }
                            // For Future and County layer on
                            else if (($("#selectbox :selected").val() == "_2") && (layerRef=="County")){
                                myFunction_Future()
                                enable()
                            }
    
                            // For Future and Basin layer on 
                            else if (($("#selectbox :selected").val() == "_2") && (layerRef=="Basin")){
                                myFunction4_Future()
                                enable()
                            }
    
                            // For Future and WPR layer on
                            else if (($("#selectbox :selected").val() == "_2") && (layerRef=="WPR")){
                             myFunction3()
                             enable()
                            }
    
                            // No layers on but event change occurs                 
                            else{
                                $("#chart1").html("");
                                $("#chart2").html("");
                                
                                }
}


// State_Historic
function myFunction2() { 
               layerRef = "State",
                $('#selectbox').val( "_1");
                $("#chart1").html("");
                $("#chart2").html("");
                
      
                 mymap.removeLayer(county)
                 mymap.removeLayer(s_basins)
                 mymap.removeLayer(wpr_NM)
                 mymap.removeLayer(new_mex_lyr)
               
                 new_mex_lyr.addTo(mymap);
    
     $("#field_name").html("New Mexico");
     $("#field_name1").html("New Mexico");
      draw("#chart1","data/Historic/State/State_Historic.csv")
      draw("#chart2","data/Historic/State/State_Historic_Uses.csv", 800)

}
console.log($("#ClimateModel :selected").val())

// State_Future
function myFunction2_Future() { 
               layerRef = "State",
                $("#chart1").html("");
                $("#chart2").html("");
                
    
     $("#field_name").html("New Mexico");
     $("#field_name1").html("New Mexico");
    
     var state_csv = "State"+$("#ClimateModel :selected").val()+$("#Efficiency :selected").val()
     + $("#PopGrowthRate :selected").val()+$("#AgLand :selected").val()
     console.log(state_csv); 
      draw("#chart1","data/Future/State/"+state_csv+".csv")
     

}


//Counties_Historic
 function myFunction() {
     
     
                layerRef = "County";
                $('#selectbox').val( "_1");
                $("#chart1").html("");
                $("#chart2").html("");
                 mymap.removeLayer(county)
                 mymap.removeLayer(s_basins)
    
                 mymap.removeLayer(wpr_NM)
                 mymap.removeLayer(new_mex_lyr)
                 
                 county.addTo(mymap);
     
    
    $("#field_name").html(county_name.replace(/_/g," "));
     $("#field_name1").html(county_name.replace(/_/g," "));
    draw("#chart1","data/Historic/Counties_Data/"+county_name+"_County_Historic.csv")
    draw("#chart2","data/Historic/Counties_Data/Uses/"+county_name+"_County_Historic_Uses.csv", 800)  
     
 }

//Counties_Future
 function myFunction_Future() {
     
     
                layerRef = "County";
                $('#selectbox').val( "_2");
                $("#chart1").html("");
                $("#chart2").html("");
     
     
        var county_csv = "_County"+$("#ClimateModel :selected").val()+$("#Efficiency :selected").val()
     + $("#PopGrowthRate :selected").val()+$("#AgLand :selected").val()
     console.log(county_csv); 
     
    
    $("#field_name").html(county_name.replace(/_/g," "));
     $("#field_name1").html(county_name.replace(/_/g," "));
    draw("#chart1","data/Future/Counties/"+county_name+county_csv+".csv") 
     
 }
//River Basins_Historic            
 function myFunction4() {
                
                 layerRef = "Basin"
               $('#selectbox').val( "_1");
                 $("#chart1").html("");
                $("#chart2").html("");
                 mymap.removeLayer(county)
                 mymap.removeLayer(s_basins)
                 mymap.removeLayer(wpr_NM)
                 mymap.removeLayer(new_mex_lyr)
                 s_basins.addTo(mymap);
                
    $("#field_name").html(basin_name.replace(/_/g," ")); 
    $("#field_name1").html(basin_name.replace(/_/g," "));
    draw("#chart1","data/Historic/RBs/"+basin_name+"_Rbasin_Historic.csv")
    draw("#chart2","data/Historic/RBs/Uses/"+basin_name+"_Rbasin_Historic_Uses.csv", 800) 
                }
//River Basins Future
 function myFunction4_Future() {
                
                 layerRef = "Basin"
               $('#selectbox').val( "_2");
                 $("#chart1").html("");
                $("#chart2").html("");

    var Rbasin_csv = "_Rbasin"+$("#ClimateModel :selected").val()+$("#Efficiency :selected").val()
     + $("#PopGrowthRate :selected").val()+$("#AgLand :selected").val()
     console.log(Rbasin_csv);               
    $("#field_name").html(basin_name.replace(/_/g," ")); 
    $("#field_name1").html(basin_name.replace(/_/g," "));
    draw("#chart1","data/Future/RBs/"+basin_name+Rbasin_csv+".csv")
 }

//Water Planning Regions_Historic           
 function myFunction3() {
               
               layerRef = "WPR";
               $('#selectbox').val( "_1");
                $("#chart1").html("");
                $("#chart2").html("");
                 mymap.removeLayer(county)
                 mymap.removeLayer(s_basins)
                 mymap.removeLayer(wpr_NM)
                 mymap.removeLayer(new_mex_lyr)
                 wpr_NM.addTo(mymap);
               
    $("#field_name").html(WPR_name.replace(/_/g," ")); 
    $("#field_name1").html(WPR_name.replace(/_/g," "));
    draw("#chart1","data/Historic/WPRs/"+WPR_name+"_WPR_Historic.csv")
    draw("#chart2","data/Historic/WPRs/Uses/"+WPR_name+"_WPR_Historic_Uses.csv", 800)
                }
//Water Planning Regions Future
function myFunction3() {
               
               layerRef = "WPR";
               $('#selectbox').val( "_1");
                $("#chart1").html("");
                $("#chart2").html("");

               
    $("#field_name").html(WPR_name.replace(/_/g," ")); 
    $("#field_name1").html(WPR_name.replace(/_/g," "));
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
             
function disable() {
    $('#ClimateModel').attr('disabled',true);
    $('#AgLand').attr('disabled',true);
    $('#Efficiency').attr('disabled',true);
    $('#PopGrowthRate').attr('disabled',true);
}
function enable() {
  $('#ClimateModel').attr('disabled',false);
  $('#AgLand').attr('disabled',false);
  $('#Efficiency').attr('disabled',false);
  $('#PopGrowthRate').attr('disabled',false);
}
 
