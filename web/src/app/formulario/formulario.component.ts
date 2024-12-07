import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MessageService } from 'primeng/api';


interface Participant {
  name: string;
  phone: string;
  desc: string;
}
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})


export class FormularioComponent {



  constructor(private api: ApiService,private messageService: MessageService) { }

  ngOnInit(): void {
  }

  participants: Participant[] = [];
  newParticipant: Participant = {
    name: '',
    phone: '',
    desc: ''
  };

  addParticipant(): void {
    if (this.newParticipant.name.trim() && this.newParticipant.phone.trim()) {
      this.participants.push({...this.newParticipant});
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Participante agregado correctamente'
      });
      this.newParticipant = {
        name: '',
        phone: '',
        desc: ''
      };
    }
  }

  removeParticipant(index: number): void {
    this.participants.splice(index, 1);
  }

  PushParticipant(): void {
    if (this.participants.length < 3) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Precaución',
        detail: 'Deben ser al menos 3 participantes'
      });
      return;
    }
    let resp = this.api.GetAmigoSecreto(this.participants).toPromise();

  }
}
