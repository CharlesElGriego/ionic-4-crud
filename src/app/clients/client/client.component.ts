import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  //  Public Properties
  @Input() client: Client;
  @Output() editClient: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  //  Life Cycle Hooks
  ngOnInit(  ) {
  }

  //  Public Methods
  edit(id: string) {
    this.editClient.emit(id);
  }

}
