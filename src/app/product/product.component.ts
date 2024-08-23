import { Component, OnInit, HostBinding, OnDestroy , Renderer2} from '@angular/core';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit, OnDestroy {
  @HostBinding('class') themeClass: string;
  private themeChangeSubscription: Subscription;

  constructor(private appComponent: AppComponent, private renderer: Renderer2) {}

  ngOnInit() {
    // Apply the initial theme
    this.applyTheme(this.appComponent.activeThemeCssClass);

    // Subscribe to theme changes
    this.themeChangeSubscription = this.appComponent.themeChange.subscribe(
      (themeClass: string) => {
        this.themeClass = themeClass;
        this.applyTheme(themeClass);
      }
    );
  }

  applyTheme(theme: string) {
    console.log('appy theme for product', theme);
    const linkElement = document.getElementById('product-theme') as HTMLLinkElement;

    if (linkElement) {
      linkElement.href = `assets/themes/product/${theme}.css`;
    } else {
      const newLinkElement = this.renderer.createElement('link');
      newLinkElement.id = 'product-theme';
      newLinkElement.rel = 'stylesheet';
      newLinkElement.href = `assets/themes/product/${theme}.css`;
      this.renderer.appendChild(document.head, newLinkElement);
    }
  }

  ngOnDestroy() {
    if (this.themeChangeSubscription) {
      this.themeChangeSubscription.unsubscribe();
    }
  }
}