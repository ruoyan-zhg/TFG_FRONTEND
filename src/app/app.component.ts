import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hike';
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('userToken'); // Suponiendo que 'userToken' es el indicador de sesión iniciada
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this.router.navigate(['/inicio']); // Navegar a la página de inicio u otra página deseada
  }
}
