import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {AuthorizationService} from './authorization.service';

@Directive({
  selector: '[appCanAccess]'
})
export class CanAccessDirective implements OnInit, OnDestroy {
  @Input('appCanAccess') appCanAccess: string | string[];
  private permission$: Subscription;
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
    console.log(this.appCanAccess);
    this.applyPermission();
  }

  private applyPermission(): void {
    this.permission$ = this.authorizationService
      .checkAuthorization(this.appCanAccess)
      .subscribe(authorized => {
        if (authorized) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.permission$.unsubscribe();
  }
}
