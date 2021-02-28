function initMap () {
  const map = new google.maps.Map(document.getElementById('map'))
  const bounds = new google.maps.LatLngBounds()
  // Bounds taken from here https://gist.github.com/graydon/11198540
  bounds.extend({ lng: 8.08997684086, lat: 54.8000145534 })
  bounds.extend({ lng: 12.6900061378, lat: 57.730016588 })
  map.fitBounds(bounds)

  const data = getData()
  data
    .filter(({ booking }) => !!booking)
    .forEach(({ marker }) => {
      marker.setMap(map)
    })
}

// Data is inside a function because it uses the google api which needs to be ready first
function getData() {
  return [
    {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vingelodden 6, 2200 København N',
        icon: 'mouth.png',
        position: {
          lat: 55.7091292,
          lng: 12.54893467
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Værkstedvej 56, 2500 Valby',
        icon: 'mouth.png',
        position: {
          lat: 55.65216337,
          lng: 12.50738601
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Ellehammersvej 26, 2770 Kastrup',
        icon: 'mouth.png',
        position: {
          lat: 55.63014633,
          lng: 12.64826123
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Energivej 50, 2750 Ballerup',
        icon: 'mouth.png',
        position: {
          lat: 55.72496728,
          lng: 12.37137943
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Hundige Alle 11, 2670 Greve',
        icon: 'mouth.png',
        position: {
          lat: 55.60147316,
          lng: 12.33173374
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Taastrupgårdsvej 28, 2630 Taastrup',
        icon: 'mouth.png',
        position: {
          lat: 55.65559316,
          lng: 12.28801971
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Solrød Center 85, 2680 Solrød Strand',
        icon: 'mouth.png',
        position: {
          lat: 55.53344961,
          lng: 12.22054117
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Milnersvej 35A, 3400 Hillerød',
        icon: 'mouth.png',
        position: {
          lat: 55.92369048,
          lng: 12.30330703
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Køgevej 167, 4621 Gadstrup',
        icon: 'mouth.png',
        position: {
          lat: 55.61868702,
          lng: 12.07388887
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Lundevej 11B, 3600 Frederikssund',
        icon: 'mouth.png',
        position: {
          lat: 55.84066361,
          lng: 12.05969041
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Jernstøbervænget 2, 4600 Køge',
        icon: 'mouth.png',
        position: {
          lat: 55.45820771,
          lng: 12.1752838
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Færgevej 9, 3000 Helsingør',
        icon: 'mouth.png',
        position: {
          lat: 56.032994,
          lng: 12.61424318
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Præstemarksvej 10, 4070 Kirke Hyllinge',
        icon: 'mouth.png',
        position: {
          lat: 55.70740891,
          lng: 11.89752775
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Møllevej 2, 4140 Borup',
        icon: 'mouth.png',
        position: {
          lat: 55.49963892,
          lng: 11.9781722
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Industrivej 39, 4652 Hårlev',
        icon: 'mouth.png',
        position: {
          lat: 55.34493122,
          lng: 12.22949124
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Skolevej 3, 4330 Hvalsø',
        icon: 'mouth.png',
        position: {
          lat: 55.59203113,
          lng: 11.85812137
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Rebslagervej 15, 4300 Holbæk',
        icon: 'mouth.png',
        position: {
          lat: 55.69927771,
          lng: 11.7137416
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vesterled 24, 4690 Haslev',
        icon: 'mouth.png',
        position: {
          lat: 55.32346341,
          lng: 11.95470865
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Tværalle 5, 4100 Ringsted',
        icon: 'mouth.png',
        position: {
          lat: 55.4467909,
          lng: 11.79929781
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Præstøvej 78, 4640 Faxe',
        icon: 'mouth.png',
        position: {
          lat: 55.24913292,
          lng: 12.10664212
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'A Ladingsvej 1, 4500 Nykøbing Sj',
        icon: 'mouth.png',
        position: {
          lat: 55.92514084,
          lng: 11.66209702
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Ringstedvej 20, 4180 Sorø',
        icon: 'mouth.png',
        position: {
          lat: 55.4394238,
          lng: 11.56359459
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Grimstrupvej 185, 4700 Næstved',
        icon: 'mouth.png',
        position: {
          lat: 55.23419437,
          lng: 11.75420909
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Platanvej 40, 4780 Stege',
        icon: 'mouth.png',
        position: {
          lat: 54.9963061,
          lng: 12.28276702
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Skovvejen 48, Slagelse, 4200 Slagelse',
        icon: 'mouth.png',
        position: {
          lat: 55.40159527,
          lng: 11.37479011
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Chr Richardtsvej 39, 4760 Vordingborg',
        icon: 'mouth.png',
        position: {
          lat: 55.01512714,
          lng: 11.91183407
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Hareskovvej 13, 4400 Kalundborg',
        icon: 'mouth.png',
        position: {
          lat: 55.66687352,
          lng: 11.11060467
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Aarhusvej 38, 4800 Nykøbing F',
        icon: 'mouth.png',
        position: {
          lat: 54.78179585,
          lng: 11.87979978
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Grejsdalen 18, 5800 Nyborg',
        icon: 'mouth.png',
        position: {
          lat: 55.31677461,
          lng: 10.78562697
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'C. E. Christiansens Vej 12, 4930 Maribo',
        icon: 'mouth.png',
        position: {
          lat: 54.77906357,
          lng: 11.50451871
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sygehusvej 26, Tranebjerg, 8305 Samsø',
        icon: 'mouth.png',
        position: {
          lat: 55.83064572,
          lng: 10.59116851
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vestervej 3, 8400 Ebeltoft',
        icon: 'mouth.png',
        position: {
          lat: 56.19237319,
          lng: 10.67166564
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Skolevej 1, 4900 Nakskov, ny adresse pr. 8/3-21: Søndergade 14, 4900 Nakskov',
        icon: 'mouth.png',
        position: {
          lat: 54.83370464,
          lng: 11.16078017
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Østerbrogade 2, 8500 Grenaa',
        icon: 'mouth.png',
        position: {
          lat: 56.41360223,
          lng: 10.88284246
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Ny Lufthavnsvej 24, Stabrand, 8560 Kolind',
        icon: 'mouth.png',
        position: {
          lat: 56.3078296,
          lng: 10.62682096
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Billedskærervej 15, 5230 Odense M Gå til BLÅ indgang',
        icon: 'mouth.png',
        position: {
          lat: 55.37888013,
          lng: 10.41375149
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Norgesvej 2, Tved, 5700 Svendborg Gå til BLÅ indgang',
        icon: 'mouth.png',
        position: {
          lat: 55.08385399,
          lng: 10.63014368
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Lerbakken 21, Følle, 8410 Rønde',
        icon: 'mouth.png',
        position: {
          lat: 56.30804667,
          lng: 10.45043957
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Ullasvej 39C, Rønne, 3700 Rønne',
        icon: 'mouth.png',
        position: {
          lat: 55.09200462,
          lng: 14.71088817
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Stadionvej 4, Klemensker, 3782 Klemensker',
        icon: 'mouth.png',
        position: {
          lat: 55.17476332,
          lng: 14.81242269
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Parkvej 5, 8300 Odder',
        icon: 'mouth.png',
        position: {
          lat: 55.97834573,
          lng: 10.15254102
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Bartholins Allé 3, 8000 Aarhus C',
        icon: 'mouth.png',
        position: {
          lat: 56.16671852,
          lng: 10.20539815
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Tyge Søndergaards Vej 953, 8200 Aarhus N',
        icon: 'mouth.png',
        position: {
          lat: 56.19575581,
          lng: 10.1656322
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Kirstinesmindevej 2, 8200 Aarhus, Aarhus N',
        icon: 'mouth.png',
        position: {
          lat: 56.19575581,
          lng: 10.1656322
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vejlevej 7, 7130 Juelsminde',
        icon: 'mouth.png',
        position: {
          lat: 55.71198242,
          lng: 9.98601553
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sygehusvejen 18, 5970 Ærøskøbing',
        icon: 'mouth.png',
        position: {
          lat: 54.89260829,
          lng: 10.40626338
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Skanderborg Fælled 1, 8660 Skanderborg',
        icon: 'mouth.png',
        position: {
          lat: 56.04977178,
          lng: 9.96301053
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sygehusvej 7, 8660 Skanderborg',
        icon: 'mouth.png',
        position: {
          lat: 56.03397092,
          lng: 9.92855087
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Langmarksvej 61, 8700 Horsens',
        icon: 'mouth.png',
        position: {
          lat: 55.87106206,
          lng: 9.85825006
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Langmarksvej 61, 8700 Horsens',
        icon: 'mouth.png',
        position: {
          lat: 55.87106206,
          lng: 9.85825006
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Hadbjergvej 12, Vinterslev, 8370 Hadsten',
        icon: 'mouth.png',
        position: {
          lat: 56.33424447,
          lng: 10.05612219
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Kildestræde 20, Nexø, 3730 Nexø',
        icon: 'mouth.png',
        position: {
          lat: 55.06152179,
          lng: 15.12848737
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Juventusvej 15, 8960 Randers SØ',
        icon: 'mouth.png',
        position: {
          lat: 56.43296122,
          lng: 10.05927148
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Juventusvej 15, 8960 Randers SØ',
        icon: 'mouth.png',
        position: {
          lat: 56.43296122,
          lng: 10.05927148
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vestre Ringvej 101, 7000 Fredericia',
        icon: 'mouth.png',
        position: {
          lat: 55.5799944,
          lng: 9.72502572
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'P V Tuxens Vej 14, 5500 Middelfart',
        icon: 'mouth.png',
        position: {
          lat: 55.49589978,
          lng: 9.74188443
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Thorsvej 4, 8450 Hammel',
        icon: 'mouth.png',
        position: {
          lat: 56.26000542,
          lng: 9.86825072
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Gesagervej 70, 8722 Hedensted',
        icon: 'mouth.png',
        position: {
          lat: 55.78104702,
          lng: 9.69160166
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Tysklandsvej 4, 7100 Vejle',
        icon: 'mouth.png',
        position: {
          lat: 55.72901252,
          lng: 9.55732001
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Nattergalevej 10, 8860 Ulstrup',
        icon: 'mouth.png',
        position: {
          lat: 56.38829347,
          lng: 9.78574272
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Stadionvej 25, 9560 Hadsund',
        icon: 'mouth.png',
        position: {
          lat: 56.72170151,
          lng: 10.13113697
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Kirkevej 10, 7160 Tørring',
        icon: 'mouth.png',
        position: {
          lat: 55.86047343,
          lng: 9.48299314
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Kokbjerg 1A, 6000 Kolding',
        icon: 'mouth.png',
        position: {
          lat: 55.53342576,
          lng: 9.47328342
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Ansvej 102, 8600 Silkeborg',
        icon: 'mouth.png',
        position: {
          lat: 56.18379586,
          lng: 9.57364578
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Ellegårdvej 16, 6400 Sønderborg',
        icon: 'mouth.png',
        position: {
          lat: 54.92756665714083,
          lng: 9.799970976170033
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vestre Ringvej 7, 8850 Bjerringbro',
        icon: 'mouth.png',
        position: {
          lat: 56.378039,
          lng: 9.64656166
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Byrum Hovedgade 56, Byrum, 9940 Læsø',
        icon: 'mouth.png',
        position: {
          lat: 57.25403229,
          lng: 11.00129317
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Amerikavej 22, 9500 Hobro',
        icon: 'mouth.png',
        position: {
          lat: 56.63332402,
          lng: 9.81704182
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Grønningen 1A, 6100 Haderslev',
        icon: 'mouth.png',
        position: {
          lat: 55.2372407,
          lng: 9.48942707
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Himmerlandsvej 59, 9520 Skørping',
        icon: 'mouth.png',
        position: {
          lat: 56.8340866,
          lng: 9.87700592
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vinkelvej 20, 8800 Viborg',
        icon: 'mouth.png',
        position: {
          lat: 56.44511501,
          lng: 9.42437201
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Passagerterminalen 10, 7190 Billund',
        icon: 'mouth.png',
        position: {
          lat: 55.74647124,
          lng: 9.14796197
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Rørholtvej 18, 9330 Dronninglund',
        icon: 'mouth.png',
        position: {
          lat: 57.15245795,
          lng: 10.28536761
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Skånevej 5, 6230 Rødekro',
        icon: 'mouth.png',
        position: {
          lat: 55.06912947229296,
          lng: 9.355854033422837
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Ole Bendix Vej 1, 7330 Brande',
        icon: 'mouth.png',
        position: {
          lat: 55.94173384,
          lng: 9.12404246
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sebbersundvej 2A, 9220 Aalborg Øst',
        icon: 'mouth.png',
        position: {
          lat: 57.02771177,
          lng: 10.00040443
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sjællandsgade 6, 7430 Ikast',
        icon: 'mouth.png',
        position: {
          lat: 56.13828389,
          lng: 9.1486952
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Hobrovej 18-22 henvendelse ved P0',
        icon: 'mouth.png',
        position: {
          lat: 57.03679476467238,
          lng: 9.908857915299322
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Europa Plads 4, 9000 Aalborg',
        icon: 'mouth.png',
        position: {
          lat: 57.04365629,
          lng: 9.91267605
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Flensborgvej 13C, 6340 Kruså',
        icon: 'mouth.png',
        position: {
          lat: 54.84283754317693,
          lng: 9.402352808905015
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Stygge Krumpens Vej 4, 9300 Sæby',
        icon: 'mouth.png',
        position: {
          lat: 57.33379543,
          lng: 10.50215399
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Stadionvej 59, 7470 Karup J',
        icon: 'mouth.png',
        position: {
          lat: 56.31307598,
          lng: 9.1668496
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Messevej 1, 9600 Aars',
        icon: 'mouth.png',
        position: {
          lat: 56.80361573,
          lng: 9.50237718
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sønderjyske Motorvej 765, 6330 Padborg - indkørsel via Hermesvej',
        icon: 'mouth.png',
        position: {
          lat: 54.82686762390216,
          lng: 9.330480336141953
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vesterbrogade 9, st., 7200 Grindsted',
        icon: 'mouth.png',
        position: {
          lat: 55.75538107,
          lng: 8.92744558
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Skippergade 23, 9900 Frederikshavn',
        icon: 'mouth.png',
        position: {
          lat: 57.44275715,
          lng: 10.53995909
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Holingknuden 2, 7400 Herning',
        icon: 'mouth.png',
        position: {
          lat: 56.15813945,
          lng: 8.96401585
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Knudsgade 15, 9700 Brønderslev',
        icon: 'mouth.png',
        position: {
          lat: 57.27463284,
          lng: 9.95038716
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Brårupgade 12, 7800 Skive',
        icon: 'mouth.png',
        position: {
          lat: 56.55906951,
          lng: 9.03404632
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sports Alle 6, 7480 Vildbjerg',
        icon: 'mouth.png',
        position: {
          lat: 56.19444715,
          lng: 8.77167414
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sygehusvej 6, 9460 Brovst',
        icon: 'mouth.png',
        position: {
          lat: 57.09418791,
          lng: 9.52178795
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Nordre Industrivej 5A, 6270 Tønder',
        icon: 'mouth.png',
        position: {
          lat: 54.95047349,
          lng: 8.8665667
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Viumvej 8, 7870 Roslev',
        icon: 'mouth.png',
        position: {
          lat: 56.70058598,
          lng: 8.97956329
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Læsøvej 10, 9800 Hjørring',
        icon: 'mouth.png',
        position: {
          lat: 57.45030826,
          lng: 10.01667088
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Vestervang 28, 6920 Videbæk',
        icon: 'mouth.png',
        position: {
          lat: 56.09136088,
          lng: 8.61346441
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Brøndumvej 14, 9690 Fjerritslev',
        icon: 'mouth.png',
        position: {
          lat: 57.09005024,
          lng: 9.26650854
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Sct. Laurentii Vej 87, 9990 Skagen',
        icon: 'mouth.png',
        position: {
          lat: 57.71968769,
          lng: 10.58434723
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Ranunkelvej 1, 6900 Skjern',
        icon: 'mouth.png',
        position: {
          lat: 55.95322703,
          lng: 8.50219741
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Randersvej 42, 6700 Esbjerg',
        icon: 'mouth.png',
        position: {
          lat: 55.47245146,
          lng: 8.49389556
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Mozartsvej 11A, 7500 Holstebro',
        icon: 'mouth.png',
        position: {
          lat: 56.39064209,
          lng: 8.58047471
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Grævlingevej 9, Horne Terp, 9850 Hirtshals',
        icon: 'mouth.png',
        position: {
          lat: 57.5731919,
          lng: 9.98704424
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Morten Andersens Passage 7, 7600 Struer',
        icon: 'mouth.png',
        position: {
          lat: 56.48753775,
          lng: 8.57302766
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Gl. Feggesundvej 29, 7742 Vesløs',
        icon: 'mouth.png',
        position: {
          lat: 57.03087528,
          lng: 8.96894043
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Elsøvej 240, Frøslev, 7900 Nykøbing M',
        icon: 'mouth.png',
        position: {
          lat: 56.80422443,
          lng: 8.73158391
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Kirkevej 26, Rindum, 6950 Ringkøbing',
        icon: 'mouth.png',
        position: {
          lat: 56.09697897,
          lng: 8.2647813
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Højtoftevej 2, 7700 Thisted',
        icon: 'mouth.png',
        position: {
          lat: 56.95700858,
          lng: 8.69593467
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Lerpyttervej 50, 7700 Thisted',
        icon: 'mouth.png',
        position: {
          lat: 56.96764305,
          lng: 8.6986887
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Christinelystvej 8, 7620 Lemvig',
        icon: 'mouth.png',
        position: {
          lat: 56.54101608,
          lng: 8.29893369
        }
      })
    }, {
      dataset: 'coronaproverdk',
      booking: true,
      type: 'throat',
      marker: new google.maps.Marker({
        title: 'Jernbanegade 4, 7760 Hurup Thy',
        icon: 'mouth.png',
        position: {
          lat: 56.75121777,
          lng: 8.41782867
        }
      })
    }
  ]
}
