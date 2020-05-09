
$(
    function(){
  
  
          'use strict'; // Start of use strict
  
          
            new Chartist.Bar('#grafico_ranking', {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                series: [
                [5, 4, 3, 7, 5, 10, 3],
                [3, 2, 9, 5, 4, 6, 4]
                ]
            }, {
                seriesBarDistance: 10,
                reverseData: true,
                horizontalBars: true,
                axisY: {
                offset: 70
                },
                plugins: [
                Chartist.plugins.tooltip()
                ]
            });

            var option = null;
            option = {
                color: ['#8dcaf3','#67f3e4', '#4aa9e9' ],

                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['Preorder','Sale','Deal']
                },

                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Deal',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name:'Sale',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name:'Preorder',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[1320, 1132, 601, 234, 120, 90, 20]
                    }
                ]
            };

            

            var dom = document.getElementById('grafico_participacion');
            var rainChart = echarts.init(dom);

            var app = {};
            option = null;
            option = {
                color: ['#4aa9e9','#67f3e4'],
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['Sale','Market']
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Sale',
                        type:'bar',
                        data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        markPoint : {
                            data : [
                                {type : 'max', name: 'Max'},
                                {type : 'min', name: 'Min'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: 'Average'}
                            ]
                        }
                    },
                    {
                        name:'Market',
                        type:'bar',
                        data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                        markPoint : {
                            data : [
                                {name : 'Max', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                                {name : 'Min', value : 2.3, xAxis: 11, yAxis: 3}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : 'Average'}
                            ]
                        }
                    }
                ]
            };

            if (option && typeof option === 'object') {
                rainChart.setOption(option, false);
            }

            
            var table_ranking;

            table_ranking = $('#table_ranking');

            $(table_ranking).DataTable(
                {
                    'paging':true,
                    'ordering':false,
                    'info':false,
                    'searchable':false
                }
            );

  
            var chartData = [{
                'date': '2017-01-01',
                'distance': 250,
                'townName': 'New York',
                'townName2': 'New York',
                'townSize': 25,
                'latitude': 40.71,
                'duration': 408
            }, {
                'date': '2017-01-02',
                'distance': 371,
                'townName': 'Washington',
                'townSize': 14,
                'latitude': 38.89,
                'duration': 482
            }, {
                'date': '2017-01-03',
                'distance': 433,
                'townName': 'Wilmington',
                'townSize': 6,
                'latitude': 34.22,
                'duration': 562
            }, {
                'date': '2017-01-04',
                'distance': 345,
                'townName': 'Jacksonville',
                'townSize': 7,
                'latitude': 30.35,
                'duration': 379
            }, {
                'date': '2017-01-05',
                'distance': 480,
                'townName': 'Miami',
                'townName2': 'Miami',
                'townSize': 10,
                'latitude': 25.83,
                'duration': 501
            }, {
                'date': '2017-01-06',
                'distance': 386,
                'townName': 'Tallahassee',
                'townSize': 7,
                'latitude': 30.46,
                'duration': 443
            }, {
                'date': '2017-01-07',
                'distance': 348,
                'townName': 'New Orleans',
                'townSize': 10,
                'latitude': 29.94,
                'duration': 405
            }, {
                'date': '2017-01-08',
                'distance': 238,
                'townName': 'Houston',
                'townName2': 'Houston',
                'townSize': 16,
                'latitude': 29.76,
                'duration': 309
            }, {
                'date': '2017-01-09',
                'distance': 218,
                'townName': 'Dalas',
                'townSize': 17,
                'latitude': 32.8,
                'duration': 287
            }, {
                'date': '2017-01-10',
                'distance': 349,
                'townName': 'Oklahoma City',
                'townSize': 11,
                'latitude': 35.49,
                'duration': 485
            }, {
                'date': '2017-01-11',
                'distance': 603,
                'townName': 'Kansas City',
                'townSize': 10,
                'latitude': 39.1,
                'duration': 890
            }, {
                'date': '2017-01-12',
                'distance': 534,
                'townName': 'Denver',
                'townName2': 'Denver',
                'townSize': 18,
                'latitude': 39.74,
                'duration': 810
            }, {
                'date': '2017-01-13',
                'townName': 'Salt Lake City',
                'townSize': 12,
                'distance': 425,
                'duration': 670,
                'latitude': 40.75,
                'alpha': 0.4
            }, {
                'date': '2017-01-14',
                'latitude': 36.1,
                'duration': 470,
                'townName': 'Las Vegas',
                'townName2': 'Las Vegas',
                'bulletClass': 'lastBullet'
            }, {
                'date': '2017-01-15'
            }, {
                'date': '2017-01-16'
            }];

            /**
             * SVG path for target icon
             */
            var targetSVG = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';

            /**
             * SVG path for plane icon
             */
            var planeSVG = 'm2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47';

            /**
             * Create the map
             */
            var map = AmCharts.makeChart('grafico_mapa', {
                'type': 'map',
                'theme': 'light',

                'projection': 'winkel3',
                'dataProvider': {
                    'map': 'worldLow',
                    
                    'lines': [{
                        'id': 'line1',
                        'arc': -0.85,
                        'alpha': 0.3,
                        'latitudes': [23.684994, 48.8567, 43.8163, 34.3, 23, 61.524010, 20.593684, 33.223191],
                        'longitudes': [90.356331, 2.3510, -79.4287, -118.15, -82, 105.318756, 78.962880, 43.679291]
                    }, {
                        'id': 'line2',
                        'alpha': 0,
                        'color': '#E5343D',
                        'latitudes': [23.684994, 48.8567, 43.8163, 34.3, 23, 61.524010, 20.593684, 33.223191],
                        'longitudes': [90.356331, 2.3510, -79.4287, -118.15, -82, 105.318756, 78.962880, 43.679291]
                    }],
                    'images': [{
                        'svgPath': targetSVG,
                        'title': 'Bangladesh',
                        'latitude': 23.684994,
                        'longitude': 90.356331
                    }, {
                        'svgPath': targetSVG,
                        'title': 'Paris',
                        'latitude': 48.8567,
                        'longitude': 2.3510
                    }, {
                        'svgPath': targetSVG,
                        'title': 'Toronto',
                        'latitude': 43.8163,
                        'longitude': -79.4287
                    }, {
                        'svgPath': targetSVG,
                        'title': 'Los Angeles',
                        'latitude': 34.3,
                        'longitude': -118.15
                    }, {
                        'svgPath': targetSVG,
                        'title': 'Havana',
                        'latitude': 23,
                        'longitude': -82
                    }, {}, {
                        'svgPath': targetSVG,
                        'title': 'Russia',
                        'latitude': 61.524010,
                        'longitude': 105.318756
                    }, {}, {
                        'svgPath': targetSVG,
                        'title': 'India',
                        'latitude': 20.593684,
                        'longitude': 78.962880
                    }, {}, {
                        'svgPath': targetSVG,
                        'title': 'Iraq',
                        'latitude': 33.223191,
                        'longitude': 43.679291
                    }, {
                        'svgPath': planeSVG,
                        'positionOnLine': 0,
                        'color': '#000000',
                        'alpha': 0.1,
                        'animateAlongLine': true,
                        'lineId': 'line2',
                        'flipDirection': true,
                        'loop': true,
                        'scale': 0.03,
                        'positionScale': 1.3
                    }, {
                        'svgPath': planeSVG,
                        'positionOnLine': 0,
                        'color': '#585869',
                        'animateAlongLine': true,
                        'lineId': 'line1',
                        'flipDirection': true,
                        'loop': true,
                        'scale': 0.03,
                        'positionScale': 1.8
                    }
                    
                    ]
                    
                },

                'areasSettings': {
                    'unlistedAreasColor': '#5b69bc'
                },

                'imagesSettings': {
                    'color': '#E5343D',
                    'rollOverColor': '#E5343D',
                    'selectedColor': '#E5343D',
                    'pauseDuration': 0.2,
                    'animationDuration': 4,
                    'adjustAnimationSpeed': true
                },

                'linesSettings': {
                    'color': '#E5343D',
                    'alpha': 0.4
                },

                'export': {
                    'enabled': true
                }

            });
  
    }
  );
  
