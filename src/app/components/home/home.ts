import { Component } from '@angular/core';
import { Slider } from "../slider/slider";
import { ProductCard } from "../product-card/product-card";
import { Login } from "../login/login";

@Component({
  selector: 'app-home',
  imports: [Slider, ProductCard, Login],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
