import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Client } from '../shared/models/client.model';
import { ClientsService } from '../shared/services/clients.service';
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.page.html',
  styleUrls: ['./update-client.page.scss'],
})
export class UpdateClientPage implements OnInit {

  // Public Properties

  clients: Client[] = [];
  client: Client;
  clientForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    lastName: ['', Validators.required]
  });
  constructor(
    private clientService: ClientsService,
    private router: NavController,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  //  Life Cycle Hooks
  ngOnInit() {

    this.route.params.subscribe(params => {
      //  This is how you get the id params from the URL
      // a better solution is to use a SwitchMap, instead of two subscriptions
      if (params) {
        this.clientService.getClient(params['id']).subscribe(
          data => {
            if (data) {
              this.client = data;
              this.clientForm.patchValue(this.client);
            }
          }
        );
      }
    });

  }

  // Public Methods
  edit(): void {
    const client = this.clientForm.value;

    this.clientService.editClient(client).subscribe(
      newClient => {
        this.clientForm.reset();
        this.clientService.editClient$.next(newClient);
        this.router.pop();
      }
    );
  }

  toDelete(): void {
    this.clientService.delete(this.client.id).subscribe(deleted => {
      if (deleted) {
        this.clientService.deleteClient$.next(this.client.id);
        this.router.pop();
      }
    });
  }

}
