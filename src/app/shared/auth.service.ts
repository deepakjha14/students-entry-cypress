import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn: any = 0;
    reirectUrl: string|null = null;

    constructor(
        private httpClient: HttpClient
    ) {

    }

    login(username: string, password: string): Observable<any> {
        return this.httpClient.post('/api/login', {username, password})
            .pipe (
                tap(() => this.isLoggedIn = true)
            );
    }

    logOut(): void {
        this.isLoggedIn = false;
    }
}