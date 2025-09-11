
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000'; // JSON server URL

  constructor(private http: HttpClient) {}

  // ✅ Generic create payment (works for subscription, parking, penalty)
  createPayment(type: 'subscriptions' | 'parkingPayments' | 'penaltyPayments', data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${type}`, data);
  }

  // ✅ Fetch payment details
  getPaymentDetails(type: 'subscriptions' | 'parkingPayments' | 'penaltyPayments', id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${type}/${id}`);
  }

  // ✅ Update payment status (pending → paid)
  updatePayment(type: 'subscriptions' | 'parkingPayments' | 'penaltyPayments', id: number, updateData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${type}/${id}`, updateData);
  }

  // ✅ Create invoice
  createInvoice(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/invoices`, data);
  }

  // ✅ Fetch invoice
  getInvoice(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/invoices/${id}`);
  }
}
