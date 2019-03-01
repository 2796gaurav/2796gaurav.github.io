
$(document).ready(function() {

   


    // youth 1

    

    Highcharts.chart('youth1', {
        chart: {
            type: 'line',
            backgroundColor: '#EDF2F4',
        },
        title: {
            text: 'Young voters showed up in 2014'
        },
        subtitle: {
            text: 'Source: <a href="http://www.lokniti.org/punjab_pdf/The-Youth-Vote.pdf" target="_blank">Lokniti</a>'
        },
        xAxis: {
            categories: [1999,2004,2009,2014],
            title: {
                text: 'Election year'
            }
        },
        yAxis: {
            title: {
                text: 'Percentage'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'All India',
            data: [57,52,54,68]
        }, {
            name: 'Young voters',
            data: [60,58,58,66]
        }]
    });


    // social - media


    Highcharts.chart('BJP-UP-chart-1', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    },
                    backgroundColor: '#EDF2F4',
                },
                title: {
                    text: 'Twitter no. of followers count'
                },
                
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Delivered amount',
                    data: [['Narendra Modi', 44188283],['Rahul Gandhi', 7753915],['INC India', 4597455],['BJP4India', 10169513]],
                }]
            });



    
            Highcharts.chart('BJP-UP-chart-6', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    },
                    backgroundColor: '#EDF2F4',
                },
                title: {
                    text: 'Facebook no. of followers count'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Delivered amount',
                    data: [['Narendra Modi', 43266122],['Rahul Gandhi', 1962344],['INC India', 4921241],['BJP4India', 15212070]],
                }]
            });


    

    


    // INDIA MAP OF WHO WON IN LOK SABHA


     
    var bubble_map = new Datamap({
        element: document.getElementById('india'),
        scope: 'india',
        geographyConfig: {
            popupOnHover: true,
            highlightOnHover: true,
            borderColor: '#444',
            borderWidth: 0.5,
            dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json'
            //dataJson: topoJsonData
        },
        fills: {
            'MAJOR': '#F3A161', //Won
            'MEDIUM': '#4B67F2', // Lost
            'MINOR': '#bada55', // did not contest
            defaultFill: '#dddddd'
        },
        data: {
            'JK': { fillKey: 'MAJOR' },
            'HP': { fillKey: 'MAJOR' },
            'PB': { fillKey: 'MEDIUM' },
            'DL': { fillKey: 'MINOR' },
            'HR': { fillKey: 'MAJOR' },
            'UT': { fillKey: 'MAJOR' },
            'RJ': { fillKey: 'MAJOR' },
            'UP': { fillKey: 'MAJOR' },
            '': { fillKey: 'MAJOR' },
            'MP': { fillKey: 'MAJOR' },
            'MH': { fillKey: 'MAJOR' },
            'KA': { fillKey: 'MINOR' },
            'GA': { fillKey: 'MAJOR' },
            'KL': { fillKey: 'MEDIUM' },
            'TN': { fillKey: 'MINOR' },
            'AP': { fillKey: 'MINOR' },
            'OR': { fillKey: 'MEDIUM' },
            'CT': { fillKey: 'MAJOR' },
            'JH': { fillKey: 'MAJOR' },
            'BR': { fillKey: 'MAJOR' },
            'WB': { fillKey: 'MEDIUM' },
            'SK': { fillKey: 'MEDIUM' },
            'AS': { fillKey: 'MEDIUM' },
            'AR': { fillKey: 'MAJOR' },
            'NL': { fillKey: 'MINOR' },
            'MN': { fillKey: 'MEDIUM' },
            'MZ': { fillKey: 'MINOR' },
            'TR': { fillKey: 'MEDIUM' },
            'AN': { fillKey: 'MAJOR' },
            'ML': { fillKey: 'MEDIUM' },
            
        },
        setProjection: function (element) {
            var projection = d3.geo.mercator()
                .center([88.9629, 23.5937]) // always in [East Latitude, North Longitude]
                .scale(1000);
            var path = d3.geo.path().projection(projection);
            return { path: path, projection: projection };
        }
    });
   /* let bubbles = [
    {
            centered: "JK",
            fillKey: "MAJOR",
            radius: 20,
            state: "Jammu and Kashmir"
        },
        {
            centered: "HP",
            fillKey: "MAJOR",
            radius: 20,
            state: "Himachal Pradesh"
        },
        {
            centered: "PB",
            fillKey: "MAJOR",
            radius: 20,
            state: "Punjab"
        },
         {
            centered: "DL",
            fillKey: "MAJOR",
            radius: 20,
            state: "Delhi"
        },
        {
            centered: "HR",
            fillKey: "MAJOR",
            radius: 20,
            state: "Haryana"
        },
        {
            centered: "UT",
            fillKey: "MAJOR",
            radius: 20,
            state: "Uttaranchal"
        },
        {
            centered: "RJ",
            fillKey: "MAJOR",
            radius: 20,
            state: "Rajasthan"
        },
        {
            centered: "UP",
            fillKey: "MAJOR",
            radius: 20,
            state: "Uttar Pradesh"
        },
        {
            centered: "GJ",
            fillKey: "MAJOR",
            radius: 20,
            state: "Gujarat"
        },
        {
            centered: "MP",
            fillKey: "MAJOR",
            radius: 20,
            state: "Madhya Pradesh"
        },
       
        {
            centered: "MH",
            fillKey: "MAJOR",
            radius: 20,
            state: "Maharastra"
        },
        {
            centered: "MH",
            fillKey: "MAJOR",
            radius: 20,
            state: "Maharastra"
        },
        {
            centered: "MH",
            fillKey: "MAJOR",
            radius: 20,
            state: "Maharastra"
        },
        {
            centered: "KA",
            fillKey: "MAJOR",
            radius: 20,
            state: "Karnataka"
        },
        {
            centered: "GA",
            fillKey: "MAJOR",
            radius: 20,
            state: "Goa"
        },
        {
            centered: "KL",
            fillKey: "MAJOR",
            radius: 20,
            state: "Kerala"
        },
        {
            centered: "TN",
            fillKey: "MAJOR",
            radius: 20,
            state: "Tamil Nadu"
        },
        {
            centered: "AP",
            fillKey: "MAJOR",
            radius: 20,
            state: "Andhra Pradesh"
        },
        {
            centered: "OR",
            fillKey: "MAJOR",
            radius: 20,
            state: "Orissa"
        },
        {
            centered: "CT",
            fillKey: "MAJOR",
            radius: 20,
            state: "Chattisgarh"
        },
        {
            centered: "JH",
            fillKey: "MAJOR",
            radius: 20,
            state: "Jharkhand"
        },
        {
            centered: "BR",
            fillKey: "MAJOR",
            radius: 20,
            state: "Bihar"
        },
        {
            centered: "WB",
            fillKey: "MAJOR",
            radius: 20,
            state: "West Bengal"
        },
        {
            centered: "SK",
            fillKey: "MAJOR",
            radius: 20,
            state: "Sikkim"
        },
        {
            centered: "AS",
            fillKey: "MAJOR",
            radius: 20,
            state: "Assam"
        },
        {
            centered: "AR",
            fillKey: "MAJOR",
            radius: 20,
            state: "Arunachal Pradesh"
        },
        {
            centered: "NL",
            fillKey: "MAJOR",
            radius: 20,
            state: "Nagaland"
        },
        {
            centered: "MN",
            fillKey: "MAJOR",
            radius: 20,
            state: "Manipur"
        },
        {
            centered: "MZ",
            fillKey: "MAJOR",
            radius: 20,
            state: "Mizoram"
        },
        {
            centered: "TR",
            fillKey: "MAJOR",
            radius: 20,
            state: "Tripura"
        },
        {
            centered: "AN",
            fillKey: "MAJOR",
            radius: 20,
            state: "Andaman And Nicobar Islands"
        },

       
    ]
    // // ISO ID code for city or <state></state>
    setTimeout(() => { // only start drawing bubbles on the map when map has rendered completely.
        bubble_map.bubbles(bubbles, {
            popupTemplate: function (geo, data) {
                return `<div class="hoverinfo">city: ${data.state}, Slums: ${data.radius}%</div>`;
            }
        });
    }, 1000);*/


// alliance in parties

var colors = Highcharts.getOptions().colors,
    categories = [
        'NDA',
        'United Progressive alliance - UPA',
        
    ],
    data = [
        
        {
            y: 307,
            color: '#F97D09',
            drilldown: {
                name: 'NDA',
                categories: [
                    'BJP',
                    'Shiv Sena',
                    'Lok Janshakti party',
                    'Shiromani Akali Dal',
                    'Pattali Makkal Katchi',
                    'All India N R. Congress',
                    'Janata Dal (United)',
                    'Sikkim Democratic Front',
                    'Nationalist Democratic Progressive Party',



                ],
                data: [
                    271,18,6,4,1,12,1,1
                ]
            }
        },
        {
            y: 81,
            color: '#0000AC',
            drilldown: {
                name: 'United Progressive alliance - UPA',
                categories: [
                    'INC',
                    'Naionalist Congress Party',
                    'Rashtriya Janata Dal',
                    'Rashtriya Lok Samta Party',
                    'Indian Union Muslim League',
                    'Jharkhand Mukti Morcha',
                    'Janata Dal (Secular)',
                    'Rashtriya Lok Dal',
                    'Revolutionary Socialist Party',
                    'Swabhimani Paksha',
                    
                ],
                data: [
                   44,
                   6,
                   3,3,2,2,2,1,1,1
                ]
            }
        },
       
    ],
    browserData = [],
    versionsData = [],
    i,
    j,
    dataLen = data.length,
    drillDataLen,
    brightness;


// Build the data arrays
for (i = 0; i < dataLen; i += 1) {

    // add browser data
    browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
    });

    // add version data
    drillDataLen = data[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
            name: data[i].drilldown.categories[j],
            y: data[i].drilldown.data[j],
            color: Highcharts.Color(data[i].color).brighten(brightness).get()
        });
    }
}

// Create the chart
Highcharts.chart('alliance', {
    chart: {
        type: 'pie',
        backgroundColor: null
    },
    title: {
        text: "NDA and UPA MLA's in elections "
    },
    subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/National_Democratic_Alliance_(India)" target="_blank">NDA</a><br/> <a href="https://en.wikipedia.org/wiki/United_Progressive_Alliance" target="_blank">UPA</a>'  // change this
    },
    plotOptions: {
        pie: {
            shadow: false,
            center: ['50%', '50%']
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    series: [{
        name: 'Main Party',
        data: browserData,
        size: '60%',
        dataLabels: {
            formatter: function () {
                return this.y > 5 ? this.point.name : null;
            },
            color: '#ffffff',
            distance: -30
        }
    }, {
        name: 'Parties',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
            formatter: function () {
                // display only if larger than 1
                return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                    this.y + 'votes' : null;
            }
        },
        id: 'versions'
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 400
            },
            chartOptions: {
                series: [{
                    id: 'versions',
                    dataLabels: {
                        enabled: false
                    }
                }]
            }
        }]
    }
});




Highcharts.chart('BJP-UP-2009', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        },
        backgroundColor: '#EDF2F4',
    },
    title: {
        text: 'Party performance in Uttar Pradesh, seat-wise, 2009'
    },
    subtitle: {
        text: 'Source:  <a href="https://scroll.in/article/666049/everything-you-need-to-know-about-lok-sabha-verdict-2014-explained-in-40-charts" target="_blank">Everything you need to know about Lok Sabha Verdict 2014 explained in 40 charts</a>'
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['BJP', 8],
            ['BSP', 16],
            ['INC', 17],
            ['SP', 19],
            ['Others', 4],
            
        ],
    }]
});


Highcharts.chart('BJP-UP-2014', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        },
        backgroundColor: '#EDF2F4',
    },
    title: {
        text: 'Party performance in Uttar Pradesh, seat-wise, 2014'
    },
    subtitle: {
        text: 'Source:  <a href="https://scroll.in/article/666049/everything-you-need-to-know-about-lok-sabha-verdict-2014-explained-in-40-charts" target="_blank">Everything you need to know about Lok Sabha Verdict 2014 explained in 40 charts</a>'
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['BJP', 71],
            ['BSP', 0],
            ['INC', 2],
            ['SP', 5],
            ['Others', 2],
        ],
    }]
});


// mode

// var chart = Highcharts.chart('bjp_power', {

//     chart: {
//         type: 'column'
//     },

//     title: {
//         text: 'Highcharts responsive chart'
//     },

//     subtitle: {
//         text: 'Resize the frame or click buttons to change appearance'
//     },

//     legend: {
//         align: 'right',
//         verticalAlign: 'middle',
//         layout: 'vertical'
//     },

//     xAxis: {
//         categories: ['Median Vote Share', 'Mean Vote Share'],
//         labels: {
//             x: -10
//         }
//     },

//     yAxis: {
//         allowDecimals: false,
//         title: {
//             text: 'Amount'
//         }
//     },

//     series: [{
//         name: '1990-2008',
//         data: [47.8, 46.8]
//     }, {
//         name: '2013',
//         data: [48.7, 48.2]
//     }, {
//         name: '2018',
//         data: [47, 45.9]
//     }],

//     responsive: {
//         rules: [{
//             condition: {
//                 maxWidth: 500
//             },
//             chartOptions: {
//                 legend: {
//                     align: 'center',
//                     verticalAlign: 'bottom',
//                     layout: 'horizontal'
//                 },
//                 yAxis: {
//                     labels: {
//                         align: 'left',
//                         x: 0,
//                         y: -5
//                     },
//                     title: {
//                         text: null
//                     }
//                 },
//                 subtitle: {
//                     text: null
//                 },
//                 credits: {
//                     enabled: false
//                 }
//             }
//         }]
//     }
// });






    
Highcharts.chart('other_party', {
    chart: {
        type: 'column',
        backgroundColor: '#EDF2F4',
    },
    title: {
        text: 'State-wise vote share and seat share of regional parties'
    },
    subtitle: {
        text: 'Source:  <a href="https://scroll.in/article/666049/everything-you-need-to-know-about-lok-sabha-verdict-2014-explained-in-40-charts" target="_blank">Everything you need to know about Lok Sabha Verdict 2014 explained in 40 charts</a>'
    },
    xAxis: {
        categories: [
            'Trinamool',
            'CPM',
            'BJD',
            'AIADMK',
            'DMK',
            'TDP',
            'TRS',
            'YSR Congress',
            'SP',
            'BSP',
            'SHS',
            'NCP',
            'JD(U)',
            'RJD',
            'LJP',
            'SAD'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Vote Share'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: '2009',
        data: [31.18,32.11,37.23,22.88,25.09,24.93,6.14,0.00,23.26,27.42,17.00,19.28,24.04,20.13,6.96,33.85]

    }, {
        name: '2014',
        data: [39.35,22.71,44.08,44.28,23.58,29.15,13.93,28.94,22.19,19.63,20.64,15.04,15.78,20.14,6.40,26.27]
    }

    ]
});




    // first high


    





    // soccial media analytics of twitter 


    




// var myDiv = document.getElementById('myDiv');

// var years = ['SP','BSP','AITC','BJP','TDP','INC'];

// Plotly.d3.csv('data/lok.csv', (err, rows) => {
//     var data = years.map(y => {
//     var d = rows.filter(r => r.partyabbre === y)
// console.log(rows);


//     console.log(d.map(r => r.year));
//     return {
//     x: d.map(r => r.year), 
//     y: d.map(r => r.totvotpoll), 
//     name: y, 
//     // marker: {color: 'rgb(26, 118, 255)'}, 
//     type: 'bar'
//     };




//     })

// var layout = {
// title: 'RAJYA ',
// xaxis: {tickfont: {
// size: 14, 
// color: 'rgb(107, 107, 107)'
// }}, 
// yaxis: {
// title: 'USD (millions)',
// titlefont: {
// size: 16, 
// color: 'rgb(107, 107, 107)'
// }, 
// tickfont: {
// size: 14, 
// color: "rgb(107, 107, 107)"
// }
// }, 
// legend: {
// x: 0, 
// y: 1.0, 
// bgcolor: 'rgba(255, 255, 255, 0)',
// bordercolor: 'rgba(255, 255, 255, 0)'
// }, 
// barmode: 'group', 
// bargap: 0.15, 
// bargroupgap: 0.1,

// paper_bgcolor: 'rgba(0,0,0,0)',
// plot_bgcolor: 'rgba(0,0,0,0)'
// };


// Plotly.newPlot(myDiv, data, layout, {displayModeBar: false});

// });


// /* scatter journalists */







// Plotly.d3.csv('data/journ.csv', (err, rows) => {

//     console.log(rows);

//     var x = [], y = [], name = [], job =[], org=[];

//     for (var i=0; i<rows.length; i++) {
// 		var row = rows[i];
// 		x.push( row['year'] );
//         y.push( row['counts'] );
//         name.push( row['fullName'] );
//         job.push( row['jobs'] );
//         org.push( row['organizations'] );
		
//     }
    
    
//     makePlotly( x, y ,name,job,org);

// });

// function makePlotly( x, y,name,job,org){
// 	var seDiv = document.getElementById('journo');
// 	var traces = [{
//         type: 'scatter',
//         mode: 'markers',
// 		x: x, 
//         y: y,
//         name:'name:',
        
       
//     }];
 

// 	Plotly.newPlot(seDiv, traces, 
//         {title: 'Plotting CSV data from AJAX call'}, {displayModeBar: false});
        
//         // add names
// }


// // for fake treemap

// Highcharts.chart('fn', {
//     series: [{
//         type: "treemap",
//         layoutAlgorithm: 'stripes',
//         alternateStartingDirection: true,
//         levels: [{
//             level: 1,
//             layoutAlgorithm: 'sliceAndDice',
//             dataLabels: {
//                 enabled: true,
//                 align: 'left',
//                 verticalAlign: 'top',
//                 style: {
//                     fontSize: '15px',
//                     fontWeight: 'bold'
//                 }
//             }
//         }],
//         data: [{
//             id: 'A',
//             name: 'Nationalism',
//             color: "#EC2500"
//         }, {
//             id: 'B',
//             name: 'Current Affairs',
//             color: "#ECE100"
//         }, {
//             id: 'O',
//             name: 'Scares and Scams',
//             color: '#EC9800'
//         },{
//             name: '"Common man" stories',
//             parent: 'A',
//             value: 10
//         }, {
//             name: 'Cultural preservation',
//             parent: 'A',
//             value: 15
//         }, {
//             name: 'Other',
//             parent: 'A',
//             value: 5
//         }, {
//             name: 'Domestic news/ Politics',
//             parent: 'B',
//             value: 22.4
//         }, {
//             name: 'Conspiracies',
//             parent: 'O',
//             value: 3
//         }, {
//             name: 'Health',
//             parent: 'O',
//             value: 5
//         }, {
//             name: 'Money',
//             parent: 'O',
//             value: 7
//         }, 
//         {
//             name: 'Technology',
//             parent: 'O',
//             value: 16.5
//         }, 
//         {
//             name: 'Other',
//             parent: 'O',
//             value: 5
//         }, {
//             name: 'Other',
//             parent: 'Kiwi',
//             value: 11.2,
//             color: '#9EDE00'
        
//     }]
    
// }],
//     title: {
//         text: 'Fruit consumption'
//     }
// });
    

     






});



