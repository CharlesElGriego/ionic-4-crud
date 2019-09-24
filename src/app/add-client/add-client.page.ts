import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Client } from '../shared/models/client.model';
import { NavController } from '@ionic/angular';
import { ClientsService } from '../shared/services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {

  // Public Properties

  clients: Client[] = [];
  clientForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  constructor(
    private clientService: ClientsService,
    private router: NavController,
    private fb: FormBuilder
  ) { }

  //  Life Cycle Hooks
  ngOnInit() {
  }

  // Public Methods
  save(): void {
    const client = this.clientForm.value;
    client.id = this.revisedRandId();

    this.clientService.save(client).subscribe(
      newClient => {
        this.clients.push(newClient);
        this.clientForm.reset();
        this.clientService.newClient$.next(newClient);
        this.router.pop();
      }
    );
  }

  //  Private Methods
  private revisedRandId(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }
}
