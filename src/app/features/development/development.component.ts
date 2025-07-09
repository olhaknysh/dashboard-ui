import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import {
  ButtonComponent,
  ContainerComponent,
  ContainerTitleComponent,
} from '../../shared';
import { DEVELOPMENT_COMPONENT_CONSTANTS } from './development.component.constant';
import { DevelopmentComponentRouteData } from './development.component.interface';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ButtonComponent,
    ContainerComponent,
    ContainerTitleComponent,
  ],
  templateUrl: './development.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  pageTitle = input<string>(DEVELOPMENT_COMPONENT_CONSTANTS.pageTitle);
  pageDescription = input<string>(
    DEVELOPMENT_COMPONENT_CONSTANTS.pageDescription,
  );

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data[DevelopmentComponentRouteData.PAGE_TITLE]) {
        this.pageTitle = data[DevelopmentComponentRouteData.PAGE_TITLE];
      }
      if (data[DevelopmentComponentRouteData.PAGE_DESCRIPTION]) {
        this.pageDescription =
          data[DevelopmentComponentRouteData.PAGE_DESCRIPTION];
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}
