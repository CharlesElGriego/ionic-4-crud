import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Client } from '../shared/models/client.model';
import { ClientsService } from '../shared/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  //  Public Properties
  clients: Client[];

  constructor(
    private clientService: ClientsService,
    private router: NavController) {

  }

  //  Life Cycle Hooks
  ngOnInit() {

    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      }
    );


    this.clientService.newClient$.subscribe(
      newClient => {
        if (newClient) {
          this.clients.push(newClient);
        }
      }
    );

    this.clientService.editClient$.subscribe(
      editClient => {

        if (editClient) {
          for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id === editClient.id) {
              this.clients[i] = { ...editClient };
            }
          }
        }

      }
    );

    this.clientService.deleteClient$.subscribe(
      toDelete => {

        if (toDelete) {
          this.clients = [...this.arrayRemove(this.clients, toDelete)];
        }
      }
    )
  }

  //  Public Methods

  addClient() {
    this.router.navigateForward('/add-client');
  }

  edit(id: string) {
    this.router.navigateForward(['update-client/' + id]);
  }

  //  Private Methods
  private arrayRemove(arr: Client[], value: string): Client[] {

    return arr.filter((ele: Client) => {
      return ele.id !== value;
    });

  }

}
