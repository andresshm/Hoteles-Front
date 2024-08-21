import { AfterViewInit, Component, Host, OnInit } from "@angular/core";
import { Hotel } from "app/interfaces/hotel.interface";
import { HuespedPorHotel } from "app/interfaces/huesped-por-hotel.interface";
import { Room } from "app/interfaces/room.interface";
import { Service } from "app/interfaces/service.interface";
import { ManagementService } from "app/services/management.service";
import * as Chartist from "chartist";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  chartdata?: HuespedPorHotel[];
  labeldata : any[] = [];
  realdata  : any[] = [];
  colordata : any[] = [];

  public hoteles     : Hotel  [];
  public huespedes   : Host   [];
  public habitaciones: Room   [];
  public servicios   : Service[];

  public selectedHotelId: number;

  constructor(private managementService: ManagementService) {}

  getHoteles() {
    this.managementService.getAllRequest("hotel").subscribe((hoteles) => {
      this.hoteles = hoteles;
    });
  }

  get nHoteles() {
    return this.hoteles.length;
  }

  getHosts() {
    this.managementService.getAllRequest("huesped").subscribe((huespedes) => {
      this.huespedes = huespedes;
    });
  }

  get nHuespedes() {
    return this.huespedes.length;
  }

  getHabitaciones() {
    this.managementService
      .getAllRequest("habitacion")
      .subscribe((habitaciones) => {
        this.habitaciones = habitaciones;
      });
  }

  get nHabitaciones() {
    return this.habitaciones.length;
  }

  getServicios() {
    this.managementService.getAllRequest("servicio").subscribe((servicios) => {
      this.servicios = servicios;
    });
  }

  get nServicios() {
    return this.servicios.length;
  }

  getHuespedesPorHotel() {
    this.managementService.getHuespedesPorHotel().subscribe((hostsPerHotel) => {
      this.chartdata = hostsPerHotel;
    });
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }

  ngOnInit() {
    this.getHoteles();
    this.getHabitaciones();
    this.getHosts();
    this.getServicios();
    this.getHuespedesPorHotel();

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const fechas: string[] = ["2024-06-17"]; //['17-06-2024', '31-07-2024', '30-07-2024',]
    const values: number[] = [];
    for (let str in fechas) {
      this.managementService.getCounts(2, fechas[str]).subscribe((v) => {
        values.push(v);
      });
    }

    this.managementService.getCounts(2, "2024-06-17").subscribe((v) => {
      let dataDailySalesChart: any = {
        labels: ["17-06-2024"],
        series: [values],
      };

      const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 5, // aqui podria ver cual es el maximo de values y añadirle +2 o +3
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      };

      var dailySalesChart = new Chartist.Line(
        "#dailySalesChart",
        dataDailySalesChart,
        optionsDailySalesChart
      );

      this.startAnimationForLineChart(dailySalesChart);
    });

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    this.managementService.getHuespedesPorHotel().subscribe((result) => {
      this.chartdata = result;
      if (this.chartdata != null) {
        let names: string[] = [];
        if (this.hoteles) this.hoteles.forEach((h) => names.push(h.nombre));
        this.labeldata = names;
        for (let i = 0; i < this.chartdata.length; i++) {
          this.realdata.push(this.chartdata[i].num);
        }

        this.RenderChart(
          this.labeldata,
          this.realdata,
          this.colordata,
          "bar",
          "websiteViewsChart"
        );
      }
    });
  }

  RenderChart(
    labeldata: any,
    maindata: any,
    colordata: any,
    type: any,
    id: any
  ) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: "# de huespedes",
            data: maindata,
            backgroundColor: "rgba(255, 255, 132, 1)",
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  onHotelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedHotelId = parseInt(selectElement.value, 10);
    console.log("Selected hotel ID:", this.selectedHotelId);
    this.updateHistoryGraph(this.selectedHotelId);
  }

  updateHistoryGraph(idHotel: number) {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const fechas: string[] = ["2024-06-17", "2024-07-30", "2024-07-31"];
    const values: number[] = [];
    for (let str in fechas) {
      this.managementService.getCounts(idHotel, fechas[str]).subscribe((v) => {
        values.push(v);
      });
    }

    this.managementService.getCounts(idHotel, "2024-07-31").subscribe((v) => {
      let dataDailySalesChart: any = {
        labels: ["17-06-2024", "31-07-2024", "30/07/2024"],
        series: [values],
      };

      const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 5, // aqui podria ver cual es el maximo de values y añadirle +2 o +3
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      };

      var dailySalesChart = new Chartist.Line(
        "#dailySalesChart",
        dataDailySalesChart,
        optionsDailySalesChart
      );

      this.startAnimationForLineChart(dailySalesChart);
    });
  }
}
