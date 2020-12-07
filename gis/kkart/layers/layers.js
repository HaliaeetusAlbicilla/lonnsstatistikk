var wms_layers = [];

var format_kommune19dataNK_0 = new ol.format.GeoJSON();
var features_kommune19dataNK_0 = format_kommune19dataNK_0.readFeatures(json_kommune19dataNK_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kommune19dataNK_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_kommune19dataNK_0.addFeatures(features_kommune19dataNK_0);
var lyr_kommune19dataNK_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_kommune19dataNK_0, 
                style: style_kommune19dataNK_0,
                interactive: true,
    title: 'kommune19dataNK<br />\
    <img src="styles/legend/kommune19dataNK_0_0.png" /> 0 - 568<br />\
    <img src="styles/legend/kommune19dataNK_0_1.png" /> 568 - 1137<br />\
    <img src="styles/legend/kommune19dataNK_0_2.png" /> 1137 - 1705<br />\
    <img src="styles/legend/kommune19dataNK_0_3.png" /> 1705 - 2273<br />\
    <img src="styles/legend/kommune19dataNK_0_4.png" /> 2273 - 2842<br />\
    <img src="styles/legend/kommune19dataNK_0_5.png" /> 2842 - 3410<br />\
    <img src="styles/legend/kommune19dataNK_0_6.png" /> 3410 - 3978<br />\
    <img src="styles/legend/kommune19dataNK_0_7.png" /> 3978 - 4547<br />\
    <img src="styles/legend/kommune19dataNK_0_8.png" /> 4547 - 5115<br />\
    <img src="styles/legend/kommune19dataNK_0_9.png" /> 5115 - 5683<br />\
    <img src="styles/legend/kommune19dataNK_0_10.png" /> 5683 - 6252<br />\
    <img src="styles/legend/kommune19dataNK_0_11.png" /> 6252 - 6820<br />\
    <img src="styles/legend/kommune19dataNK_0_12.png" /> 6820 - 7388<br />\
    <img src="styles/legend/kommune19dataNK_0_13.png" /> 7388 - 7957<br />\
    <img src="styles/legend/kommune19dataNK_0_14.png" /> 7957 - 8525<br />'
        });

lyr_kommune19dataNK_0.setVisible(true);
var layersList = [lyr_kommune19dataNK_0];
lyr_kommune19dataNK_0.set('fieldAliases', {'Kommune': 'Kommune', 'Kroner per innbygger': 'Kroner per innbygger', 'Lønnskostnader totalt (kr)': 'Lønnskostnader totalt (kr)', 'Andel av budsjettet (%)': 'Andel av budsjettet (%)', });
lyr_kommune19dataNK_0.set('fieldImages', {'Kommune': 'TextEdit', 'Kroner per innbygger': 'TextEdit', 'Lønnskostnader totalt (kr)': 'TextEdit', 'Andel av budsjettet (%)': 'TextEdit', });
lyr_kommune19dataNK_0.set('fieldLabels', {'Kommune': 'header label', 'Kroner per innbygger': 'inline label', 'Lønnskostnader totalt (kr)': 'inline label', 'Andel av budsjettet (%)': 'inline label', });
lyr_kommune19dataNK_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});