import { Component, OnInit } from '@angular/core';
import { RouterDataService } from '../../../services/router-data.service';
import { ImageService} from '../../../services/image.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profile: any;
  states: any;
  parentForm: any;
  avatarFinished: Boolean = false;
  validFile: Boolean;

  constructor(
    private dataService: RouterDataService,
    private imageService: ImageService,
    private router: Router,
    private fb: FormBuilder
  ) {
      if (this.dataService.profile) {
        this.profile = this.dataService.profile;
      }
      this.dataService.profileDataLoaded.subscribe((profile) => {
        console.log('profile change', profile);
        this.profile = profile;
      });
  }

  ngOnInit() {
    this.states = this.dataService.getStates();
    this.parentForm = this.fb.group(
      {
        email: ['', Validators.required],
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required]
      }
    );
  }

  chooseImage() {
      console.log('choose Avatar');
      document.getElementById('fileUpload').click();
      this.avatarFinished = false;
  }

  uploadFile(files) {
    console.log('FILES', files);
    const reader: FileReader = new FileReader();

    if (files[0].type === 'image/png' || files[0].type === 'image/gif' || files[0].type === 'image/jpg') {
      this.validFile = true;
      reader.onloadend = (e) => {
        this.profile.profileImageUrl = reader.result;
      }

      reader.readAsDataURL(files[0]);
    }  else {
      this.validFile = false;
    }
  }

  saveImage() {
    const pkg = {
      image: this.profile.profileImageUrl,
      parentId: this.profile.parentId,
      userId: this.profile.userId
    };

    this.imageService.updateProfileImage(pkg)
      .then((res) => {
        this.avatarFinished = true;
        console.log('res from update profile in component', res);
      });
  }

}
