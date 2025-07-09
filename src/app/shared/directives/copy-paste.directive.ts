import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewContainerRef,
  Injector,
  ComponentRef,
  Renderer2,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';

import { IconComponent } from '../components/icon';
import { NotificationService } from '../../services';
import { KeyboardKeys } from '../interfaces';

@Directive({
  selector: '[appCopyPaste]',
  standalone: true,
})
export class CopyPasteDirective implements AfterViewInit, OnDestroy {
  private iconRef: ComponentRef<IconComponent> | null = null;
  private readonly destroy$ = new Subject<void>();

  private readonly elementRef = inject(ElementRef);
  private readonly injector = inject(Injector);
  private readonly notification = inject(NotificationService);
  private readonly renderer = inject(Renderer2);
  private readonly viewContainerRef = inject(ViewContainerRef);

  ngAfterViewInit() {
    this.addIcon();
  }

  private addIcon() {
    this.iconRef = this.viewContainerRef.createComponent(IconComponent, {
      injector: this.injector,
    });
    this.iconRef.setInput('fontIcon', 'content_copy');
    this.iconRef.setInput('size', 18);

    const iconEl = this.iconRef.location.nativeElement;
    this.renderer.addClass(iconEl, 'ml-2');
    this.renderer.addClass(iconEl, 'text-gray-400');
    this.renderer.addClass(iconEl, 'cursor-pointer');
    this.renderer.addClass(iconEl, 'align-middle');
    this.renderer.setAttribute(iconEl, 'aria-label', 'Copy to clipboard');
    this.renderer.setAttribute(iconEl, 'tabindex', '0');
    this.renderer.appendChild(this.elementRef.nativeElement, iconEl);

    this.addEventListeners();
  }

  private addEventListeners() {
    const destroy$ = this.destroy$;
    this.iconRef!.instance.iconClick.subscribe((event: Event) => {
      if (destroy$.closed) {
        return;
      }
      this.copyHandler(event);
    });

    this.iconRef!.instance.iconKeydown.subscribe((event: KeyboardEvent) => {
      if (destroy$.closed) {
        return;
      }
      this.keydownHandler(event);
    });
  }

  private copyHandler(event: Event) {
    event.stopPropagation();
    const content =
      this.elementRef.nativeElement.innerText ||
      this.elementRef.nativeElement.textContent;

    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    this.notification.success('Copied to clipboard!');
  }

  private keydownHandler(event: KeyboardEvent) {
    const isActionPressed =
      event.key === KeyboardKeys.Enter || event.key === KeyboardKeys.Space;

    if (!isActionPressed) {
      return;
    }

    this.copyHandler(event);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.iconRef) {
      this.iconRef.destroy();
    }
  }
}
