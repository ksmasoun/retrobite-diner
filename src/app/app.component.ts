import {Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'combineApp';
  jsondata!:any
  url:string='../assets/data/menu.json'
  restname:string = ""
  restimage:string = ""
  restslogan:string = ""
  
  menuItemsArray!:any[]
  menuItems!:any[]
  menuForm!: FormGroup;
  menuhours:string = ""
  menutype:string = ""

  menuTypeItemsArray!:any[]

  name!:string

  //for search
  foods!:any[]

  constructor( private http: HttpClient) { }

  ngOnInit(){
    this.http.get(this.url).subscribe((res:any) => {
      this.jsondata = res.restaurant;

      console.log(this.jsondata);
      
      this.restname = this.jsondata.name
      this.restimage = this.jsondata.picture
      this.restslogan = this.jsondata.slogan
      this.menuItemsArray = this.jsondata.menu

      //get all food items for search
      let acc:any = [];
      this.foods = this.jsondata.menu.forEach((item:any) => {
        acc.push(item.food)
      })

      this.foods=acc.flat();

      });

      this.menuForm = new FormGroup({
        'name': new FormControl(null),
        'menu' : new FormControl(null)
        }); 
      }
    
        onSubmit() { 
          this.menuTypeItemsArray = this.menuForm.value.menu?.food
        }

        //search
        search(){
          if(this.name !="" && this.name.length > 2){
            this.menuTypeItemsArray = this.foods.filter((food) => food.description.includes(this.name) || food.name.includes(this.name));
          }else{
            this.menuTypeItemsArray = [];
          }
        }
}
