import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  /**
   * 
   * @param email email passado pelo usuário
   * @param password senha passada pelo usuário
   * @returns 
   * Irá retornar uma req http do tipo post para o endereçamento da api e os dados que serão passados
   * Será utilizado o pipe para pegar o valor retornado (token) e salvar ele na nossa sessão
   * O tap está sendo utilizado por conta de ser uma função async
   */
  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>("/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.email)
      })
    )
  }
}
