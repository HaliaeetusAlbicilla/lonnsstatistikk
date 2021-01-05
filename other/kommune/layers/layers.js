ol.proj.proj4.register(proj4);
ol.proj.get("EPSG:4326").setExtent([-77299.000000, 6448400.010000, 1115103.360000, 7939978.000000]);
var wms_layers = [];

var format_BelpperinnbyggerNOK_0 = new ol.format.GeoJSON();
var features_BelpperinnbyggerNOK_0 = format_BelpperinnbyggerNOK_0.readFeatures(json_BelpperinnbyggerNOK_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_BelpperinnbyggerNOK_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BelpperinnbyggerNOK_0.addFeatures(features_BelpperinnbyggerNOK_0);
var lyr_BelpperinnbyggerNOK_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_BelpperinnbyggerNOK_0, 
                style: style_BelpperinnbyggerNOK_0,
                interactive: true,
    title: 'Beløp per innbygger (NOK)<br />\
    <img src="styles/legend/BelpperinnbyggerNOK_0_0.png" /> 0 - 622<br />\
    <img src="styles/legend/BelpperinnbyggerNOK_0_1.png" /> 622 - 777<br />\
    <img src="styles/legend/BelpperinnbyggerNOK_0_2.png" /> 777 - 882<br />\
    <img src="styles/legend/BelpperinnbyggerNOK_0_3.png" /> 882 - 1015<br />\
    <img src="styles/legend/BelpperinnbyggerNOK_0_4.png" /> 1015 - 1208<br />\
    <img src="styles/legend/BelpperinnbyggerNOK_0_5.png" /> 1208 - 1509<br />\
    <img src="styles/legend/BelpperinnbyggerNOK_0_6.png" /> 1509 - 8525<br />'
        });
var format_Andelavbudsjett_1 = new ol.format.GeoJSON();
var features_Andelavbudsjett_1 = format_Andelavbudsjett_1.readFeatures(json_Andelavbudsjett_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_Andelavbudsjett_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Andelavbudsjett_1.addFeatures(features_Andelavbudsjett_1);
var lyr_Andelavbudsjett_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Andelavbudsjett_1, 
                style: style_Andelavbudsjett_1,
                interactive: true,
    title: 'Andel av budsjett (%)<br />\
    <img src="styles/legend/Andelavbudsjett_1_0.png" /> 0 - 0,5<br />\
    <img src="styles/legend/Andelavbudsjett_1_1.png" /> 0,5 - 1,1<br />\
    <img src="styles/legend/Andelavbudsjett_1_2.png" /> 1,1 - 1,6<br />\
    <img src="styles/legend/Andelavbudsjett_1_3.png" /> 1,6 - 2,1<br />\
    <img src="styles/legend/Andelavbudsjett_1_4.png" /> 2,1 - 3<br />\
    <img src="styles/legend/Andelavbudsjett_1_5.png" /> 3 - 4,9<br />\
    <img src="styles/legend/Andelavbudsjett_1_6.png" /> 4,9 - 7,5<br />'
        });

lyr_BelpperinnbyggerNOK_0.setVisible(false);lyr_Andelavbudsjett_1.setVisible(true);
var layersList = [lyr_BelpperinnbyggerNOK_0,lyr_Andelavbudsjett_1];
lyr_BelpperinnbyggerNOK_0.set('fieldAliases', {'Kommune': 'Kommune', 'Beløp': 'Beløp', 'Andel av budsjett': 'Andel av budsjett', 'Beløp per innbygger': 'Beløp per innbygger', });
lyr_Andelavbudsjett_1.set('fieldAliases', {'Kommune': 'Kommune', 'Beløp': 'Beløp', 'Andel av budsjett': 'Andel av budsjett', 'Beløp per innbygger': 'Beløp per innbygger', });
lyr_BelpperinnbyggerNOK_0.set('fieldImages', {'Kommune': 'TextEdit', 'Beløp': 'TextEdit', 'Andel av budsjett': 'TextEdit', 'Beløp per innbygger': 'TextEdit', });
lyr_Andelavbudsjett_1.set('fieldImages', {'Kommune': 'TextEdit', 'Beløp': 'TextEdit', 'Andel av budsjett': 'TextEdit', 'Beløp per innbygger': 'TextEdit', });
lyr_BelpperinnbyggerNOK_0.set('fieldLabels', {'Kommune': 'header label', 'Beløp': 'inline label', 'Andel av budsjett': 'inline label', 'Beløp per innbygger': 'inline label', });
lyr_Andelavbudsjett_1.set('fieldLabels', {'Kommune': 'header label', 'Beløp': 'inline label', 'Andel av budsjett': 'inline label', 'Beløp per innbygger': 'inline label', });
lyr_Andelavbudsjett_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});