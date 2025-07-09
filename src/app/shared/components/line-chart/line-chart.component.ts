import { Component, computed, input } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `
    <div style="display: block;">
      <canvas
        baseChart
        width="250px"
        height="150px"
        [type]="'line'"
        [data]="lineChartData()"
        [options]="lineChartOptions"
        [legend]="false"
      >
      </canvas>
    </div>
  `,
  imports: [BaseChartDirective],
})
export class LineChartComponent {
  labels = input<string[]>([]);
  data = input<number[]>([]);

  lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };

  lineChartData = computed<ChartConfiguration<'line'>['data']>(() => ({
    labels: this.labels(),
    datasets: [
      {
        data: this.data(),
        fill: false,
        tension: 0.5,
        borderColor: '#3a81f5',
      },
    ],
  }));
}
