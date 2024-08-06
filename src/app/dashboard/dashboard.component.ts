import { AfterViewInit, Component, Host, OnInit } from '@angular/core';
import { Hotel } from 'app/interfaces/hotel.interface';
import { HuespedPorHotel } from 'app/interfaces/huesped-por-hotel.interface';
import { Room } from 'app/interfaces/room.interface';
import { Service } from 'app/interfaces/service.interface';
import { ManagementService } from 'app/services/management.service';
import * as Chartist from 'chartist';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public datawebsiteViewsChart :any;
  chartdata?: HuespedPorHotel[];

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  public hoteles : Hotel[];
  public numHoteles : number;

  public huespedes : Host[];
  public numHuespedes : number;

  public habitaciones : Room[];
  public numHabitaciones : number;

  public servicios : Service[];
  public numServicios : number;

  public nombresHoteles :string[]=[];
  public numeroHuespedes:number[]=[];

  constructor(private managementService : ManagementService) { }


getHoteles(){
  this.managementService.getHotelsRequest('hotel').subscribe(hoteles => {
    this.hoteles = hoteles;
    // hoteles.forEach(hotel => this.nombresHoteles.push(hotel.nombre))
  })

}


get nHoteles(){
  // this.hoteles.forEach(hotel => this.nombresHoteles.push(hotel.nombre));
  return this.hoteles.length;
}


getHosts(){
  this.managementService.getHostsRequest('huesped').subscribe(hoteles => {
    this.huespedes = hoteles;
  })

}


get nHuespedes(){
  return this.huespedes.length;
}


getHabitaciones(){
  this.managementService.getRoomsRequest('habitacion').subscribe(hoteles => {
    this.habitaciones = hoteles;
  })

}


get nHabitaciones(){
  return this.habitaciones.length;
}


getServicios(){
  this.managementService.getServicesRequest('servicio').subscribe(hoteles => {
    this.servicios = hoteles;
  })

}


get nServicios(){
  return this.servicios.length;
}


getHuespedesPorHotel(){
  this.managementService.getHuespedesPorHotel().subscribe(hph => {
    this.chartdata=hph
  })
}














  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  
  ngOnInit() {

    this.getHoteles();
    this.getHabitaciones();
    this.getHosts();
    this.getServicios();
    this.getHuespedesPorHotel()

      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    //   const dataCompletedTasksChart: any = {
    //       labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    //       series: [
    //           [230, 750, 450, 300, 280, 240, 200, 190]
    //       ]
    //   };

    //  const optionsCompletedTasksChart: any = {
    //       lineSmooth: Chartist.Interpolation.cardinal({
    //           tension: 0
    //       }),
    //       low: 0,
    //       high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //       chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    //   }

    //   var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    //   // start animation for the Completed Tasks Chart - Line Chart
    //   this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

     

this.managementService.getHuespedesPorHotel().subscribe(result => {
  this.chartdata = result;
  if(this.chartdata!=null){


    let names:string[]=[];
    this.hoteles.forEach(h => names.push(h.nombre));
    this.labeldata=names;
    for(let i=0; i<this.chartdata.length ;i++){
      // this.labeldata.push(this.chartdata[i].nombre)
      this.realdata.push(this.chartdata[i].num)
     }


    this.RenderChart(this.labeldata,this.realdata,this.colordata,'bar','websiteViewsChart');

    
  }
});


  }

  RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# de huespedes',
          data: maindata,
          backgroundColor:  'rgba(255, 255, 132, 1)',
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

 
 

}
