import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'electron';
  total: number | undefined;
  hp: number | undefined;
  hc: number | undefined;
  releves: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.lister();
  }

  ajouter() {
    this.http.put("localhost:8080/releve", {
      "fournisseurId": 3,
      "dateDebut": new Date(),
      "dateFin": new Date(),
      "hp": this.hp,
      "hc": this.hc,
      "total": this.total
    }).toPromise() //.subscribe
      .then(() => {
        this.lister();
      });
  }

  lister() {
    this.http.get("http://localhost:8080/releve")
      .toPromise() //.subscribe
      .then(data => {
      this.releves = data;
    })
      .catch(error => console.log(error));
  }
}
