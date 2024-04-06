import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public persona = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: new Date(),
    genero: 'm',
  };

  constructor(private http: HttpClient) { }
  
  onSubmit() {
    if (this.persona.nombre === '' || this.persona.apellidoPaterno === '' || this.persona.apellidoMaterno === '' || this.persona.fechaNacimiento === null || this.persona.genero === '') {
      alert('Error: Todos los campos deben ser completados');
    } else {

      const formattedDate = this.persona.fechaNacimiento.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
      this.persona.fechaNacimiento = new Date(formattedDate); // Convert formatted date string to Date object
      this.http.post('http://localhost:3000/curp', { ...this.persona, fechaNacimiento: formattedDate }).subscribe((data: any) => {
        alert('Tu CURP es: ' + data.curp);
      });
    }
  }
}
