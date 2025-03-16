import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProducts } from '../../store/product.actions';
import { selectAllProducts } from '../../store/product.selectors';
import { Product } from '../product.model';
import { OrderService } from '../../orders/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgIf, NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [NgIf, NgFor, AsyncPipe, CommonModule, MatTableModule, MatButtonModule, MatCardModule]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  dataSource = new MatTableDataSource<Product>([]); 
  displayedColumns: string[] = ['name', 'price', 'actions']; 
  cart = signal<Product[]>([]);

  constructor(private store: Store, private orderService: OrderService) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());

    
    this.products$.subscribe((products) => {
      if (products) {
        this.dataSource.data = products;
      }
    });
  }

  addToCart(product: Product) {
    this.cart.update((prev) => [...prev, product]);
  }

  removeFromCart(index: number) {
    this.cart.update((prev) => prev.filter((_, i) => i !== index));
  }

  placeOrder() {
    if (this.cart().length === 0) {
      alert('Cart is empty! Add products before placing an order.');
      return;
    }

    const orders = this.cart().map((product) => ({
      id: '',
      productId: product.id,
      quantity: 1,
      orderDate: new Date()
    }));

    orders.forEach((order) => {
      this.orderService.placeOrder(order).subscribe({
        next: () => {
          this.cart.set([]);
        },
        error: (err) => console.error('Error placing order:', err)
      });
    });
  }
}
