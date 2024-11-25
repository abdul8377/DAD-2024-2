import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductNewComponent } from '../components/form/product-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from '../components/form/product-edit.component';
import {ConfirmDialogService} from "../../../../../shared/confirm-dialog/confirm-dialog.service";
import {ProductListComponent} from "../components";
import {ProductService} from "../../../../../providers/services/setup/product.service";

@Component({
    selector: 'app-products-container',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        ProductListComponent,
        ProductNewComponent,
        ProductEditComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    template: `
        <app-product-list
            class="w-full"
            [products]= "products"
            (eventNew)="eventNew($event)"
            (eventEdit)="eventEdit($event)"
            (eventDelete)="eventDelete($event)"
        ></app-product-list>
    `,
})
export class ProductContainerComponent implements OnInit {
    public error: string = '';
    public products: Product[] = [];
    public product = new Product();

    constructor(
        private _productService: ProductService,
        private _confirmDialogService:ConfirmDialogService,
        private _matDialog: MatDialog,
    ) {}

    ngOnInit() {
        this.getProducts();
    }

    getProducts(): void {
        this._productService.getAll$().subscribe(
            (response) => {
                this.products = response;
            },
            (error) => {
                this.error = error;
            }
        );
    }

    public eventNew($event: boolean): void {
        if ($event) {
            const productForm = this._matDialog.open(ProductNewComponent);
            productForm.componentInstance.title = 'Nueva categoria' || null;
            productForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.saveProduct(result);
                }
            });
        }
    }

    saveProduct(data: Object): void {
        this._productService.add$(data).subscribe((response) => {
        if (response) {
            this.getProducts()
        }
        });
    }

    eventEdit(idProduct: number): void {
        const listById = this._productService
            .getById$(idProduct)
            .subscribe(async (response) => {
                this.product = (response) || {};
                this.openModalEdit(this.product);
                listById.unsubscribe();
            });
    }

    openModalEdit(data: Product) {
        console.log(data);
        if (data) {
            const clienteForm = this._matDialog.open(ProductEditComponent);
            clienteForm.componentInstance.title =`Editar <b>${data.name||data.id} </b>`;
            clienteForm.componentInstance.product = data;
            clienteForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.editClient( data.id,result);
                }
            });
        }
    }

    editClient( idProduct: number,data: Object) {
        this._productService.update$(idProduct,data).subscribe((response) => {
            if (response) {
                this.getProducts()
            }
        });
    }


    public eventDelete(idProduct: number) {
        this._confirmDialogService.confirmDelete(
            {
                // title: 'Confirmación Personalizada',
                // message: `¿Quieres proceder con esta acción ${}?`,
            }
        ).then(() => {
            this._productService.delete$(idProduct).subscribe((response) => {
                this.products = response;
            });
            this.getProducts();
        }).catch(() => {
        });

    }
}
