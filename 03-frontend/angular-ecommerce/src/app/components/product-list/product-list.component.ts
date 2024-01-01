import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string="";

  constructor(
    private productService: ProductService,
    private cartService:CartService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProduct();
    } else {
      this.handleListProduct();
    }
  }
  handleSearchProduct() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //search product using keyword

    if(this.previousKeyword !=theKeyword){
      this.thePageNumber=1;
    }
    
    this.previousKeyword=theKeyword;

    console.log(
      'Current key:' +
        this.previousKeyword +
        ' prev key:' +
        theKeyword
    );

    this.productService.searchProductsPaginate(this.thePageNumber - 1,
      this.thePageSize,theKeyword).subscribe(this.processResult());
  }
  handleListProduct() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      this.currentCategoryId = 1;
      // this.productService.getProductList().subscribe(
      //   data=>{
      //     this.products=data;
      //   }
      // )
      // return;
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    console.log(
      'Current Cat. Id:' +
        this.currentCategoryId +
        ' prev cat id:' +
        this.previousCategoryId
    );
    this.previousCategoryId = this.currentCategoryId;

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }
  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name},${theProduct.unitPrice}`);
    const theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
    }
  updatePageSize(pageSize:string) {
    this.thePageSize=+pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }

  processResult(){
    return (data:any)=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }
}
