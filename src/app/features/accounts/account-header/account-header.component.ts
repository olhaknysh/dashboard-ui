import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-account-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-start md:items-center gap-8 py-8">
      <img
        [src]="logoUrl()"
        alt="Logo"
        class="w-28 h-28 rounded-full bg-white object-contain shadow-md object-cover"
      />
      <div class="flex-1">
        <div class="text-4xl font-light text-white leading-tight mb-2">
          {{ accountName() }}
        </div>
        <div class="flex gap-2 text-base text-gray-100 flex-col md:flex-row">
          <div class="text-lg text-gray-300 mb-4 w-32">{{ address() }}</div>
          <div class="border-l border-gray-700 h-8 mx-4"></div>
          <div>
            <div class="uppercase text-xs sub-title tracking-wide">
              Existing Account
            </div>
            <div class="font-medium text-lg">{{ accountNumber() }}</div>
          </div>
          <div class="border-l border-gray-700 h-8 mx-4"></div>
          <div>
            <div class="uppercase text-xs sub-title tracking-wide">Broker</div>
            <div class="font-medium text-lg">{{ broker() }}</div>
          </div>
          <div class="border-l border-gray-700 h-8 mx-4"></div>
          <div>
            <div class="uppercase text-xs sub-title tracking-wide">
              Underwriter
            </div>
            <div class="font-medium text-lg">{{ underwriter() }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccountHeaderComponent {
  accountName = input.required<string>();
  accountNumber = input.required<string>();
  address = input.required<string>();
  broker = input.required<string>();
  logoUrl = input.required<string>();
  underwriter = input.required<string>();
}
