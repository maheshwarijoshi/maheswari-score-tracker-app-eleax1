import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScoreTrackerService {
  _apiBaseUrl: string = 'https://free-nba.p.rapidapi.com/';
  daysList = [...Array(12).keys()].map((index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return new Date(date).toISOString().slice(0, 10);
  });
  constructor(private http: HttpClient) {}

  createAuthorizationHeader(): HttpHeaders {
    const headerDict = {
      'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
    };
    return new HttpHeaders(headerDict);
  }

  getTeamsList() {
    return this.http.get(`${this._apiBaseUrl}teams`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getSelectedTeamInformation(teamId: number) {
    let daysPayload = '';
    for (const i of this.daysList) {
      daysPayload += `dates[]=${i}&`;
    }
    console.log(daysPayload);
    return this.http.get(
      `${this._apiBaseUrl}games?page=0&${daysPayload}per_page=12&team_ids[]=${teamId}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }
}
