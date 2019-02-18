       

$(document).ready(function() {

    // button click

    $( "#soc-twi-1" ).trigger( "click" );
    $( "#soc-twi-2" ).trigger( "click" );
    $( "#soc-fb-1" ).trigger( "click" );
    $( "#soc-fb-2" ).trigger( "click" );


    Highcharts.chart('cont', {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Seat & vote share of Congress & BJP'
        },
        subtitle: {
            text: 'Lok Sabha elections (Figures in % )'
        },
        xAxis: [{
            categories: [1984,1989,1991,1996,1998,1999,2004,2009,2014],
            crosshair: true
        }],
       
        yAxis: [{ // Primary yAxis
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: 'Seat Share',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
           
    
        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Vote Share',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
    
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Seat Share',
            type: 'column',
            
            data: [76.4,37.24,45.69,25.78,25.97,20.99,26.7,37.94,8.1],
            tooltip: {
                valueSuffix: '%'
            }
    
        }, {
            name: 'Seat Share',
            type: 'column',
            
            data: [0.37,16.07,22.47,29.65,33.52,33.52,25.41,21.36,51.93],
            tooltip: {
                valueSuffix: ' %'
            }
    
        },
        
        
        {
            name: 'Vote Share',
            type: 'line',
            yAxis: 1,
            data: [51.8,41.03,38.86,29.65,29.57,33.99,34.43,35.78,22.33],
            
            
            tooltip: {
                valueSuffix: '%'
            }
    
        }, {
            name: 'Vote Share',
            type: 'line',
            yAxis: 1,
            data: [19.6,26.97,22.47,23.39,36.22,39.53,34.39,23.4,39.59],
            tooltip: {
                valueSuffix: '%'
            }
        }]
    });

    
    




});




// social - media




function socialtwitter(id)
{
    if(id == 1)
    data = [['Narendra Modi', 827238],['Rahul Gandhi', 8946],['INC India', 893],['BJP4India', 529]];

    else if(id == 2)
     data = [['Narendra Modi', 2059],['Rahul Gandhi', 8946],['INC India', 893],['BJP4India', 529]];

     else if(id == 3)
     data = [['Narendra Modi', 3868310],['Rahul Gandhi', 1140771],['INC India', 1066212],['BJP4India', 1610103]];

     else if(id == 4)
     data = [['Narendra Modi', 9623],['Rahul Gandhi', 28519],['INC India', 2107],['BJP4India', 1726]];



    Highcharts.chart('BJP-UP-chart-2', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            },
            backgroundColor: '#EDF2F4',
        },
        title: {
            text: 'Contents of Highsoft\'s weekly fruit delivery'
        },
        subtitle: {
            text: '3D donut in Highcharts'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Delivered amount',
            data: data,
        }]
    });


    
}


function socialtwitter_a(id)
{
    

     if(id == 3)
     data = [['Narendra Modi', 3868310],['Rahul Gandhi', 1140771],['INC India', 1066212],['BJP4India', 1610103]];

     else if(id == 4)
     data = [['Narendra Modi', 9623],['Rahul Gandhi', 28519],['INC India', 2107],['BJP4India', 1726]];



    Highcharts.chart('BJP-UP-chart-3', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            },
            backgroundColor: '#EDF2F4',
        },
        title: {
            text: 'Contents of Highsoft\'s weekly fruit delivery'
        },
        subtitle: {
            text: '3D donut in Highcharts'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Delivered amount',
            data: data,
        }]
    });


}

    function socialfb(id)
{
    if(id == 1)
    data = [['Narendra Modi', 3051017],['Rahul Gandhi', 667670],['INC India', 1082238],['BJP4India', 2234643]];

    else if(id == 2)
     data = [['Narendra Modi', 57566],['Rahul Gandhi', 8346],['INC India', 2925],['BJP4India', 7627]];

     



    Highcharts.chart('BJP-UP-chart-4', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
            ,
            backgroundColor: '#EDF2F4',
        },
        title: {
            text: 'Contents of Highsoft\'s weekly fruit delivery'
        },
        subtitle: {
            text: '3D donut in Highcharts'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Delivered amount',
            data: data,
        }]
    });


    
}


function socialfb_a(id)
{
    

     if(id == 3)
     data = [['Narendra Modi', 272522],['Rahul Gandhi', 131568],['INC India', 417885],['BJP4India', 444476]];

     else if(id == 4)
     data = [['Narendra Modi', 5142],['Rahul Gandhi', 1645],['INC India', 1129],['BJP4India', 1517]];



    Highcharts.chart('BJP-UP-chart-5', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            },
            backgroundColor: '#EDF2F4',
            
        },
        title: {
            text: 'Contents of Highsoft\'s weekly fruit delivery'
        },
        subtitle: {
            text: '3D donut in Highcharts'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Delivered amount',
            data: data,
        }]
    });


    
}