import { Component, Inject } from "@angular/core";
import { ModalModule } from 'angular-bootstrap-md';

@Component({
  templateUrl: './error.component.html'
})

export class ErrorComponent {
  constructor(@Inject(ModalModule) public data: {message: string}) {}
}
