import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'http://localhost:3001/products'

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [isError ? 'msg-error' : 'msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    )
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.httpClient.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    )
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    )
  }


  read(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    )
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    )
  }

  errorHandler(err: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }
}
