import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import { SessionService } from "../session.service";
import { ProjectService } from "../project.service";
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";
import { environment } from '../../environments/environment';


const BASEURL = environment.apiURL;


@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {

  search: any;
  completeInfo: any;
  public adress: any;
  feedback: string;
  searchQuery: any;
  searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public zoom: number = 2;
  google: any;
  public query = '';
  public countries = ["Madrid", "Miami", "Murcia"];
  public filteredList = [];
  public elementRef;
  locationUser: any;
  @ViewChild("search")
  public searchElementRef: ElementRef;



  address: string;
  model = 1;
  formInfo = {
    name: '',
    description: '',
    image: '',
    location: {
      latitude: null,
      longitude: null,
      address: null
    },
    completed: false,
    creatorID: '',
    isAwareness : false,
    isEducation: false,
    isPoverty: false,
    isAnimals: false,
    isEcology: false,
    isHealth: false,
    isElderly: false,
    isImmigrationAndDisplacement: false,
    isWater: false,
    isPolitics: false,
    isDisasterRelief: false,
    isDisabled: false,
    isOther: false,
  };

  constructor(private session: SessionService, private project: ProjectService, private router: Router, myElement: ElementRef, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { this.elementRef = myElement; }

  user: any;

  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/api/projects`
  });

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => { this.user = user }
      );
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.router.navigate(['/projects/' + JSON.parse(response)._id]);
    };
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
    this.searchControl = new FormControl();
    //load Places Autocomplete
    const instance = this;
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.setNewPosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
          //set new position
          this.getLocationData(place);

          instance.addLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });


          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 10;
          if(place.address_components.length === 7){
            this.address = place.address_components[1].long_name + ", " + place.address_components[0].long_name + ", " + place.address_components[2].long_name + ", " + place.address_components[5].long_name;
          }else{
            this.address = place.address_components[0].long_name + ", " + place.address_components[5].long_name + ", "+ place.address_components[2].long_name + ", " + place.address_components[4].long_name;
          }
          this.formInfo.location.latitude = place.geometry.location.lat();
          this.formInfo.location.longitude = place.geometry.location.lng();
          this.formInfo.location.address = this.address;

        });
      });
    });
  }

  addLocation(location) {
    this.locationUser = location;
  }

  getLocationData(location) {
    this.completeInfo = location;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private setNewPosition(position) {
    this.latitude = position.lat;
    this.longitude = position.lon;
    this.zoom = 12;
  }

  submitForm(theForm) {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.formInfo.name);
      form.append('description', this.formInfo.description);
      form.append('latitude', this.formInfo.location.latitude);
      form.append('longitude', this.formInfo.location.longitude);
      form.append('address', this.formInfo.location.address);
      form.append('completed', this.formInfo.completed);
      form.append('creatorID', this.user._id);
      form.append('isAwareness', this.formInfo.isAwareness);
      form.append('isEducation', this.formInfo.isEducation);
      form.append('isPoverty', this.formInfo.isPoverty);
      form.append('isAnimals', this.formInfo.isAnimals);
      form.append('isEcology', this.formInfo.isEcology);
      form.append('isHealth', this.formInfo.isHealth);
      form.append('isElderly', this.formInfo.isElderly);
      form.append('isImmigrationAndDisplacement', this.formInfo.isImmigrationAndDisplacement);
      form.append('isWater', this.formInfo.isWater);
      form.append('isPolitics', this.formInfo.isPolitics);
      form.append('isDisasterRelief', this.formInfo.isDisasterRelief);
      form.append('isDisabled', this.formInfo.isDisabled);
      form.append('isOther', this.formInfo.isOther);
    };
    this.uploader.uploadAll()
  }

}
